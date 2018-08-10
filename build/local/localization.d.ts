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
export declare class Locale {
    private static _availableFiles;
    private static _availableIdentifiers;
    private static _availableLanguages;
    private static _currentIdentifier;
    private static _settings;
    /**
     * Gets the current locale identifier.
     *
     * @deprecated Since v1.1.0 - In favor of `get` (will be removed in v2).
     */
    static readonly currentIdentifier: string;
    /** Gets the configuration for the current locale which represents the translation file currently loaded. */
    static readonly settings: LocaleSettings;
    /**
     * Gets the current locale identifier (e.g.: "fr" represents French — the international translation for the language
     * as a whole; "fr-ca" is French (Canada) — represents a localized variation of the French language meant for
     * Canada).
     *
     * The default is "en-us", which represents English (United States), a language built into the module (doesn't
     * require any translation file).
     */
    static get(): string;
    /**
     * Gets whether the given locale identifier is available to `timecount`.
     *
     * @param localeIdentifier
     *   A language / region locale specifier (e.g. "en-au", "pt-br").
     * @return
     *   True if a valid locale was provided; false otherwise.
     */
    static isAvailable(localeIdentifier: string): boolean;
    /**
     * Gets a list with all locale identifiers available to timecount.
     *
     * @return
     *   An array with all available locale identifiers.
     */
    static listAvailable(): string[];
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
    static set(localeIdentifier?: string): void;
    private static _initialize;
    private constructor();
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
     * calls (unless overriden by the object or method).
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
//# sourceMappingURL=localization.d.ts.map