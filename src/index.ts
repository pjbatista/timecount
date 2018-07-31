/** [[include:index.md]] */ /** */
/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { Big } from "big.js";
import * as localization from "./localization";
import * as utils from "./utils";

// These exports allow timecount sub-modules to be accessed directly via the main module
export { localization };
export { utils };

// Gets a time unit object from a time unit parameter
function timeUnitFromParameter(parameter: TimeUnitParameter | string) {

    if (typeof(parameter) === "object" && parameter.hasOwnProperty("factor")) {
        return parameter;
    }

    if (typeof(parameter) === "string") {

        if (timeUnits.hasOwnProperty(parameter)) {
            return timeUnits[parameter as keyof TimeUnitDatabase];
        }

        // tslint:disable-next-line:curly
        for (const name in timeUnits) if (timeUnits.hasOwnProperty(name)) {
            const timeUnit = (timeUnits as any)[name] as TimeUnit;
            const search = parameter.toLowerCase();

            // Searching for case insensitive names and plurals
            if (timeUnit.name.toLowerCase() === search || timeUnit.name.toLowerCase() + "s" === search ||
                (typeof(timeUnit.customPlural) === "string" && timeUnit.customPlural.toLowerCase() === search)) {

                return timeUnit;
            }
        }
    }

    throw new Error("Invalid time unit");
}

// Gets the decimal separator from an ECMA locale string
function getLocalDecimalSeparator() {
    const value = 1.1;
    const separator = value.toLocaleString().substring(1, 2);
    return separator;
}

// Chooses the first non-undefined value, or throws
function oneOf<T>(... values: Array<T | undefined>) {
    for (const value of values) {
        if (typeof(value) !== "undefined") {
            return value;
        }
    }

    throw new SyntaxError("All given values were undefined");
}

// Chooses the first non-undefined value, or returns undefined itself
function oneOrNoneOf<T>(... values: Array<T | undefined>) {
    for (const value of values) {
        if (typeof(value) !== "undefined") {
            return value;
        }
    }

    return undefined;
}

// Threshold of decimal parts used to analyze if a number should be rounded
const redundancyCheckThreshold = 6;

// List of roman numerals in order from greater to lesser
const romanNumerals: Array<[number, string]> = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"],  [90, "XC"],  [50, "L"],  [40, "XL"],
    [10, "X"],   [9, "IX"],   [5, "V"],   [4, "IV"],
    [1, "I"],
];

// List of roman fractions in no specific order
const romanFractions: Array<[number, string]> = [
    [1 / 12, "•"],  [2 / 12, ":"],  [3 / 12, "∴"],  [4 / 12, "::"],   [5 / 12, ":·:"],   [6 / 12, "S"],
    [7 / 12, "S•"], [8 / 12, "S:"], [9 / 12, "S∴"], [10 / 12, "S::"], [11 / 12, "S:·:"],
    [1 / 36, "ƧƧ"],
    [1 / 48, "Ɔ"],
    [1 / 72, "Ƨ"],
    [1 / 144, "𐆔"],
    [1 / 288, "℈"],
    [1 / 1728, "𐆕"],
];

/**
 * A database of [[TimeUnit]] objects, used to measure and represent time values in different formats. Each property is
 * an object describing the time unit's nanosecond correlation ([[TimeUnit.factor]]), its linguistic properties for
 * English (US) and its symbol, if it exists.
 *
 * ---
 *
 * See [[TimeUnitDatabase]] for more information about time units.
 */
export const timeUnits: TimeUnitDatabase<TimeUnit> = {
    anomalistcMonth: { factor: 2.38071312e15, name: "anomalistcMonth" },
    anomalistcYear: { factor: 3.15584325504e16, name: "anomalistcYear" },
    attosecond: { factor: 1e-9, name: "attosecond", symbol: "as" },
    biennium: { factor: 3.1536e17, name: "biennium", customPlural: "biennia" },
    century: { factor: 3.1536e18, name: "century", customPlural: "centuries" },
    day: { factor: 8.64e13, name: "day" },
    decade: { factor: 3.1536e17, name: "decade" },
    draconicMonth: { factor: 2.351135808e15, name: "draconicMonth" },
    draconicYear: { factor: 2.994797455629e16, name: "draconicYear" },
    exasecond: { factor: 1e27, name: "exasecond", symbol: "Es" },
    exbisecond: { factor: 1.152921504606846976e27, name: "exbisecond", symbol: "Eis" },
    femtosecond: { factor: 1e-6, name: "femtosecond", symbol: "fs" },
    fortnight: { factor: 1.2096e15, name: "fortnight" },
    galacticYear: { factor: 7.4898e24, name: "galacticYear" },
    gibisecond: { factor: 1.073741824e18, name: "gibisecond", symbol: "Gis" },
    gigasecond: { factor: 1e18, name: "gigasecond", symbol: "Gs" },
    hour: { factor: 3.6e12, name: "hour", symbol: "h" },
    jiffy: { factor: 3e-15, name: "jiffy", customPlural: "jiffies" },
    julianYear: { factor: 3.15576e16, name: "julianYear", readableName: "Julian year" },
    kibisecond: { factor: 1.024e12, name: "kibisecond", symbol: "Kis" },
    kilosecond: { factor: 1e12, name: "kilosecond", symbol: "Ks" },
    leapYear: { factor: 3.16224e16, name: "leapYear" },
    lustrum: { factor: 1.5768e17, name: "lustrum", customPlural: "lustra" },
    mebisecond: { factor: 1.048576e15, name: "mebisecond", symbol: "Mis" },
    megasecond: { factor: 1e15, name: "megasecond", symbol: "Ms" },
    microsecond: { factor: 1e3, name: "microsecond", symbol: "µs" },
    milisecond: { factor: 1e6, name: "milisecond", symbol: "ms" },
    millenium: { factor: 3.1536e19, name: "millenium", customPlural: "millennia" },
    minute: { factor: 6e10, name: "minute", symbol: "min" },
    month: { factor: 2.628e15, name: "month" },
    nanosecond: { factor: 1, name: "nanosecond", symbol: "ns" },
    nonLeapYear: { factor: 3.1536e+16, name: "nonLeapYear", readableName: "non-leap year" },
    novennium: { factor: 2.83824e17, name: "novennium", customPlural: "novennia" },
    octennium: { factor: 2.52288e17, name: "octennium", customPlural: "octennia" },
    pepisecond: { factor: 1.125899906842624e24, name: "pepisecond", symbol: "Pis" },
    petasecond: { factor: 1e24, name: "petasecond", symbol: "Ps" },
    picosecond: { factor: 1e-2, name: "picosecond", symbol: "ps" },
    planckTime: { factor: 5.39056e-35, name: "planckTime", symbol: "tₚ", readableName: "Planck time" },
    quadrennium: { factor: 6.3072e17, name: "quadrennium", customPlural: "quadrennia" },
    quindecennium: { factor: 4.7304e17, name: "quindecennium", customPlural: "quindecennia" },
    quinquennium: { factor: 1.5768e17, name: "quinquennium", customPlural: "quinquennia" },
    second: { factor: 1e9, name: "second", symbol: "s" },
    septennium: { factor: 2.20752e17, name: "septennium", customPlural: "septennia" },
    shake: { factor: 10, name: "shake" },
    siderealDay: { factor: 8.616409e13, name: "siderealDay" },
    siderealHour: { factor: 3.590170416667e12, name: "siderealHour" },
    siderealMinute: { factor: 5.983617361111e10, name: "siderealMinute" },
    siderealMonth: { factor: 2.360591424e15, name: "siderealMonth" },
    siderealSecond: { factor: 9.972695601852e8, name: "siderealSecond" },
    siderealYear: { factor: 3.155814954e16, name: "siderealYear" },
    svedberg: { factor: 1e-4, name: "svedberg", symbol: "Sv" },
    synodicMonth: { factor: 2.55144384e15, name: "synodicMonth" },
    tebisecond: { factor: 1.099511627776e21, name: "tebisecond", symbol: "Tis" },
    terasecond: { factor: 1e21, name: "terasecond", symbol: "Ts" },
    timeUnit: { factor: 1.024e6, name: "timeUnit", symbol: "TU" },
    tropicalYear: { factor: 3.155693e16, name: "tropicalYear" },
    week: { factor: 6.048e14, name: "week" },
    year: { factor: 3.1556952e16, name: "year" },
    yobisecond: { factor: 1.208925819614629174706176e33, name: "yobisecond", symbol: "Yis" },
    yoctosecond: { factor: 1e-12, name: "yoctosecond" },
    yottasecond: { factor: 1e33, name: "yottasecond", symbol: "Ys" },
    zebisecond: { factor: 1.180591620717411303424e30, name: "zebisecond", symbol: "Zis" },
    zeptosecond: { factor: 1e-15, name: "zeptosecond" },
    zettasecond: { factor: 1e30, name: "zettasecond", symbol: "Zs" },
};

/**
 * Base **time unit** definition; contains all linguistic-related properties pertaining to the unit being described.
 */
export interface BaseTimeUnit {

    /**
     * Defines a custom pluralized name for the time unit; it can be a string, used whenever the quantity of time is
     * greater than one -or- a function, able to retrieve different words according to said quantity.
     *
     * By default, words are pluralized by adding "s" to the end of the readable name.
     */
    customPlural?: string | NumericWriter;

    /**
     * Determines whether the time unit should be pluralized, either by adding "s" to the end of the readable name or
     * using [[customPlural]]; the default is true.
     */
    pluralize?: boolean;

    /**
     * Name of the time unit presented in a human readable format.
     *
     * For timecount's default language — English (US) — this is parsed from the name of the property that contains the
     * unit. For example, "galaticYear" is parsed as "galatic year"; however, in cases like "planckTime", that would
     * render "planck time", without the capitalization, so a _readableName_ is used.
     *
     * ---
     *
     * If you wish to help timecount by translating it to a known language of yours, check out
     * [Contributing: Translating](https://github.com/pjbatista/timecount/blob/master/CONTRIBUTING.md#translating).
     */
    readableName?: string;

    /** A symbol representing the time unit (e.g. "s" for seconds). */
    symbol?: string;
}

/**
 * A time value measured in nanoseconds.
 *
 * Timecount will always base its calculations on nanoseconds, only because it seemed appropriate: its smallest time
 * unit, Planck time, correlates with nanoseconds by ~10⁻³⁵; its greatest, yottasecond, by ~10³³. It's pretty much
 * balanced, _as all things should be_.
 */
export interface NanosecondBasedTime {

    /** Gets the quantity of time, in nanoseconds. */
    readonly nanoseconds: number;
}

/**
 * This type contains the available designations for [[TypeWriterSettings.numericNotation]].
 * - **"decimal" -** The standard _Hindu–Arabic numeral system_ using base ten;
 * - **"roman" -** The numeric system of the ancient Rome, ignoring fractions;
 * - **"roman-fractions" -** The numeric system of the ancient Rome, using
 *   [common Roman fractions](https://en.wikipedia.org/wiki/Roman_numerals#Fractions);
 * - **"scientific" -** Exponent notation; a method for writing very small and very large numbers using powers of 10.
 */
export type NumericNotation = "decimal" | "roman" | "roman-fractions" | "scientific";

/**
 * Functions of this type are used to express a certain quantity of time by [[TimeWriter]] and is one of the possible
 * value types of [[TypeWriterSettings.numericWriter]] (the other being a string).
 */
export type NumericWriter = (quantity: number) => string;

/**
 * Encapsulates a time value, implementing a [[NanosecondBasedTime]] capable of basic arithmetics and conversions (with
 * the help of [time units](../interfaces/_index_.timeunit.html)).
 *
 * To create a [[Time]] instance from any time unit, use [[Time.from]]; to convert the value from any Time instance, use
 * [[to]].
 */
export class Time implements NanosecondBasedTime {

    /**
     * Converts a time value measured using the specifid unit of time to a nanosecond-based time, creating and returning
     * a new instance of the [[Time]] class.
     *
     * @param value
     *   Numeric value quantifying the time by the given unit.
     * @param timeUnit
     *   Unit of time that qualifies the given time value.
     * @return
     *   A new [[Time]] instance with the appropriate amount of nanoseconds.
     */
    public static from(value: number, timeUnit: TimeUnitParameter) {

        timeUnit = timeUnitFromParameter(timeUnit);
        return new Time(value * timeUnit.factor);
    }

    private _value: number;

    /** Gets the time value in the same format it is stored, nanoseconds. */
    public get nanoseconds() { return this._value; }

    /**
     * Initializes a new instance of the [[Time]] class, using the specified time in nanoSeconds.
     *
     * @param value
     *   Amount of nanoseconds that represent the desired point in time.
     */
    public constructor(value: number | NanosecondBasedTime) {

        if (typeof(value) === "object") {
            value = value.nanoseconds;
        }

        this._value = Math.abs(value);
    }

    /**
     * Adds the value of this time with the value of another time.
     *
     * @param {(number | Time)} time2
     *   A number -or- a [[Time]] to be added to this time.
     * @return
     *   A new [[Time]] object with the resulting time.
     */
    public add(time2: number | Time) {

        if (time2 instanceof Time) {
            time2 = time2._value;
        }

        return new Time(Math.abs(this._value + time2));
    }

    /**
     * Divides the value of this time by the value of another time.
     *
     * @param {(number | Time)} time2
     *   A number -or- a [[Time]] which will divide this time.
     * @return
     *   A new [[Time]] object with the resulting time.
     */
    public divide(time2: number | Time) {

        if (time2 instanceof Time) {
            time2 = time2._value;
        }

        if (time2 === 0) {
            return new Time(NaN);
        }

        return new Time(Math.abs(this._value / time2));
    }

    /**
     * Multiplies the value of this time with the value of another time.
     *
     * @param {(number | Time)} time2
     *   A number -or- a [[Time]] to be multiplied by this time.
     * @return
     *   A new [[Time]] object with the resulting time.
     */
    public multiply(time2: number | Time) {

        if (time2 instanceof Time) {
            time2 = time2._value;
        }

        return new Time(Math.abs(this._value * time2));
    }

    /**
     * Subtracts the value of another time from the value of this time.
     *
     * @param {(number | Time)} time2
     *   A number -or- a [[Time]] to be subtracted to this time.
     * @return
     *   A new [[Time]] object with the resulting time.
     */
    public subtract(time2: number | Time) {

        if (time2 instanceof Time) {
            time2 = time2._value;
        }

        return new Time(Math.abs(this._value - time2));
    }

    /**
     * Converts the value of the current [[Time]] instance to the quantity corresponding to the given time unit.
     *
     * @param timeUnit
     *   The unit of time used to convert from this nanosecond-based value.
     * @return
     *   A number which represents the same measurement as this time value, converted to the given time unit.
     */
    public to(timeUnit: TimeUnitParameter) {

        timeUnit = timeUnitFromParameter(timeUnit);
        return this._value / timeUnit.factor;
    }

    /**
     * Gets a string representing the of value of this [[Time]] in nanoseconds.
     *
     * @return
     *   Number of nanoseconds followed by the symbol "ns".
     */
    public toString() {
        return `${this._value} ns`;
    }
}

/**
 * A **time unit** is a measurement of time.
 *
 * Objects of this type store linguist-based properties from [[BaseTimeUnit]] and the correlation between the time unit
 * and nanoseconds (i.e. how many nanoseconds fit in one unit).
 *
 * ---
 *
 * See [[TimeUnitDatabase]] for more information about time units.
 */
export interface TimeUnit extends BaseTimeUnit {

    /** A coefficient determining how many nanoseconds fit inside this time unit. */
    factor: number;

    /** Name of the time unit the same way it's declared on [[TimeUnitDatabase]] (used internally). */
    name: string;
}

/**
 * The base definition for the **time units** used by timecount, with information that was basically collected from
 * [Wikipedia](https://wikipedia.org) and the rest of the web.
 *
 * This collection is intended to provide a summary about the disclosed time units, encoraging `timecount` users to
 * explore with time conversions. It should be taken lightly — **innacurecies are expected**.
 *
 * @typeparam T
 *   A member inheriting from [[BaseUnit]]; this type is set to all time units.
 */
export interface TimeUnitDatabase<T extends BaseTimeUnit = BaseTimeUnit> {

    /**
     * The _Moon's orbit_ approximates an ellipse rather than a circle. However, the orientation (as well as the shape)
     * of this orbit is not fixed. In particular, the position of the extreme points (the line of the _apsides: perigee_
     * and _apogee_), rotates once (_apsidal precession_) in about 3,233 days (8.85 years). It takes the Moon longer to
     * return to the same apsis because it has moved ahead during one revolution.
     *
     * This longer period is called the **anomalistic month** and has an average length of
     * `27 days, 13 hours, 18 minutes, 33.2 seconds`.
     */
    readonly anomalistcMonth: T;

    /**
     * The **anomalistic year** is the time taken for the Earth to complete one revolution with respect to its apsides.
     * It is usually defined as the time between _perihelion_ passages. Its average duration is
     * `365 days, 6 hours, 13 minutes, 52.6 seconds`.
     */
    readonly anomalistcYear: T;

    /**
     * An **attosecond** is 1×10⁻¹⁸ of a second (`0.000000000000000001 second`). For context, an attosecond is to a
     * second what a second is to about 31.71 billion years.
     */
    readonly attosecond: T;

    /**
     * A **biennium** (plural _biennia_) is a period of `2 years`. The word is borrowed from the Latin _biennium_, from
     * _bi-_ (occuring twice) + _annus_ (year).
     */
    readonly biennium: T;

    /**
     * A century is a period of `100 years`. Centuries are numbered ordinally in English and many other languages.
     * According to the _strict construction_ of the Gregorian calendar, the 1st century began with 1 AD and ended with
     * 100 AD, with the same pattern continuing onward.
     */
    readonly century: T;

    /**
     * A **day**, a unit of time, is approximately the period of time during which the Earth completes one rotation with
     * respect to the Sun (_solar day_). It is commonly designated as a period of `24 hours`.
     */
    readonly day: T;

    /**
     * A **decade** is a period of `10 years`. The word is derived from the Ancient Greek: δεκάς (dekas), which means a
     * _group of ten_.
     */
    readonly decade: T;

    /**
     * A **draconic month** is also known as a nodical month. It is the average interval between two successive transits
     * of the Moon through the same _node_. Because of the _torque_ exerted by the Sun's gravity on the _angular
     * momentum_ of the Earth–Moon system, the plane of the Moon's orbit _gradually rotates_ westward, which means the
     * nodes gradually rotate around Earth. As a result, the time it takes the Moon to return to the same node is
     * shorter than a sidereal month, lasting `27 days, 5 hours, 5 minutes, 35.8 seconds`.
     */
    readonly draconicMonth: T;

    /**
     * The **draconic year**, eclipse year, or ecliptic year is the time taken for the Sun (as seen from the Earth) to
     * complete one revolution with respect to the same _lunar node_. The average duration of the eclipse year is
     * `346 days, 14 hours, 52 minutes, 54 seconds`.
     */
    readonly draconicYear: T;

    /**
     * The **exasecond** is a multiple of the unit _second_ for quantities of digital information. The binary prefix exa
     * means 10¹⁸ therefore, 1 exasecond is `1000000000000000000 seconds`.
     */
    readonly exasecond: T;

    /**
     * The **exbisecond** is a multiple of the unit _second_ for quantities of digital information. The binary prefix
     * exbi means 2⁶⁰ therefore, 1 exbisecond is `1152921504606846976 seconds`.
     */
    readonly exbisecond: T;

    /**
     * A **femtosecond** is the SI unit of time equal to 10⁻¹⁵ of a second or `0.000000000000001 second`. For context, a
     * femtosecond is to a second as a second is to about 31.71 million years.
     */
    readonly femtosecond: T;

    /**
     * A fortnight is a unit of time equal to `14 days` (2 weeks). The word derives from the Old English: _fēowertyne
     * niht_, meaning "fourteen nights".
     */
    readonly fortnight: T;

    /**
     * The **galactic year**, also known as a cosmic year, is the duration of time required for the Sun to orbit once
     * around the center of the Milky Way Galaxy. Estimates of the length of one orbit range from 225 to 250 million
     * terrestrial years, averaging `237,5 million years`.
     */
    readonly galacticYear: T;

    /**
     * The **gibisecond** is a multiple of the unit _second_ for quantities of digital information. The binary prefix
     * gibi means 2³⁰ therefore, 1 gibisecond is `1073741824 seconds`.
     */
    readonly gibisecond: T;

    /**
     * The **gigasecond** is a multiple of the unit _second_ for quantities of digital information. The binary prefix
     * giga means 10⁹ therefore, 1 gigasecond is `1000000000 seconds`.
     */
    readonly gigasecond: T;

    /**
     * An **hour** is a unit of time conventionally reckoned as 1⁄24 of a day and scientifically reckoned as 3599–3601
     * seconds, depending on conditions. For practical purposes, an hour is `3600 seconds`.
     */
    readonly hour: T;

    /**
     * A **jiffy** is the amount of time light takes to travel one _fermi_ (about the size of a _nucleon_) in a vacuum,
     * and is equivalent to `0.000001 attosecond`.
     */
    readonly jiffy: T;

    /**
     * In astronomy, a **Julian year** is a unit of measurement of time defined as exactly `365.25 days` of
     * `86400 seconds` each. The _Julian calendar_ which has started on different days, at different times, in different
     * countries is equal to either 365 or 366 days.
     */
    readonly julianYear: T;

    /**
     * The **kibisecond** is a multiple of the unit _second_ for quantities of digital information. The binary prefix
     * kibi means 2¹⁰ therefore, 1 kibisecond is `1024 seconds`.
     */
    readonly kibisecond: T;

    /**
     * The **kilosecond** is a multiple of the unit _second_ for quantities of digital information. The binary prefix
     * kilo means 10³ therefore, 1 kilosecond is `1000 seconds`.
     */
    readonly kilosecond: T;

    /**
     * A **leap year** (also known as an intercalary year or bissextile year) is a calendar year containing one
     * additional day added to keep the calendar year synchronized with the _astronomical_ or _seasonal year_.
     * Each leap year has `366 days`.
     */
    readonly leapYear: T;

    /**
     * A **non-leap year** occurs three of each four years, the remaining one being a [leap year](#leapYear). Each
     * non-leap year has `365 days`.
     */
    readonly nonLeapYear: T;

    /**
     * A **lustrum** (plural _lustra_) was a term for a five-year period in Ancient Rome; therefore one lustrum equals
     * to `5 years`, or a [[quinquennium]].
     *
     * The _lustration_ was originally a sacrifice for expiation and purification offered by one of the censors in the
     * name of the Roman people at the close of the taking of the census. The sacrifice was often in the form of an
     * animal sacrifice, known as a _suovetaurilia_.
     */
    readonly lustrum: T;

    /**
     * The **mebisecond** is a multiple of the unit _second_ for quantities of digital information. The binary prefix
     * mebi means 2²⁰ therefore, 1 mebisecond is `1048576 seconds`.
     */
    readonly mebisecond: T;

    /**
     * The **megasecond** is a multiple of the unit _second_ for quantities of digital information. The binary prefix
     * mega means 10⁶ therefore, 1 megasecond is `1000000 seconds`.
     */
    readonly megasecond: T;

    /**
     * A **microsecond** is an SI unit of time equal to `0.000001 second` or `1000 nanoseconds`.
     */
    readonly microsecond: T;

    /**
     * A **milisecond** is an SI unit of time equal to `0.001 second` or `1000000 nanoseconds`.
     */
    readonly milisecond: T;

    /**
     * A **millennium** (plural _millennia_) is a period equal to `1000 years`, also called kiloyears. Sometimes, it is
     * used specifically for periods of a thousand years that begin at the starting point (initial reference point) of
     * the calendar in consideration (typically the year "1"), or in later years that are whole number multiples of a
     * thousand years after it.
     */
    readonly millenium: T;

    /**
     * A minute is equal to 1⁄60 (the first sexagesimal fraction) of an hour, or `60 seconds`. In the UTC time standard,
     * a minute on rare occasions has 61 seconds, a consequence of _leap seconds_.
     */
    readonly minute: T;

    /**
     * A **month** is a unit of time, used with calendars, which is approximately as long as a natural period related to
     * the motion of the Moon. In Gregorian calendars, a month is approximately `30.41666666667 days`.
     */
    readonly month: T;

    /**
     * A **nanosecond** is an SI unit of time equal to 10⁻⁹ of a second or `0.000000001 second`. It is the standard unit
     * of time for `timecount objects`. Time units of this granularity are commonly encountered in telecommunications,
     * pulsed lasers, and related aspects of electronics.
     */
    readonly nanosecond: T;

    /**
     * A **novennium** (plural _novennia_) is a period equivalent to `9 years`.
     */
    readonly novennium: T;

    /**
     * An **octennium** (plural _octennia_) is a period equivalent to `8 years`.
     */
    readonly octennium: T;

    /**
     * The **pepisecond** is a multiple of the unit _second_ for quantities of digital information. The binary prefix
     * pepi means 2⁵⁰ therefore, 1 pepisecond is `1125899906842624 seconds`.
     */
    readonly pepisecond: T;

    /**
     * The **petasecond** is a multiple of the unit _second_ for quantities of digital information. The binary prefix
     * peta means 10¹⁵ therefore, 1 petasecond is `1000000000000000 seconds`.
     */
    readonly petasecond: T;

    /**
     * A **picosecond** is an SI unit of time equal to 10⁻¹² of a second or `0.000000000001 second`.  A picosecond is to
     * one second as one second is to approximately 31,689 years.
     */
    readonly picosecond: T;

    /**
     * The **Planck time** is the unit of time in the system of natural units known as _Planck units_. A Planck unit is
     * the time required for light to travel in a vacuum a distance of 1 _Planck length_, which is approximately
     * `5.39 × 10⁻⁴⁴ seconds`.
     */
    readonly planckTime: T;

    /**
     * A **quadrennium** (plural _quadrennia_) is a period of `4 years`, most commonly used in reference to the
     * four-year period between each Olympic Games. It is also used in reference to the four-year interval between
     * _leap years_.
     */
    readonly quadrennium: T;

    /**
     * A **quindecennium** (plural _quindecennia_) is a period equivalent to `15 years`.
     */
    readonly quindecennium: T;

    /**
     * A **quinquennium** (plural _quinquennia_) is a period equivalent to `5 years`, or a [[lustrum]].
     */
    readonly quinquennium: T;

    /**
     * The **second** is the SI base unit of time, commonly understood and historically defined as ¹/₈₆₄₀₀ of a day –
     * this factor derived from the division of the day first into 24 hours, then to 60 minutes and finally to 60
     * seconds each.
     */
    readonly second: T;

    /**
     * A **septennium** (plural _septennia_) is a period equivalent to `7 years`.
     */
    readonly septennium: T;

    /**
     * A **shake** is an informal unit of time equal to `10 nanoseconds`. It has applications in _nuclear physics_,
     * helping to conveniently express the timing of various events in a nuclear explosion.
     */
    readonly shake: T;

    /**
     * _Sidereal time_ is a timekeeping system that astronomers use to locate celestial objects. It is the angle,
     * measured along the _celestial equator_, from the observer's _meridian_ to the great circle that passes through
     * the _March equinox_ and both _celestial poles_, and is usually expressed in hours, minutes, and seconds.
     *
     * Using sidereal time, it is possible to easily point a telescope to the proper coordinates in the night sky. A
     * **sidereal day** is approximately `23 hours, 56 minutes, 4.0905 seconds`.
     */
    readonly siderealDay: T;

    /**
     * _Sidereal time_ is a timekeeping system that astronomers use to locate celestial objects. It is the angle,
     * measured along the _celestial equator_, from the observer's _meridian_ to the great circle that passes through
     * the _March equinox_ and both _celestial poles_, and is usually expressed in hours, minutes, and seconds.
     *
     * Using sidereal time, it is possible to easily point a telescope to the proper coordinates in the night sky. A
     * **sidereal hour** is approximately `59 minutes, 50.17041666672 seconds`.
     */
    readonly siderealHour: T;

    /**
     * _Sidereal time_ is a timekeeping system that astronomers use to locate celestial objects. It is the angle,
     * measured along the _celestial equator_, from the observer's _meridian_ to the great circle that passes through
     * the _March equinox_ and both _celestial poles_, and is usually expressed in hours, minutes, and seconds.
     *
     * Using sidereal time, it is possible to easily point a telescope to the proper coordinates in the night sky. A
     * **sidereal minute** is approximately `59.983617361111 seconds`.
     */
    readonly siderealMinute: T;

    /**
     * The period of the Moon's orbit as defined with respect to the _celestial sphere_ of apparently _fixed stars_
     * (nowadays the _International Celestial Reference Frame_) is known as a **sidereal month** because it is the time
     * it takes the Moon to return to a similar position among the stars: `27 days, 7 hours, 43 minutes, 11.6 seconds`.
     */
    readonly siderealMonth: T;

    /**
     * _Sidereal time_ is a timekeeping system that astronomers use to locate celestial objects. It is the angle,
     * measured along the _celestial equator_, from the observer's _meridian_ to the great circle that passes through
     * the _March equinox_ and both _celestial poles_, and is usually expressed in hours, minutes, and seconds.
     *
     * Using sidereal time, it is possible to easily point a telescope to the proper coordinates in the night sky. A
     * **sidereal second** is approximately `0.9972695601852 second`.
     */
    readonly siderealSecond: T;

    /**
     * A **sidereal year** is the time taken by the Earth to orbit the Sun once with respect to the _fixed stars_. Hence
     * it is also the time taken for the Sun to return to the same position with respect to the fixed stars after
     * apparently travelling once around the _ecliptic_. It is approximately
     * `365 days, 6 hours, 9 minutes, 9.504 seconds`.
     */
    readonly siderealYear: T;

    /**
     * The **Svedberg** is a time unit used for sedimentation rates (usually of proteins). It is defined as
     * `100 femtoseconds`.
     */
    readonly svedberg: T;

    /**
     * The **synodic month** is the average period of the Moon's orbit with respect to the line joining the Sun and
     * Earth. The long-term average duration is `29 days, 12 hours, 44 minutes, 2.8016 seconds`. The synodic month is
     * used to calculate **eclipse cycles**.
     */
    readonly synodicMonth: T;

    /**
     * The **tebisecond** is a multiple of the unit _second_ for quantities of digital information. The binary prefix
     * tebi means 2⁴⁰ therefore, 1 tebisecond is `1099511627776 seconds`.
     */
    readonly tebisecond: T;

    /**
     * The **terasecond** is a multiple of the unit _second_ for quantities of digital information. The binary prefix
     * tera means 10¹² therefore, 1 terasecond is `1000000000000 seconds`.
     */
    readonly terasecond: T;

    /**
     * A **time unit** (TU) is an unit of time defined as `1024 microseconds`. The unit allows for maintaining intervals
     * that are easy to implement in hardware that has a 1 MHz clock. One time unit is equal to one millionth of a
     * [[kibisecond]].
     */
    readonly timeUnit: T;

    /**
     * A **tropical year** (also known as a solar year) is the time that the Sun takes to return to the same position in
     * the _cycle of seasons_, as seen from Earth; for example, the time from vernal equinox to vernal equinox, or from
     * _summer solstice_ to summer solstice. It is approximetaly `365 days, 5 hours, 48 minutes, 43.488 seconds`.
     */
    readonly tropicalYear: T;

    /**
     * A **week** is a time unit equal to `7 days`. It is the standard time period used for cycles of rest days in most
     * parts of the world, mostly alongside—although not strictly part of—the Gregorian calendar.
     */
    readonly week: T;

    /**
     * For the Gregorian calendar, the average length of the calendar year (the mean year) across the complete _leap
     * cycle_ of 400 years is `365 days, 5 hours, 49 minutes, 12 seconds` or `365.2425 days`.
     */
    readonly year: T;

    /**
     * The **yobisecond** is a multiple of the unit _second_ for quantities of digital information. The binary prefix
     * yobi means 2⁸⁰ therefore, 1 yobisecond is `1208925819614629174706176 seconds`.
     */
    readonly yobisecond: T;

    /**
     * A **yoctosecond** is a unit of time equal to 10⁻²⁴ of a second or `0.000000000000000000000001 second`
     */
    readonly yoctosecond: T;

    /**
     * The **yottasecond** is a multiple of the unit _second_ for quantities of digital information. The binary prefix
     * yotta means 10²⁴ therefore, 1 yottasecond is `1000000000000000000000000 seconds`.
     */
    readonly yottasecond: T;

    /**
     * The **zebisecond** is a multiple of the unit _second_ for quantities of digital information. The binary prefix
     * zebi means 2⁷⁰ therefore, 1 zebisecond is `1180591620717411303424 seconds`.
     */
    readonly zebisecond: T;

    /**
     * A **zeptosecond** is a unit of time equal to 10⁻²¹ of a second or `0.000000000000000000001 second`
     */
    readonly zeptosecond: T;

    /**
     * The **zettasecond** is a multiple of the unit _second_ for quantities of digital information. The binary prefix
     * zetta means 10²¹ therefore, 1 zettasecond is `1000000000000000000000 seconds`.
     */
    readonly zettasecond: T;
}

/**
 * A union type, used by parameters that accept either a time unit name or a [[TimeUnit]] object.
 *
 * The accepted names are all the properties defined by [[TimeUnitDatabase]].
 */
export type TimeUnitParameter = keyof TimeUnitDatabase | TimeUnit;

/**
 * **Time writers** are used to synthesize time values into strings.
 *
 * In order to maximize usability, instances of [[TimeWriter]] have multiple configuration points, which, in order, are:
 * - Defaults — hardcoded for English (US);
 * - Options from the current [[Locale]];
 * - Options from the instance [[settings]];
 * - Options given as a parameter to [[write]].
 *
 * [[include:examples/timewriter.md]]
 */
export class TimeWriter {

    private _settings: TimeWriterSettings = {};
    private _timeUnitSettingsCache: BaseTimeUnit = {};
    private _writerSettingsCache: TimeWriterSettings = {};

    /** Gets or sets the object containing the [[TimeWriterSettings]] of this time writer. */
    public get settings() { return this._settings; }

    /**
     * Initializes a new instance of the [[TimeWriter]] class optionally using the specified `settings`.
     *
     * @param settings
     *   An object containing the [[TimeWriterSettings]] used to configure the behavior of this time writer.
     */
    public constructor(settings: TimeWriterSettings = {}) {
        this._settings = settings;
    }

    /**
     * Synthesizes a string representing the given `timeValue`.
     *
     * This time is measured with `originTimeUnit`, then converted and written with `targetTimeUnit`.
     *
     * @param timeValue
     *   A time value which will be measured using the given the origin time unit.
     * @param originTimeUnit
     *   Unit of time to be designated to the time value.
     * @param targetTimeUnit
     *   Unit of time in which the time value will be written.
     * @param options
     *   An optional set of configurations overwriting the values from both this object and the [[Locale]].
     */
    public write(timeValue: number, originTimeUnit?: TimeUnitParameter, targetTimeUnit?: TimeUnitParameter,
        options?: TimeWriterSettings): string;

    /**
     * Synthesizes a string representing the given `timeValue`.
     *
     * This time is measured and written with `timeUnit`.
     *
     * @param timeValue
     *   A time value which will be measured using the given the time unit.
     * @param timeUnit
     *   Unit of time to be designated to and in which the time value will be written.
     * @param options
     *   An optional set of configurations overwriting the values from both this object and the [[Locale]].
     */
    public write(timeValue: number, timeUnit?: TimeUnitParameter, options?: TimeWriterSettings): string;

    /**
     * Synthesizes a string representing the given `timeValue`.
     *
     * This time is measured and written using [[TimeWriterSettings.defaultTimeUnit]], which by itself defaults to
     * "nanoseconds".
     *
     * @param timeValue
     *   A time value which will be measured using a default time unit.
     * @param options
     *   An optional set of configurations overwriting the values from both this object and the [[Locale]].
     */
    public write(timeValue: number, options?: TimeWriterSettings): string;

    /**
     * Synthesizes a string representing the given `time`.
     *
     * This time is measured in nanoseconds, then converted and written with `targetTimeUnit`.
     *
     * @param time
     *   A nanosecond-based time object.
     * @param targetTimeUnit
     *   Unit of time in which the time value will be written.
     * @param options
     *   An optional set of configurations overwriting the values from both this object and the [[Locale]].
     */
    public write(time: NanosecondBasedTime, targetTimeUnit?: TimeUnitParameter, options?: TimeWriterSettings): string;

    /**
     * Synthesizes a string representing the given `time`.
     *
     * This time is measured in nanoseconds, then converted and written [[TimeWriterSettings.defaultTimeUnit]], which by
     * itself defaults to "nanoseconds".
     *
     * @param time
     *   A nanosecond-based time object.
     * @param options
     *   An optional set of configurations overwriting the values from both this object and the [[Locale]].
     */
    public write(time: NanosecondBasedTime, options?: TimeWriterSettings): string;

    // Actual implementation of write
    public write(time: number | NanosecondBasedTime, originTimeUnit?: TimeUnitParameter | TimeWriterSettings,
        targetTimeUnit?: TimeUnitParameter | TimeWriterSettings, options?: TimeWriterSettings) {

        const isOptions = (parameter?: TimeUnitParameter | TimeWriterSettings) =>
            typeof(parameter) !== "string" && (parameter && !parameter.hasOwnProperty("factor"));

        if (isOptions(targetTimeUnit)) {
            options = targetTimeUnit as TimeWriterSettings;
            targetTimeUnit = undefined;
        } else if (isOptions(originTimeUnit)) {
            options = originTimeUnit as TimeWriterSettings;
            originTimeUnit = undefined;
        }

        options = options || {};
        const writerSettings = this._writerSettingsCache = this._createWriterSettingsCache(options);

        originTimeUnit = timeUnitFromParameter((originTimeUnit || writerSettings.defaultTimeUnit) as TimeUnitParameter);
        targetTimeUnit = timeUnitFromParameter((targetTimeUnit as TimeUnitParameter) || originTimeUnit);

        if (typeof(time) === "number") {
            time = Time.from(time, originTimeUnit);
        }

        if (!(time instanceof Time)) {
            time = new Time(time);
        }

        this._timeUnitSettingsCache = this._createTimeUnitSettingsCache(targetTimeUnit);
        let targetValue = (time as Time).to(targetTimeUnit);

        if (!isNaN(targetValue) && targetValue !== Infinity) {
            const parts = Big(targetValue).toFixed().split(getLocalDecimalSeparator());

            // This will test for redundancy errors, caused by inaccuracies of floating points
            if (parts[1] && parts[1].length >= redundancyCheckThreshold && !/[^9]/.test(parts[1])) {
                targetValue = Math.round(targetValue);
            }
        }

        const writtenNumber = this._writeNumber(targetValue);

        if (writerSettings.hideTimeUnit) {
            return writtenNumber;
        }

        const timeUnitName = this._writeTimeUnit(targetValue);
        const spacing = writerSettings.spaceTimeUnit ? " " : "";

        return `${writtenNumber}${spacing}${timeUnitName}`;
    }

    // Since there are multiple methods that access the fully-overwritten settings, we create a cache for them
    // This cache is only pertinent during `write`

    // The first cache is for the time unit: 1) language, 2) languageDefault, 3) hardcoded
    private _createTimeUnitSettingsCache(timeUnit: TimeUnit): BaseTimeUnit {

        const localeTimeUnits = (localization.Locale.settings.timeUnits || {}) as any;
        const language: BaseTimeUnit = localeTimeUnits[timeUnit.name] || {};
        const languageDefault = localization.Locale.settings.defaultOptions || {};

        const name = timeUnit.name.replace(/([a-z])([A-Z])/g, "$1 $2").toLowerCase();

        return {
            // tslint:disable:max-line-length
            customPlural: oneOrNoneOf(language.customPlural, languageDefault.customPlural || (null as any), timeUnit.customPlural),
            pluralize: oneOf(language.pluralize, languageDefault.pluralize, timeUnit.pluralize, true),
            readableName: oneOf(language.readableName, languageDefault.readableName, timeUnit.readableName, name),
            symbol: oneOrNoneOf(language.symbol, languageDefault.symbol, timeUnit.symbol),
            // tslint:enable:max-line-length
        };
    }

    // The second is for the writer itself: 1) method, 2) instance, 3) language, 3) defaults
    private _createWriterSettingsCache(methodSettings?: TimeWriterSettings): TimeWriterSettings {

        methodSettings = methodSettings || {};
        const language = localization.Locale.settings.writerOptions || {};

        const terms1 = methodSettings.terms || {};
        const terms2 = this._settings.terms || {};
        const terms3 = language.terms || {};

        return {
            // tslint:disable:max-line-length
            decimalSeparator: oneOf(methodSettings.decimalSeparator, this._settings.decimalSeparator, language.decimalSeparator, "."),
            defaultTimeUnit: oneOf(methodSettings.defaultTimeUnit, this._settings.defaultTimeUnit, language.defaultTimeUnit, "nanosecond"),
            fractionDigits: oneOrNoneOf(methodSettings.fractionDigits, this._settings.fractionDigits, language.fractionDigits),
            hideTimeUnit: oneOf(methodSettings.hideTimeUnit, this._settings.hideTimeUnit, language.hideTimeUnit, false),
            numericNotation: oneOf(methodSettings.numericNotation, this._settings.numericNotation, language.numericNotation, "decimal"),
            numericWriter: oneOrNoneOf(methodSettings.numericWriter, this._settings.numericWriter, language.numericWriter),
            spaceTimeUnit: oneOf(methodSettings.spaceTimeUnit, this._settings.spaceTimeUnit, language.spaceTimeUnit, true),
            terms: {
                infinite: oneOf(terms1.infinite, terms2.infinite, terms3.infinite, "infinite"),
                nan: oneOf(terms1.nan, terms2.nan, terms3.nan, "not-a-number"),
            },
            verboseTimeUnit: oneOf(methodSettings.verboseTimeUnit, this._settings.verboseTimeUnit, language.verboseTimeUnit, false),
            // tslint:enable:max-line-length
        };
    }

    // This parses all numeric properties: numericWriter, numericNotation, fractionDigits and decimalSeparator
    private _writeNumber(value: number) {

        if (typeof(this._writerSettingsCache.numericWriter) === "function") {
            return this._writerSettingsCache.numericWriter(value);
        }

        const terms = this._writerSettingsCache.terms || {};

        if (value === Infinity) {
            return terms.infinite as string;
        }

        if (isNaN(value)) {
            return terms.nan as string;
        }

        if (this._writerSettingsCache.numericNotation === "roman") {
            return this._writeRoman(value);
        }

        if (this._writerSettingsCache.numericNotation === "roman-fractions") {
            return this._writeRoman(value, true);
        }

        const decimalSeparator = getLocalDecimalSeparator();
        let result: string;

        // The only big.js usage for this module is to write the numbers (JS math is faster for calculations):
        if (this._writerSettingsCache.numericNotation === "scientific") {
            result = Big(value).toExponential(this._writerSettingsCache.fractionDigits);
        } else {
            result = Big(value).toFixed(this._writerSettingsCache.fractionDigits);
        }

        if (this._writerSettingsCache.decimalSeparator === decimalSeparator) {
            return result;
        }

        return result.replace(decimalSeparator, this._writerSettingsCache.decimalSeparator as string);
    }

    private _writeRoman(value: number, fractions: boolean = false) {

        if (value === 0) {
            return "nulla";
        }

        const fixedValue = Math.trunc(value);
        let amountLeft = fixedValue;
        let result = "";

        while (amountLeft > 0) {
            // The order of romanNumerals is important here: they are written from large to lesser
            for (const entry of romanNumerals) {

                // So, if value is 1111, this accounts for M (1000) first, then C (100), then X (10), then I (1)
                if (amountLeft >= entry[0]) {
                    amountLeft -= entry[0];
                    result += entry[1];
                    break;
                }
            }
        }

        if (fractions) {
            result += this._writeRomanFraction(value - fixedValue);
        }

        return result.length > 0 ? result : "nulla";
    }

    private _writeRomanFraction(fraction: number) {

        let smallestDifference = Number.MAX_SAFE_INTEGER;
        let smallestIndex = -1;

        // Not much to explain: compares all romanFractions with the given fraction and returns the one with the
        // smallest difference (only faster if the difference is exactly zero)

        for (let i = 0; i < romanFractions.length; i += 1) {
            const romanFraction = romanFractions[i];
            const difference = Math.abs(fraction - romanFraction[0]);

            if (difference === 0) {
                return romanFraction[1];
            }

            if (difference < smallestDifference) {
                smallestDifference = difference;
                smallestIndex = i;
            }
        }

        return romanFractions[smallestIndex][1];
    }

    // This parses all linguistic properties: customPlural, pluralize, readableName and symbol
    private _writeTimeUnit(value: number) {
        const timeUnitSettings = this._timeUnitSettingsCache;

        let pluralize = value > 1 && (!!timeUnitSettings.customPlural || timeUnitSettings.pluralize);
        let readableName = timeUnitSettings.readableName as string;

        // Never pluralize symbols
        if (!this._writerSettingsCache.verboseTimeUnit && timeUnitSettings.symbol) {
            readableName = timeUnitSettings.symbol;
            pluralize = false;
        }

        if (pluralize && !timeUnitSettings.customPlural) {
            readableName = `${readableName}s`;
        }

        if (pluralize && typeof(timeUnitSettings.customPlural) === "string") {
            readableName = timeUnitSettings.customPlural;
        }

        if (pluralize && typeof(timeUnitSettings.customPlural) === "function") {
            readableName = timeUnitSettings.customPlural(value);
        }

        return readableName;
    }
}

/**
 * Contains configurations for [[TimeWriter]].
 *
 * Objects of this type may be assigned
 */
export interface TimeWriterSettings {

    /** Specifies the string used as decimal separator. */
    decimalSeparator?: string;

    /** Specifies the default unit to convert to when writing time values. */
    defaultTimeUnit?: TimeUnitParameter;

    /** Specifies the amount of fraction digits to be synthesized. */
    fractionDigits?: number;

    /** When enabled, time units will not be written. */
    hideTimeUnit?: boolean;

    /** Numeric system used when writing time values; defaults to `"decimal"`. */
    numericNotation?: NumericNotation;

    /**
     * A custom function that provides a way to write time values in any format desired. When provided, [[TimeWriter]]
     * will ignore [[numericNotation]] and use this instead.
     */
    numericWriter?: NumericWriter;

    /** Whether or not to space numbers and time units. */
    spaceTimeUnit?: boolean;

    /**
     * This property may be used to set the terminology used to represent a few special numeric values.
     *
     * Specifying a [[numericWriter]] will override the usage of these terms.
     */
    terms?: {

        /** The word used for inifinite values, _Infinity_. */
        infinite?: string;

        /** The word used for not-a-number values, _NaN_. */
        nan?: string;
    };

    /** Whether or not to write down the full unit readable name, instead of its symbol. */
    verboseTimeUnit?: boolean;
}
