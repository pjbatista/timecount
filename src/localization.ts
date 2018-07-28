/** [[include:localization.md]] */ /** */
/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
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
 * This _static_ class manages the localization of the module, which generates synthesized time outputs in languages
 * other than the default — English (US); the current locale can be changed via [[Locale.set]].
 *
 * Translations are files that export the translated time units as well as configurations for the language (for example,
 * how plurals should be parsed).
 *
 * ---
 *
 * See [Contributing: Translating](https://github.com/pjbatista/timecount/blob/master/CONTRIBUTING.md#translating) if
 * you wish to contribute with a new language or regional variation.
 */
export class Locale {

    /**
     * Gets the current locale identifier (e.g.: "fr" is French — represents the international translation for the
     * language as a whole; "fr-ca" is French (Canada) — represents a localized variation of the French language meant
     * for the country of Canada).
     *
     * The default is "en-us", which represents English (United States), a language built into the module (doesn't
     * require any translation file).
     */
    public static get currentIdentifier() { return Locale._currentIdentifier; }

    /**
     * Gets the locale settings associated with the current locale, an object that contains all language overrides.
     */
    public static get settings() { return Locale._settings; }

    /** This property is an alias to [[currentIdentifier]]. */
    public static get() { return Locale._currentIdentifier; }

    /**
     * Gets whether the given locale identifier is available to `timecount`.
     *
     * @param {string} localeIdentifier
     *   A language / region locale specifier (e.g. "en-au", "pt-br").
     * @return
     *   True if a valid locale was provided; false otherwise.
     */
    public static isAvailable(localeIdentifier: string) {

        if (!Locale._availableIdentifiers) {
            Locale._initialize();
        }

        localeIdentifier = localeIdentifier.toLocaleLowerCase();

        if (localeIdentifier.length === 2) {
            return localeIdentifier === "en" || Locale._availableLanguages.hasOwnProperty(localeIdentifier);
        }

        return localeIdentifier === "en-us" || Locale._availableIdentifiers.indexOf(localeIdentifier) > -1;
    }

    /**
     * Gets a list with all locale identifiers available to `timecount`.
     *
     * @return
     *   An array with all available locale identifiers.
     */
    public static listAvailable() {

        if (!Locale._availableIdentifiers) {
            Locale._initialize();
        }

        return Locale._availableIdentifiers;
    }

    /**
     * Sets the current locale using the specified identifier.
     *
     * @param localeIdentifier
     *   A string with a 2 letter language identifier ("en", "es", "pt", etc.) -or- a 5 letter language + region
     *   identifier ("en-ca", "pt-ao").
     */
    public static set(localeIdentifier: string) {
        localeIdentifier = localeIdentifier.toLocaleLowerCase();

        if (localeIdentifier === "en" || localeIdentifier === "en-us") {
            Locale._currentIdentifier = "en-us";
            Locale._settings = {};
            return true;
        }

        if (!Locale.isAvailable(localeIdentifier)) {
            return false;
        }

        if (localeIdentifier.length === 2 && Locale._availableLanguages.hasOwnProperty(localeIdentifier)) {
            localeIdentifier = Locale._availableLanguages[localeIdentifier];
        }

        const pathToLocaleFile = Locale._availableFiles[localeIdentifier];

        Locale._currentIdentifier = localeIdentifier;
        Locale._settings = require(`./locales/${pathToLocaleFile}`).default;

        return true;
    }

    private static _availableFiles: Dictionary;
    private static _availableIdentifiers: string[];
    private static _availableLanguages: Dictionary;
    private static _currentIdentifier = "en-us";
    private static _settings: LocaleSettings = {};

    private static _initialize() {
        const availableFiles: Dictionary = {};
        const availableIdentifiers: string[] = [];
        const availableLanguages: Dictionary = {};

        const localeFiles = fs.readdirSync(path.join(__dirname, "locales"));

        for (const localeFile of localeFiles) {
            const localeIdentifier = localeFile.toLocaleLowerCase();

            // Splits the file path into 3 groups: path, language and region (which is optional)
            const localeParser = /(.*?|^)([a-z]{2})-?(|[a-z]{2})\.ts/.exec(localeIdentifier);

            if (localeParser === null) {
                continue;
            }

            const language = localeParser[2];
            const region = localeParser[3];
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
}

/**
 * This interface describes objects used to configure the overrides of a specific locale. This type represent the files
 * located on `/locales`.
 */
export interface LocaleSettings {

    /** These options allow for default linguistic configuration for the time units of the locale. */
    defaultOptions?: BaseTimeUnit;

    /** Using this property, each time unit can be individually translated. */
    timeUnits?: TimeUnitDatabase<LocalizedTimeUnit>;

    /** General configurations applying to the language. */
    writerOptions?: TimeWriterSettings;
}

/**
 * This interface extends from [[BaseTimeUnit]] with the only difference being that it enforces [[readableName]] to be
 * not-optional, in order to better characterize a parsed time unit object.
 */
export interface LocalizedTimeUnit extends BaseTimeUnit {

    /** This version of the property is not optional. */
    readonly readableName: string;
}
