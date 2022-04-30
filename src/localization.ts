/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
/** [[include:localization.md]] */ /** */
import fs = require("fs");
import path = require("path");
import { BaseTimeUnit, TimeUnitDatabase, TimeWriterSettings } from ".";

/**
 * This interface describes objects with properties belonging to the specified type parameter `T`.
 *
 * @typeparam T
 *   Type of element stored by the object (string by default).
 */
export interface Dictionary<T = string> {
    [propertyName: string]: T;
}

/**
 * This class manages the internationalization of the module, altering the results synthesized by
 * [time writers](_index_.timewriter.html).
 *
 * Translations are stored in files located at `src/locales`. These files contain the transcription for time units and
 * linguistic configurations.
 *
 * ---
 *
 * See [Contributing: Translating](https://github.com/pjbatista/timecount/blob/master/CONTRIBUTING.md#translating) if
 * you wish to contribute with a new translation for timecount.
 */
export class Locale {

    private static _availableFiles: Dictionary;
    private static _availableIdentifiers: string[];
    private static _availableLanguages: Dictionary;
    private static _currentIdentifier = "en-us";
    private static _settings: LocaleSettings = {};

    /**
     * Gets the current locale identifier.
     *
     * @deprecated Since v1.1.0 - In favor of `get` (will be removed in v2).
     */
    public static get currentIdentifier() { return Locale._currentIdentifier; }

    /** Gets the configuration for the current locale which represents the translation file currently loaded. */
    public static get settings() { return Locale._settings; }

    /**
     * Gets the current locale identifier (e.g.: "fr" represents French — the international translation for the language
     * as a whole; "fr-ca" is French (Canada) — represents a localized variation of the French language meant for
     * Canada).
     *
     * The default is "en-us", which represents English (United States), a language built into the module (doesn't
     * require any translation file).
     */
    public static get() { return Locale._currentIdentifier; }

    /**
     * Gets whether the given locale identifier is available to `timecount`.
     *
     * @param localeIdentifier
     *   A language / region locale specifier (e.g. "en-au", "pt-br").
     * @return
     *   True if a valid locale was provided; false otherwise.
     */
    public static isAvailable(localeIdentifier: string) {

        if (!Locale._availableIdentifiers) {
            Locale._initialize();
        }

        localeIdentifier = localeIdentifier.toLocaleLowerCase();

        return Locale.listAvailable().indexOf(localeIdentifier) > -1;
    }

    /**
     * Gets a list with all locale identifiers available to timecount.
     *
     * @return
     *   An array with all available locale identifiers.
     */
    public static listAvailable() {

        if (!Locale._availableIdentifiers) {
            Locale._initialize();
        }

        const languages = Object.keys(this._availableLanguages);
        return Locale._availableIdentifiers.concat(["en", "en-us"], languages).sort();
    }

    /**
     * Sets the current timecount language using the specified locale identifier (e.g.: "pt" represents Portuguese — the
     * international translation for the language as a whole; "pt-br" is Portuguese (Brazilian) — represents a localized
     * variation of the Portuguese language meant for Brazil).
     *
     * @param localeIdentifier
     *   A string with a 2 letter language identifier ("en", "es", "pt", etc.) -or- a 5 letter language + region
     *   identifier ("en-ca", "pt-ao"). This parameter is case-insensitive. If empty, it will reset the locale to "en".
     * @throws Error
     *   When the locale identifier is invalid.
     */
    public static set(localeIdentifier: string = "en") {

        localeIdentifier = localeIdentifier.toLocaleLowerCase();

        // English (US) is hardcoded; no translation file required
        if (localeIdentifier === "en" || localeIdentifier === "en-us") {
            Locale._currentIdentifier = "en-us";
            Locale._settings = {};
            return;
        }

        // isAvailable already calls _initialize
        if (!Locale.isAvailable(localeIdentifier)) {
            throw new Error("Invalid locale identifier");
        }

        if (localeIdentifier.length === 2 && Locale._availableLanguages.hasOwnProperty(localeIdentifier)) {
            localeIdentifier = Locale._availableLanguages[localeIdentifier];
        }

        const pathToLocaleFile = Locale._availableFiles[localeIdentifier];

        Locale._currentIdentifier = localeIdentifier;
        const settings: LocaleSettings = require(`./locales/${pathToLocaleFile}`).default;
        Locale._settings = settings;

        // Parsing deprecated properties
        settings.defaultTimeUnit = settings.defaultTimeUnit || settings.defaultOptions;

        if (!settings.timeUnits) {
            return;
        }

        // tslint:disable-next-line:curly
        for (const timeUnitName in settings.timeUnits) if (settings.timeUnits.hasOwnProperty(timeUnitName)) {

            // Fixes the plurals when translating: nulls are not parsed like undefineds
            const timeUnit = settings.timeUnits[timeUnitName as keyof TimeUnitDatabase];
            timeUnit.customPlural = timeUnit.customPlural || null as any;
        }

        return;
    }

    private static _initialize() {
        const availableFiles: Dictionary = {};
        const availableIdentifiers: string[] = [];
        const availableLanguages: Dictionary = {};

        const localeFiles = fs.readdirSync(path.join(__dirname, "locales"));

        for (const localeFile of localeFiles) {
            const localeIdentifier = localeFile.toLocaleLowerCase();

            // Splits the file path into 3 groups: path, language and region (which is optional)
            const localeParser = /^([a-z]{2})-?(|[a-z]{2})\.ts/.exec(localeIdentifier);

            if (localeParser === null) {
                continue;
            }

            // Separating regionless languages and regionalizations
            const language = localeParser[1];
            const region = localeParser[2];
            const identifier = `${language}-${region.length === 2 ? region : ""}`;

            if (!availableLanguages.hasOwnProperty(language)) {
                availableLanguages[language] = identifier;
            }

            availableIdentifiers.push(identifier);
            availableFiles[identifier] = localeFile;
        }

        Locale._availableFiles = availableFiles;
        Locale._availableIdentifiers = availableIdentifiers;
        Locale._availableLanguages = availableLanguages;
    }

    private constructor() { throw new Error("Cannot initialize static class Locale"); }
}

/**
 * Objects of this class represent the configurations of translation files.
 *
 * After a translation has been [set](../classes/_localization_.locale.html#set), these configurations will be available
 * at [Locale.settings](../classes/_localization_.locale.html#settings) to be used by interested objects (such as
 * [time writers](../classes/_index_.timewriter.html)).
 */
export interface LocaleSettings {

    /**
     * These options allow for default linguistic configuration for the time units of the locale.
     *
     * @deprecated Since v1.1.0 - In favor of `defaultTimeUnit` (will be removed in v2).
     */
    defaultOptions?: BaseTimeUnit;

    /**
     * An object able to override the default linguistic parsing of time units.
     *
     * It may be used to set a [custom plural function](_index_.basetimeunit.html#customplural) or prevent time units
     * from being [pluralized](_index_.basetimeunit.html#pluralize) by default.
     */
    defaultTimeUnit?: BaseTimeUnit;

    /**
     * Database of time unit translations.
     *
     * Gives the ability to set [readable names](_index_.basetimeunit.html#readablename) and
     * [plurals](_index_.basetimeunit.html#customplural) of translations.
     */
    timeUnits?: TimeUnitDatabase<BaseTimeUnit>;

    /**
     * Configurations assigned to [time writers](../classes/_index_.timewriter.html).
     *
     * Contains linguistic and mathematical properties applied to all
     * [countdown](../classes/_index_.timewriter.html#countdown) and [write](../classes/_index_.timewriter.html#write)
     * calls (unless overridden by the object or method).
     */
    writerOptions?: TimeWriterSettings;
}

/**
 * This interface extends from [BaseTimeUnit](_index_.basetimeunit.html) with the only difference being that it enforces
 * its [readable name](#readablename) to be not-optional, in order to better characterize a parsed time unit object.
 *
 * @deprecated Since v1.1.0 - Unnecessary interface (will be removed in v2).
 */
export interface LocalizedTimeUnit extends BaseTimeUnit {

    /** This version of the property is not optional. */
    readonly readableName: string;
}
