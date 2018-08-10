/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
/** [[include:index.md]] */ /** */
import { Decimal } from "decimal.js";
import * as localization from "./localization";
import * as utils from "./utils";
export { localization };
export { utils };
/**
 * Writes a numeric value using numerals from the _Ancient Rome_.
 *
 * @param value
 *   A number or [big decimal](https://mikemcl.github.io/decimal.js) to be converted to roman.
 * @param fractions
 *   Whether to include [common fractions](https://en.wikipedia.org/wiki/Roman_numerals#Fractions) or not.
 * @return
 *   A string with the roman representation of the given number.
 */
export declare function writeRoman(value: number | Decimal, fractions?: boolean): string;
/**
 * Writes the fraction part of a numeric value using common fractions from the _Ancient Rome_.
 *
 * @param value
 *   A number that will have its decimal part extracted and written in roman.
 * @return
 *   A string with the roman representation of the given fraction.
 */
export declare function writeRomanFractions(value: number | Decimal): string;
/**
 * Objects pertaining to this constant can be used as a parameter value for the
 * [countdown](../classes/_index_.timewriter.html#countdown) method of time writers.
 *
 * These constants contains groups of [time units](../classes/_index_.timeunitdatabase.html) that are related.
 */
export declare const TimeSegments: {
    /** All base ten [SI](https://en.wikipedia.org/wiki/International_System_of_Units) time units. */
    baseTen: string[];
    /** All base two binary time units. */
    binary: string[];
    /** Common time unit segmentation: year, month, day, hour, minute and second. */
    common: string[];
    /** Extremes and the middle-point of timecount units: Planck time, nanosecond and yobisecond. */
    extremes: string[];
    /** Contains all units of a [sidereal time](https://en.wikipedia.org/wiki/Sidereal_time). */
    sidereal: string[];
};
/**
 * A database of [time units](../interfaces/_index_.timeunit.html), used to qualify and describe lengths of time.
 *
 * Each property of this object enumerates the linguistic and mathematical features of the time unit it represents.
 *
 * ---
 *
 * See [TimeUnitDatabase](../interfaces/_index_.timeunitdatabase.html) for more information about time units.
 */
export declare const TimeUnits: TimeUnitDatabase<TimeUnit>;
/**
 * Alias to [TimeUnits](#timeunits-1).
 *
 * @deprecated Since v1.1.0 - Incorrect naming, all exported constants are now capitalized (will be removed in v2).
 */
export declare const timeUnits: TimeUnitDatabase<TimeUnit>;
/**
 * This interface is a base time unit definition, consisting of linguistic-related properties pertaining to the time
 * unit being described.
 *
 * Mathematical properties are left out of this interface in order to allow better control over configurations (and
 * since time units have the same mathematical constants regardless of language).
 */
export interface BaseTimeUnit {
    /**
     * Defines a custom pluralized name for the time unit; it can be a string — used whenever the quantity of time is
     * greater than one — or a function, able to retrieve different words according to a given quantity.
     *
     * By default, words are pluralized by adding an "s" to the end of their [readable name](#readablename).
     */
    customPlural?: string | NumericWriter;
    /**
     * Determines whether the time unit should be pluralized: by default, words are pluralized by adding an "s" to the
     * end of their [readable name](#readablename), but this can be changed via [customPlural](#customplural).
     *
     * If set to false, this will prevent the time unit from ever being pluralized (unless this configuration is
     * overwritten).
     */
    pluralize?: boolean;
    /**
     * Name of the time unit presented in a human readable format.
     *
     * For timecount's default language — English (US) — this is parsed from the name of the property that contains the
     * time unit, taking advantage of its [medial capitals](https://en.wikipedia.org/wiki/Camel_case) to separate
     * compound names (`galacticYear` parses as "galactic year").
     *
     * In some cases, however, a custom readable name is required even in English (US) (`planckTime`, for example, would
     * not be correctly capitalized as "Planck time").
     *
     * ---
     *
     * If you wish to help timecount with a translation, plese consult
     * [Contributing: Translating](https://github.com/pjbatista/timecount/blob/master/CONTRIBUTING.md#translating).
     */
    readableName?: string;
    /** A symbol representing the time unit (e.g. "s" for seconds). */
    symbol?: string;
}
/**
 * This interface is used internally in order to map the [time unit database](../modules/_index_.html#time_unit) using
 * its properties.
 */
export interface NamedTimeUnit extends TimeUnit {
    /** This name is parsed from the name of the property that contains the time unit object. */
    name: keyof TimeUnitDatabase;
}
/**
 * This interface represents a nanosecond-based time value.
 *
 * @deprecated Since v1.1.0 - Unnecessary interface (will be removed in v2).
 */
export interface NanosecondBasedTime {
    /** Gets the numeric representation of the time length in nanoseconds. */
    readonly nanoseconds: number;
}
/**
 * This type contains all values accepted when configuring
 * [numeric notations](../interfaces/_index_.typewritersettings#numericnotation).
 *
 * - **"decimal":** standard _Hindu–Arabic numeral system_ using base ten;
 * - **"roman":** _Ancient Rome_ numeral system, ignoring fractions;
 * - **"roman-fractions":** _Ancient Rome_ numeral system, using
 *   [common fractions](https://en.wikipedia.org/wiki/Roman_numerals#Fractions);
 * - **"scientific":** Exponent notation; writes very small and very large numbers using powers of 10.
 */
export declare type NumericNotation = "decimal" | "roman" | "roman-fractions" | "scientific";
/**
 * This type defines functions used by [time writers](../classes/_index_.timewriter.html) in order to express a numeric
 * value in the form of text.
 *
 * The first parameter is a native number and the second, optional, is a
 * [big decimal](https://www.npmjs.com/package/decimal.js).
 */
export declare type NumericWriter = (value: number, bigValue?: Decimal) => string;
/**
 * This enumeration contains all [rounding modes](../interfaces/_index_.timewritersettings.html#roundingmode) available,
 * extracted from the [decimal.js documentation](https://mikemcl.github.io/decimal.js).
 */
export declare enum RoundingMode {
    /** Rounds away from zero. */
    RoundUp = 0,
    /** Rounds towards zero. */
    RoundDown = 1,
    /** Rounds towards _Infinity_. */
    RoundCeil = 2,
    /** Rounds towards _-Infinity_. */
    RoundFloor = 3,
    /** Rounds towards nearest neighbour; if equidistant, rounds away from zero. */
    RoundHalfUp = 4,
    /** Rounds towards nearest neighbour; if equidistant, rounds towards zero. */
    RoundHalfDown = 5,
    /** Rounds towards nearest neighbour; if equidistant, rounds towards even neighbour. */
    RoundHalfEven = 6,
    /** Rounds towards nearest neighbour; if equidistant, rounds towards _Infinity_. */
    RoundHalfCeil = 7,
    /** Rounds towards nearest neighbour; if equidistant, rounds towards _-Infinity_. */
    RoundHalfFloor = 8
}
/**
 * Encapsulates a nanosecond-based time value.
 *
 * Instances of this class are capable of being converted [from](#from) and [to](#to) / [to big decimal](#toBig) other
 * [time units](../interfaces/_index_.timeunitdatabase.html) and also perform basic arithmetics.
 *
 * Times can also be [approximated](#isApproximated), and operations deriving from their use will also be approximated.
 * This doesn't affect the time object value in any way, but is used by [TimeWriter](_index_.timewriter.html) to
 * demonstrate approximations.
 *
 * All instances are _immutable_, thus not affected by methods (new instances are always created instead). Also, all
 * time values are necessarily positive (negative times are not a thing).
 */
export declare class Time {
    private _approximated;
    private _nanoseconds;
    /**
     * Gets the [big decimal](https://www.npmjs.com/package/decimal.js) representation of the time length, in
     * nanoseconds.
     */
    readonly bigValue: Decimal;
    /**
     * Gets whether the value of this is an approximation. This is determined at construction and it remains in all
     * operations with that this time is involved.
     */
    readonly isApproximated: boolean;
    /**
     * Gets the numeric representation of the time length in nanoseconds.
     *
     * @deprecated Since v1.1.0 - In favor of `bigValue` and `value` (will be removed in v2).
     */
    readonly nanoseconds: number;
    /**
     * Gets the numeric representation of the time length, in nanoseconds.
     */
    readonly value: number;
    /**
     * Initializes a new instance of the [Time](_index_.time.html) class using the given time value parameter.
     *
     * @param value
     *   A value representing the length of time, accepted as a _string_ that parses to a number (e.g. "1000" or
     *   "1e-10"), a [big decimal](https://www.npmjs.com/package/decimal.js) or a _number_.
     * @param approximated
     *   Whether the given is an approximation or not. The result of any arithmetic operations involving this time will
     *   also be approximated.
     * @throws Error
     *   When the value is invalid.
     */
    constructor(value: TimeValueSource, approximated?: boolean);
    /**
     * Initializes a new instance of the [Time](_index_.time.html) class using the given time value parameter.
     *
     * @param value
     *   Another [Time](_index_.time.html) instance to be replicated.
     * @throws Error
     *   When the value is invalid.
     */
    constructor(value: Time);
    /**
     * Converts a time value, measuring it with the specified time unit, and creates a new
     * [Time](../classes/_index_.time.html) instance with an equivalent length of time, but measured in nanoseconds.
     *
     * @param value
     *   A value representing the length of time, accepted as a _string_ that parses to a number (e.g. "1000" or
     *   "1e-10"), a [big decimal](https://www.npmjs.com/package/decimal.js) or a _number_.
     * @param timeUnit
     *   Time unit used as source for the conversion.
     * @return
     *   A nanosecond-based time obtained from the conversion of the given parameters.
     * @throws Error
     *   When the value is invalid -or- the time unit is invalid.
     */
    static from(value: TimeValueSource, timeUnit: TimeUnitSource): Time;
    /**
     * Converts a time value, measuring it with the specified time unit, and creates a new
     * [Time](../classes/_index_.time.html) instance with an equivalent length of time, but measured in nanoseconds.
     *
     * @param value
     *   A value representing the length of time, accepted as a _string_ that parses to a number (e.g. "1000" or
     *   "1e-10"), a [big decimal](https://www.npmjs.com/package/decimal.js) or a _number_.
     * @param timeUnit
     *   Time unit used as source for the conversion. Accepts plurals and case variations.
     * @return
     *   A nanosecond-based time obtained from the conversion of the given parameters.
     * @throws Error
     *   When the value is invalid -or- the time unit is invalid.
     */
    static from(value: TimeValueSource, timeUnit: string | TimeUnit): Time;
    /**
     * Adds the value of this time with the value of another time. If either are [approximations](#isApproximated), the
     * result will also be.
     *
     * @param value
     *   A value representing the length of time, accepted as a _string_ that parses to a number (e.g. "1000" or
     *   "1e-10"), a [big decimal](https://www.npmjs.com/package/decimal.js) or a _number_ -or- another
     *   [Time](_index_.time.html) instance used to be added to this time.
     * @param timeUnit
     *   Time unit used as source for the conversion of `value`. This defaults to "nanosecond" and is ignored when a
     *   [Time](_index_.time.html) object is provided.
     * @return
     *   A [Time](_index_.time.html) object with the values of both times added to each other.
     * @throws Error
     *   When the value is invalid -or- the time unit is invalid.
     */
    add(value: TimeValueSource | Time, timeUnit?: TimeUnitSource): Time;
    /**
     * Adds the value of this time with the value of another time. If either are [approximations](#isApproximated), the
     * result will also be.
     *
     * @param value
     *   A value representing the length of time, accepted as a _string_ that parses to a number (e.g. "1000" or
     *   "1e-10"), a [big decimal](https://www.npmjs.com/package/decimal.js) or a _number_ -or- another
     *   [Time](_index_.time.html) instance used to be added to this time.
     * @param timeUnit
     *   Time unit used as source for the conversion of `value`. This defaults to "nanosecond" and is ignored when a
     *   [Time](_index_.time.html) object is provided. Accepts plurals and case variations.
     * @return
     *   A [Time](_index_.time.html) object with the values of both times added to each other.
     * @throws Error
     *   When the value is invalid -or- the time unit is invalid.
     */
    add(value: TimeValueSource | Time, timeUnit?: string | TimeUnit): Time;
    /**
     * Creates and returns a new time object that contains the value of this time, however with the approximated flag.
     *
     * @returns
     *   Approximated time in relation to this time.
     */
    approximate(): Time;
    /**
     * Divides the value of this time by the value of another time. If either are [approximations](#isApproximated), the
     * result will also be.
     *
     * @param value
     *   A value representing the length of time, accepted as a _string_ that parses to a number (e.g. "1000" or
     *   "1e-10"), a [big decimal](https://www.npmjs.com/package/decimal.js) or a _number_ -or- another
     *   [Time](_index_.time.html) instance used to divide this time.
     * @param timeUnit
     *   Time unit used as source for the conversion of `value`. This defaults to "nanosecond" and is ignored when a
     *   [Time](_index_.time.html) object is provided.
     * @return
     *   A [Time](_index_.time.html) object with the value of this time divided by the value of the other time.
     * @throws Error
     *   When the value is invalid -or- the time unit is invalid.
     */
    divide(value: TimeValueSource | Time, timeUnit?: TimeUnitSource): Time;
    /**
     * Divides the value of this time by the value of another time. If either are [approximations](#isApproximated), the
     * result will also be.
     *
     * @param value
     *   A value representing the length of time, accepted as a _string_ that parses to a number (e.g. "1000" or
     *   "1e-10"), a [big decimal](https://www.npmjs.com/package/decimal.js) or a _number_ -or- another
     *   [Time](_index_.time.html) instance used to divide this time.
     * @param timeUnit
     *   Time unit used as source for the conversion of `value`. This defaults to "nanosecond" and is ignored when a
     *   [Time](_index_.time.html) object is provided. Accepts plurals and case variations.
     * @return
     *   A [Time](_index_.time.html) object with the value of this time divided by the value of the other time.
     * @throws Error
     *   When the value is invalid -or- the time unit is invalid.
     */
    divide(value: TimeValueSource | Time, timeUnit?: string | TimeUnit): Time;
    /**
     * Multiplies the value of this time with the value of another time. If either are
     * [approximations](#isApproximated), the result will also be.
     *
     * @param value
     *   A value representing the length of time, accepted as a _string_ that parses to a number (e.g. "1000" or
     *   "1e-10"), a [big decimal](https://www.npmjs.com/package/decimal.js) or a _number_ -or- another
     *   [Time](_index_.time.html) instance used to be multiplied by this time.
     * @param timeUnit
     *   Time unit used as source for the conversion of `value`. This defaults to "nanosecond" and is ignored when a
     *   [Time](_index_.time.html) object is provided.
     * @return
     *   A [Time](_index_.time.html) object with the value of both times multiplied by each other.
     * @throws Error
     *   When the value is invalid -or- the time unit is invalid.
     */
    multiply(value: TimeValueSource | Time, timeUnit?: TimeUnitSource): Time;
    /**
     * Multiplies the value of this time with the value of another time. If either are
     * [approximations](#isApproximated), the result will also be.
     *
     * @param value
     *   A value representing the length of time, accepted as a _string_ that parses to a number (e.g. "1000" or
     *   "1e-10"), a [big decimal](https://www.npmjs.com/package/decimal.js) or a _number_ -or- another
     *   [Time](_index_.time.html) instance used to be multiplied by this time.
     * @param timeUnit
     *   Time unit used as source for the conversion of `value`. This defaults to "nanosecond" and is ignored when a
     *   [Time](_index_.time.html) object is provided. Accepts plurals and case variations.
     * @return
     *   A [Time](_index_.time.html) object with the value of both times multiplied by each other.
     * @throws Error
     *   When the value is invalid -or- the time unit is invalid.
     */
    multiply(value: TimeValueSource | Time, timeUnit?: string | TimeUnit): Time;
    /**
     * Subtracts the value of another time from the value of this time. If either are [approximations](#isApproximated),
     * the result will also be.
     *
     * @param value
     *   A value representing the length of time, accepted as a _string_ that parses to a number (e.g. "1000" or
     *   "1e-10"), a [big decimal](https://www.npmjs.com/package/decimal.js) or a _number_ -or- another
     *   [Time](_index_.time.html) instance used to be subtracted from this time.
     * @param timeUnit
     *   Time unit used as source for the conversion of `value`. This defaults to "nanosecond" and is ignored when a
     *   [Time](_index_.time.html) object is provided.
     * @return
     *   A [Time](_index_.time.html) object with the value of this time divided by the value of the other time.
     * @throws Error
     *   When the value is invalid -or- the time unit is invalid.
     */
    subtract(value: TimeValueSource | Time, timeUnit?: TimeUnitSource): Time;
    /**
     * Subtracts the value of another time from the value of this time. If either are [approximations](#isApproximated),
     * the result will also be.
     *
     * @param value
     *   A value representing the length of time, accepted as a _string_ that parses to a number (e.g. "1000" or
     *   "1e-10"), a [big decimal](https://www.npmjs.com/package/decimal.js) or a _number_ -or- another
     *   [Time](_index_.time.html) instance used to be subtracted from this time.
     * @param timeUnit
     *   Time unit used as source for the conversion of `value`. This defaults to "nanosecond" and is ignored when a
     *   [Time](_index_.time.html) object is provided. Accepts plurals and case variations.
     * @return
     *   A [Time](_index_.time.html) object with the value of this time divided by the value of the other time.
     * @throws Error
     *   When the value is invalid -or- the time unit is invalid.
     */
    subtract(value: TimeValueSource | Time, timeUnit?: string | TimeUnit): Time;
    /**
     * Converts the value of this nanosecond-based time into any other time unit.
     *
     * For the [big decimal](https://www.npmjs.com/package/decimal.js) representation, see [toBig](#tobig).
     *
     * @param timeUnit
     *   Time unit used as target for the conversion.
     * @return
     *   Numeric representation of the converted time, measured using the given time unit.
     */
    to(timeUnit: TimeUnitSource): number;
    /**
     * Converts the value of this nanosecond-based time into any other time unit.
     *
     * For the [big decimal](https://www.npmjs.com/package/decimal.js) representation, see [toBig](#tobig).
     *
     * @param timeUnit
     *   Time unit used as target for the conversion. Accepts plurals and case variations.
     * @return
     *   Numeric representation of the converted time, measured using the given time unit.
     */
    to(timeUnit: string | TimeUnit): number;
    /**
     * Converts the value of this nanosecond-based time into any other time unit, using
     * [big decimals](https://www.npmjs.com/package/decimal.js).
     *
     * @param timeUnit
     *   Time unit used as target for the conversion.
     * @return
     *   [Big decimal](https://www.npmjs.com/package/decimal.js) representation of the converted time, measured using
     *   the   given time unit.
     */
    toBig(timeUnit: TimeUnitSource): Decimal;
    /**
     * Converts the value of this nanosecond-based time into any other time unit, using
     * [big decimals](https://www.npmjs.com/package/decimal.js).
     *
     * @param timeUnit
     *   Time unit used as target for the conversion. Accepts plurals and care variations.
     * @return
     *   [Big decimal](https://www.npmjs.com/package/decimal.js) representation of the converted time, measured using
     *   the   given time unit.
     */
    toBig(timeUnit: string | TimeUnit): Decimal;
    /**
     * Gets a string representing the of value of this time, in nanoseconds.
     *
     * @return
     *   Numeric representation of the time length plus the symbol "ns".
     */
    toString(): string;
}
/**
 * A time unit is any particular time interval, used as a standard way of measuring or expressing duration.
 *
 * Extending from its precursor, [BaseTimeUnit](_index_.basetimeunit.html), an object of this type contains both the
 * mathematical and linguistic properties of the time unit it describes.
 *
 * ---
 *
 * See [TimeUnitDatabase](_index_.timeunitdatabase.html) for more information about time units.
 */
export interface TimeUnit extends BaseTimeUnit {
    /** Determines whether this time unit is an approximation. */
    approximated?: boolean;
    /** Multiplicative factor (coefficient) of this time unit in relation to a nanosecond. */
    factor: Decimal;
}
/**
 * A centralized catalog of [time unit](_index_.timeunit.html) definitions.
 *
 * This interface is a collection of summaries extracted from the web, with information for the time units available in
 * timecount. It was created with the intent to encorage its users to explore and play with time conversions.
 *
 * @typeparam T
 *   This type parameter defines which kind of time unit interface its object is describing. It may be a
 *   [base time unit](_index_.basetimeunit.html) which contains only linguistic properties or a
 *   [time unit](_index_.timeunit.html) with approximation flag and nanosecond coefficients.
 */
export interface TimeUnitDatabase<T extends BaseTimeUnit = BaseTimeUnit> {
    /**
     * The Moon's orbit approximates an ellipse rather than a circle. However, the orientation (as well as the shape) of
     * this orbit is not fixed. In particular, the position of the extreme points (the line of the apsides: **perigee**
     * and **apogee**), rotates once (**apsidal precession**) in about 3,233 days (8.85 years). It takes the Moon longer
     * to return to the same apsis because it has moved ahead during one revolution.
     *
     * This longer period is called the **anomalistic month** and has an average length of
     * _27 days, 13 hours, 18 minutes, 33.2 seconds_ or `2380713120000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly anomalisticMonth: T;
    /**
     * The **anomalistic year** is the time taken for the Earth to complete one revolution with respect to its apsides.
     * It is usually defined as the time between **perihelion** passages.
     *
     * Its average duration is _365 days, 6 hours, 13 minutes, 52.6 seconds_ or `31558432550400000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly anomalisticYear: T;
    /**
     * An **attosecond** is a SI unit of time equal to _0.000000000000000001 second_ or `0.000000001 nanosecond`.
     *
     * For context, an attosecond is to a second what a second is to about 31.71 billion years.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly attosecond: T;
    /**
     * A **biennium** (plural _biennia_) is a period of _2 years_ or `315360000000000000 nanoseconds`.
     *
     * The word is borrowed from the Latin _biennium_, from _bi-_ (occuring twice) + _annus_ (year).
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly biennium: T;
    /**
     * A **century** is a period of _100 years_ or `3153600000000000000 nanoseconds`.
     *
     * Centuries are numbered ordinally in English and many other languages. According to the strict construction of the
     * Gregorian calendar, the 1ˢᵗ century began with 1 AD and ended with 100 AD, with the same pattern continuing
     * onward.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly century: T;
    /**
     * Alias for a [galactic year](#galacticyear).
     *
     * It is equivalent, in average, to _237,5 million years_ or `7489800000000000000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly cosmicYear: T;
    /**
     * A **day** is approximately the period of time during which the Earth completes one rotation with respect to the
     * Sun (aka [solar day](#solarday)). It is commonly designated as a period of _24 hours_ or
     * `86400000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly day: T;
    /**
     * A **decade** is a period of _10 years_ or `315360000000000000 nanoseconds`.
     *
     * The word is derived from the Ancient Greek: δεκάς (dekas), which means a group of ten.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly decade: T;
    /**
     * A **draconic month** or [nodical month](#nodicalmonth) is the average interval between two successive transits of
     * the Moon through the same node. Because of the torque exerted by the Sun's gravity on the angular momentum of the
     * Earth–Moon system, the plane of the Moon's orbit gradually rotates westward, which means the nodes gradually
     * rotate around Earth.
     *
     * As a result, the time it takes the Moon to return to the same node is shorter than a
     * [sidereal month](#siderealmonth), with an average duration of _27 days, 5 hours, 5 minutes, 35.8 seconds_ or
     * `2351135808000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly draconicMonth: T;
    /**
     * The **draconic year** or [ecliptic year](#eclipticyear) is the time taken for the Sun (as seen from the Earth) to
     * complete one revolution with respect to the same lunar node.
     *
     * The average duration of the eclipse year is _346 days, 14 hours, 52 minutes, 54 seconds_ or
     * `29947974556290000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly draconicYear: T;
    /**
     * Alias for a [draconic year](#draconicyear).
     *
     * It is equivalent, in average, to _346 days, 14 hours, 52 minutes, 54 seconds_ or `29947974556290000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly eclipticYear: T;
    /**
     * An **exasecond** is a SI unit of time equal to _1000000000000000000 seconds_ or
     * `1000000000000000000000000000 nanoseconds`.
     *
     * The prefix _exa_ means 10¹⁸.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly exasecond: T;
    /**
     * An **exasecond** is a SI unit of time equal to _1152921504606846976 seconds_ or
     * `1152921504606846976000000000 nanoseconds`.
     *
     * The prefix _exbi_ means 2⁶⁰.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly exbisecond: T;
    /**
     * A **femtosecond** is a SI unit of time equal to _0.000000000000001 second_ or `0.000001 nanosecond`.
     *
     * For context, a femtosecond is to a second as a second is to about 31.71 million years.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly femtosecond: T;
    /**
     * A fortnight is a unit of time equal to _14 days_ or `1209600000000000 nanoseconds`.
     *
     * The word derives from the Old English: _fēowertyne niht_, meaning fourteen nights.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly fortnight: T;
    /**
     * The **galactic year**, also known as [cosmic year](#cosmicyear), is the duration of time required for the Sun to
     * orbit once around the center of the Milky Way Galaxy.
     *
     * Estimates of the length of one orbit range from 225 to 250 million terrestrial years, averaging _237,5 million
     * years_ or `7489800000000000000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly galacticYear: T;
    /**
     * Alias for a [year](#year).
     *
     * It is equivalent to _365 days, 5 hours, 49 minutes, 12 seconds_ or `31556952000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly gregorianYear: T;
    /**
     * A **gibisecond** is a SI unit of time equal to _1073741824 seconds_ or `1073741824000000000 nanoseconds`.
     *
     * The prefix _gibi_ means 2³⁰.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly gibisecond: T;
    /**
     * A **gigasecond** is a SI unit of time equal to 1000000000 seconds_ or `1000000000000000000 nanoseconds`.
     *
     * The prefix _giga_ means 10⁹.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly gigasecond: T;
    /**
     * An **hour** is a unit of time conventionally reckoned as 1⁄24 of a day and scientifically reckoned inbetween
     * 3599 and 3601 seconds, depending on special conditions.
     *
     * For practical purposes, an hour is _3600 seconds_ or `3600000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly hour: T;
    /**
     * A **jiffy** is the amount of time light takes to travel one _fermi_ (which is about the size of a nucleon) in a
     * vacuum.
     *
     * It is equivalent to `0.000000000000003 nanosecond`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly jiffy: T;
    /**
     * In astronomy, a **Julian year** is a unit of measurement of time defined as exactly _365.25 days_ of
     * _86400 seconds_ each, or `86400000000000 nanoseconds`.
     *
     * The _Julian calendar_ which has started on different days, at different times, in different countries is equal to
     * either 365 or 366 days.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly julianYear: T;
    /**
     * A **kibisecond** is a SI unit of time equal to _1024 seconds_ or `1024000000000 nanoseconds`.
     *
     * The prefix _kibi_ means 2¹⁰.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly kibisecond: T;
    /**
     * A **kilosecond** is a SI unit of time equal to _1000 seconds_ or `1000000000000 nanoseconds`.
     *
     * The prefix _kilo_ means 10³.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly kilosecond: T;
    /**
     * Alias for a [millenium](#millenium).
     *
     * It is equivalent to _1000 years_ or `31536000000000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly kiloyear: T;
    /**
     * A **leap year** (also known as an intercalary year or bissextile year) is a calendar year containing one
     * additional day added to keep the calendar year synchronized with the _astronomical_ or _seasonal year_.
     *
     * Each leap year has _366 days_ or `31622400000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly leapYear: T;
    /**
     * Alias for a [draconic month](#draconicmonth).
     *
     * It is equivalent, in average, to _27 days, 5 hours, 5 minutes, 35.8 seconds_ or `2351135808000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly nodicalMonth: T;
    /**
     * A **non-leap year** occurs every three out of four years, the remaining one being a [leap year](#leapyear).
     *
     * Each non-leap year has _365 days_ or `31536000000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly nonLeapYear: T;
    /**
     * A **lustrum** (plural _lustra_) was a term for a five-year period in Ancient Rome and is equivalent to a
     * [quinquennium](#quinquennium), which is _5 years_ or `157680000000000000 nanoseconds`.
     *
     * The _lustration_ was originally a sacrifice for expiation and purification offered by one of the censors in the
     * name of the Roman people at the close of the taking of the census. The sacrifice was often in the form of an
     * animal sacrifice, known as a _suovetaurilia_.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly lustrum: T;
    /**
     * A **mebisecond** is a SI unit of time equal to _1048576 seconds_ or `1048576000000000 nanoseconds`.
     *
     * The prefix _mebi_ means 2²⁰.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly mebisecond: T;
    /**
     * A **megasecond** is a SI unit of time equal to _1000000 seconds_ or `1000000000000000 nanoseconds`.
     *
     * The prefix _mega_ means 10⁶.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly megasecond: T;
    /**
     * A **microsecond** is a SI unit of time equal to _0.000001 second_ or `1000 nanoseconds`.
     *
     * The prefix _micro_ means 10⁻⁶.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly microsecond: T;
    /**
     * A **milisecond** is a SI unit of time equal to _0.001 second_ or `1000000 nanoseconds`.
     *
     * The prefix _mili_ means 10⁻³.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly milisecond: T;
    /**
     * A **millennium** (plural _millennia_) is a period equal to _1000 years_ or `31536000000000000000 nanoseconds`,
     * also known as [kiloyear](#kiloyear).
     *
     * Sometimes, it is used specifically for periods of a thousand years that begin at the starting point (initial
     * reference point) of the calendar in consideration (typically the year "1"), or in later years that are whole
     * number multiples of a thousand years after it.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly millenium: T;
    /**
     * A minute is equal to 1⁄60 (the first sexagesimal fraction) of an hour, _60 seconds_ or `60000000000 nanoseconds`.
     *
     * In the UTC time standard, a minute on rare occasions has 61 seconds, a consequence of _leap seconds_.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly minute: T;
    /**
     * A **month** is an unit of time used with calendars, which is approximately as long as a natural period related to
     * the motion of the Moon.
     *
     * In Gregorian calendars, a month is in average _30.41666666667 days_ or `2628000000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly month: T;
    /**
     * A **nanosecond** is a SI unit of time equal to _0.000000001 second_. This is the **standard unit** of timecount.
     *
     * The prefix _nano_ means 10⁻⁹. Time units of this granularity are commonly encountered in telecommunications,
     * pulsed lasers, and related aspects of electronics.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly nanosecond: T;
    /**
     * A **novennium** (plural _novennia_) is a period equivalent to _9 years_ or `283824000000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly novennium: T;
    /**
     * An **octennium** (plural _octennia_) is a period equivalent to _8 years_ or `252288000000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly octennium: T;
    /**
     * A **pebisecond** is a SI unit of time equal to _1125899906842624 seconds_ or
     * `1125899906842624000000000 nanoseconds`.
     *
     * The prefix _pebi_ means 2⁵⁰.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly pebisecond: T;
    /**
     * A **petasecond** is a SI unit of time equal to _1000000000000000 seconds_ or
     * `1000000000000000000000000 nanoseconds`.
     *
     * The prefix _peta_ means 10¹⁵.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly petasecond: T;
    /**
     * A **picosecond** is a SI unit of time equal to _0.000000000001 second_ or `0.001 nanosecond`.
     *
     * A picosecond is to one second as one second is to approximately 31,689 years.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly picosecond: T;
    /**
     * The **Planck time** is the unit of time in the system of natural units known as _Planck units_. A Planck unit is
     * the time required for light to travel in a vacuum a distance of 1 _Planck length_.
     *
     * It is equivalent to _5.39056 × 10⁻⁴⁴ second_ or `0.0000000000000000000000000000000000539056 nanosecond`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly planckTime: T;
    /**
     * A **quadrennium** (plural _quadrennia_) is a period of _4 years_ or `630720000000000000 nanoseconds`.
     *
     * It is most commonly used in reference to the four-year period between each Olympic Games. It is also used in
     * reference to the four-year interval between [leap years](#leapyear).
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly quadrennium: T;
    /**
     * A **quindecennium** (plural _quindecennia_) is a period equivalent to _15 years_ or
     * `473040000000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly quindecennium: T;
    /**
     * A **quinquennium** (plural _quinquennia_) is a period equivalent to _5 years_, a [lustrum](#lustrum), or
     * `157680000000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly quinquennium: T;
    /**
     * The **second** is the SI base unit of time, commonly understood and historically defined as ¹/₈₆₄₀₀ of a day –
     * this factor derived from the division of the day first into 24 hours, then to 60 minutes and finally to 60
     * seconds each.
     *
     * It is equivalent to `1000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly second: T;
    /**
     * A **septennium** (plural _septennia_) is a period equivalent to _7 years_ or `220752000000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly septennium: T;
    /**
     * A **shake** is an informal unit of time equal to `10 nanoseconds`.
     *
     * It has applications in _nuclear physics_, helping to conveniently express the timing of various events in a
     * nuclear explosion.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly shake: T;
    /**
     * _Sidereal time_ is a timekeeping system that astronomers use to locate celestial objects. It is the angle,
     * measured along the celestial equator, from the observer's meridian to the great circle that passes through the
     * March equinox and both celestial poles, and is usually expressed in hours, minutes, and seconds.
     *
     * Using sidereal time, it is possible to easily point a telescope to the proper coordinates in the night sky.
     *
     * A **sidereal day** is approximately _23 hours, 56 minutes, 4.0905 seconds_ or `86164090000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly siderealDay: T;
    /**
     * _Sidereal time_ is a timekeeping system that astronomers use to locate celestial objects. It is the angle,
     * measured along the celestial equator, from the observer's meridian to the great circle that passes through the
     * March equinox and both celestial poles, and is usually expressed in hours, minutes, and seconds.
     *
     * Using sidereal time, it is possible to easily point a telescope to the proper coordinates in the night sky.
     *
     * A **sidereal hour** is approximately _59 minutes, 50.17041666672 seconds_ or `3590170416667 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly siderealHour: T;
    /**
     * _Sidereal time_ is a timekeeping system that astronomers use to locate celestial objects. It is the angle,
     * measured along the celestial equator, from the observer's meridian to the great circle that passes through the
     * March equinox and both celestial poles, and is usually expressed in hours, minutes, and seconds.
     *
     * Using sidereal time, it is possible to easily point a telescope to the proper coordinates in the night sky.
     *
     * A **sidereal minute** is approximately _59.983617361111 seconds_ or `599836173611.11 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly siderealMinute: T;
    /**
     * The period of the Moon's orbit as defined with respect to the celestial sphere of apparently fixed stars
     * (nowadays the _International Celestial Reference Frame_) is known as a **sidereal month** because it is the time
     * it takes the Moon to return to a similar position among the stars.
     *
     * It is approximately _27 days, 7 hours, 43 minutes, 11.6 seconds_ or `2360591424000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly siderealMonth: T;
    /**
     * _Sidereal time_ is a timekeeping system that astronomers use to locate celestial objects. It is the angle,
     * measured along the celestial equator, from the observer's meridian to the great circle that passes through the
     * March equinox and both celestial poles, and is usually expressed in hours, minutes, and seconds.
     *
     * Using sidereal time, it is possible to easily point a telescope to the proper coordinates in the night sky.
     *
     * A **sidereal second** is approximately _0.9972695601852 second_ or `997269560.1852 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly siderealSecond: T;
    /**
     * A **sidereal year** is the time taken by the Earth to orbit the Sun once with respect to the fixed stars. Hence
     * it is also the time taken for the Sun to return to the same position with respect to the fixed stars after
     * apparently travelling once around the ecliptic.
     *
     * It is approximately _365 days, 6 hours, 9 minutes, 9.504 seconds_ or `31558149540000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly siderealYear: T;
    /**
     * Alias for a [day](#day).
     *
     * It is equivalent, in average, to _86400 seconds_ or `86400000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly solarDay: T;
    /**
     * Alias for a [tropical year](#tropicalyear).
     *
     * It is equivalent, in average, to _31556930 seconds_ or `31556930000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly solarYear: T;
    /**
     * The **Svedberg** is a time unit used for sedimentation rates (usually of proteins).
     *
     * It is defined as _100 femtoseconds_ or `0.0001 nanosecond`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly svedberg: T;
    /**
     * The **synodic month** is the average period of the Moon's orbit with respect to the line joining the Sun and
     * Earth. It is is used to calculate eclipse cycles.
     *
     * Its long-term average duration is _29 days, 12 hours, 44 minutes, 2.8016 seconds_ or
     * `2551443840000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly synodicMonth: T;
    /**
     * A **tebisecond** is a SI unit of time equal to 1099511627776 seconds_ or `1099511627776000000000 nanoseconds`.
     *
     * The prefix _tebi_ means 2⁴⁰.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly tebisecond: T;
    /**
     * A **terasecond** is a SI unit of time equal to 1000000000000 seconds_ or `1000000000000000000000 nanoseconds`.
     *
     * The prefix _tera_ means 10¹².
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly terasecond: T;
    /**
     * A **time unit** (TU) is an unit of time defined as _1024 microseconds_ or `1024000 nanoseconds`.
     *
     * The unit allows for maintaining intervals that are easy to implement in hardware that has a 1 MHz clock. One Time
     * Unit is equal to one millionth of a [kibisecond](#kibisecond).
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly timeUnit: T;
    /**
     * A **tropical year** (also known as a [solar year](#solaryear)) is the time that the Sun takes to return to the
     * same position in the cycle of seasons, as seen from Earth; for example, the time from vernal equinox to vernal
     * equinox, or from summer solstice to summer solstice.
     *
     * It is approximetaly _365 days, 5 hours, 48 minutes, 43.488 seconds_ or `31556930000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly tropicalYear: T;
    /**
     * A **week** is a time unit equal to _7 days_ or `604800000000000 nanoseconds`.
     *
     * It is the standard time period used for cycles of rest days in most parts of the world, mostly alongside —
     * although not strictly part of — the Gregorian calendar.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly week: T;
    /**
     * For the Gregorian calendar, the average length of the calendar year (the mean year) across the complete leap
     * cycle of 400 years is _365 days, 5 hours, 49 minutes, 12 seconds_ (365.2425 days) or
     * `31556952000000000 nanoseconds`.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly year: T;
    /**
     * A **yobisecond** is a SI unit of time equal to _1208925819614629174706176 seconds_ or
     * `1208925819614629174706176000000000 nanoseconds`.
     *
     * The prefix _yobi_ means 2⁸⁰.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly yobisecond: T;
    /**
     * A **yoctosecond** is a SI unit of time equal to _0.000000000000000000000001 second_ or
     * `0.0000000000000001 nanosecond`.
     *
     * The prefix _yocto_ means 10⁻²⁴.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly yoctosecond: T;
    /**
     * A **yottasecond** is a SI unit of time equal to _1000000000000000000000000 seconds_ or
     * `1000000000000000000000000000000000 nanoseconds`.
     *
     * The prefix _yotta_ means 10²⁴.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly yottasecond: T;
    /**
     * A **zebisecond** is a SI unit of time equal to _1180591620717411303424 seconds_ or
     * `1180591620717411303424000000000 nanoseconds`.
     *
     * The prefix _zebi_ means 2⁷⁰.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly zebisecond: T;
    /**
     * A **zeptosecond** is a SI unit of time equal to _0.000000000000000000001 second_ or
     * `0.000000000000000000000000000001 nanosecond`.
     *
     * The prefix _zepto_ means 10⁻²¹.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly zeptosecond: T;
    /**
     * A **zeptosecond** is a SI unit of time equal to _1000000000000000000000 seconds_ or
     * `1000000000000000000000000000000 nanoseconds`.
     *
     * The prefix _zetta_ means 10²¹.
     *
     * ---
     *
     * [Back to top](#)
     */
    readonly zettasecond: T;
}
/**
 * A union type, used by parameters that accept either the name of a time unit or a
 * [time unit object](../interfaces/_index_.timeunit.html).
 *
 * @deprecated Since v1.1.0 - In favor of `TimeUnitSource` (will be removed in v2).
 */
export declare type TimeUnitParameter = keyof TimeUnitDatabase | TimeUnit;
/**
 * A union type, used by parameters that accept either the name of a time unit or a
 * [time unit object](../interfaces/_index_.timeunit.html).
 *
 * The accepted names are the properties defined by [TimeUnitDatabase](../interfaces/_index_.timeunitdatabase.html), but
 * case-insensitive and plural variations are also valid (even though TypeScript would not allow it).
 */
export declare type TimeUnitSource = keyof TimeUnitDatabase | TimeUnit;
/**
 * This type is a union of all accepted types that can be used to represent a time value: a _string_ that parses to a
 * number (e.g. "1000" or "1e-10"), a [big decimal](https://www.npmjs.com/package/decimal.js) or a _number_.
 */
export declare type TimeValueSource = string | number | Decimal;
/**
 * Time writers are objects used to synthesize time values into strings, i.e. write times using different lexical and
 * numerical configurations. **[Write](#write)** is used to express a single time value, using a single time unit;
 * **[countdown](#countdown)** is used to classify time values by segmenting them into parts with different time units.
 *
 * These configurations are loaded in the following order:
 * - Defaults — hardcoded for English (US);
 * - Options from the current [Locale](_localization_.locale.html);
 * - Options from the instance [settings](#settings);
 * - Options given as a parameter to a method.
 *
 * ---
 *
 * [[include:examples/timewriter.md]]
 */
export declare class TimeWriter {
    settings: TimeWriterSettings;
    private _shouldApproximate;
    /**
     * Initializes a new instance of the [TimeWriter](#) class optionally using the given configurations.
     *
     * @param settings
     *   Configurations pertaining to this instance, overriding those of the
     *   [locale](_localization_.locale.html#writerOptions). May be overriden via parameter of [write](#write) or
     *   [countdown](#countdown).
     */
    constructor(settings?: TimeWriterSettings);
    /**
     * Writes a time length segmented into multiple units using a [Time](_index_.time.html) object and, optionally,
     * configurations that may override those of the [Locale](_localization_.locale.html) and the instance, for the
     * duration of the method.
     *
     * This will produce explanations of time lengths much easier to understand than arbitrary fractions.
     *
     * This "overload" will always use [TIME_SEGMENTS_COMMON](../modules/_index_.html#time_segments_common) as source
     * for its time unit conversions.
     *
     * @param time
     *   An encapsulated nanosecond-based time.
     * @param options
     *   When given, these configurations will override the those of the [Locale](_localization_.locale.html) and the
     *   instance, for this specific `countdown`. It does not change the object in any way whatsoever.
     * @return
     *   A string containing a synthetic representation of the given time through the use of multiple units of time.
     */
    countdown(time: Time, options?: TimeWriterSettings): string;
    /**
     * Writes a time length segmented into multiple units using a [Time](_index_.time.html) object and, optionally,
     * configurations that may override those of the [Locale](_localization_.locale.html) and the instance, for the
     * duration of the method.
     *
     * This will produce explanations of time lengths much easier to understand than arbitrary fractions.
     *
     * @param time
     *   An encapsulated nanosecond-based time.
     * @param args
     *   Accepts any number of time units or array of time units (if repetitions are given, they will be singled out).
     * @return
     *   A string containing a synthetic representation of the given time through the use of multiple units of time.
     */
    countdown(time: Time, ...args: Array<TimeUnitSource | TimeUnitSource[]>): string;
    /**
     * Writes a time length segmented into multiple units using a [Time](_index_.time.html) object and, optionally,
     * configurations that may override those of the [Locale](_localization_.locale.html) and the instance, for the
     * duration of the method.
     *
     * This will produce explanations of time lengths much easier to understand than arbitrary fractions.
     *
     * @param time
     *   An encapsulated nanosecond-based time.
     * @param args
     *   Accepts any number of time units or array of time units (if repetitions are given, they will be singled out).
     * @return
     *   A string containing a synthetic representation of the given time through the use of multiple units of time.
     */
    countdown(time: Time, ...args: Array<string | TimeUnit | string[]>): string;
    /**
     * Writes a time length segmented into multiple units using a [Time](_index_.time.html) object and, optionally,
     * configurations that may override those of the [Locale](_localization_.locale.html) and the instance, for the
     * duration of the method.
     *
     * This will produce explanations of time lengths much easier to understand than arbitrary fractions.
     *
     * @param time
     *   An encapsulated nanosecond-based time.
     * @param options
     *   When given, these configurations will override the those of the [Locale](_localization_.locale.html) and the
     *   instance, for this specific `countdown`. It does not change the object in any way whatsoever.
     * @param args
     *   Accepts any number of time units or array of time units (if repetitions are given, they will be singled out).
     * @return
     *   A string containing a synthetic representation of the given time through the use of multiple units of time.
     */
    countdown(time: Time, options?: TimeWriterSettings, ...args: Array<string | TimeUnit | string[]>): string;
    /**
     * Writes a time length segmented into multiple units using a [Time](_index_.time.html) object and, optionally,
     * configurations that may override those of the [Locale](_localization_.locale.html) and the instance, for the
     * duration of the method.
     *
     * This will produce explanations of time lengths much easier to understand than arbitrary fractions.
     *
     * @param time
     *   An encapsulated nanosecond-based time.
     * @param options
     *   When given, these configurations will override the those of the [Locale](_localization_.locale.html) and the
     *   instance, for this specific `countdown`. It does not change the object in any way whatsoever.
     * @param args
     *   Accepts any number of time units or array of time units (if repetitions are given, they will be singled out).
     * @return
     *   A string containing a synthetic representation of the given time through the use of multiple units of time.
     */
    countdown(time: Time, options?: TimeWriterSettings, ...args: Array<TimeUnitSource | TimeUnitSource[]>): string;
    /**
     * Writes a time length segmented into multiple units using a [Time](_index_.time.html) object and, optionally,
     * configurations that may override those of the [Locale](_localization_.locale.html) and the instance, for the
     * duration of the method.
     *
     * This will produce explanations of time lengths much easier to understand than arbitrary fractions.
     *
     * @param time
     *   An encapsulated nanosecond-based time.
     * @param options
     *   When given, these configurations will override the those of the [Locale](_localization_.locale.html) and the
     *   instance, for this specific `countdown`. It does not change the object in any way whatsoever.
     * @param args
     *   Accepts any number of time units or array of time units (if repetitions are given, they will be singled out).
     * @return
     *   A string containing a synthetic representation of the given time through the use of multiple units of time.
     */
    countdown(time: Time, options?: TimeWriterSettings | TimeUnitSource, ...args: Array<string | TimeUnit | string[]>): string;
    /**
     * Writes a time value using a [Time](_index_.time.html) object and, optionally, configurations that may override
     * those of the [Locale](_localization_.locale.html) and the instance, for the duration of the method.
     *
     * This will use the [default time unit](../interfaces/_index_.timewritersettings.html#defaulttimeunit) (which falls
     * back to "nanoseconds") as both input (when time is numeric) and output time unit.
     *
     * @param time
     *   A numeric representation of a time value -or- an encapsulated nanosecond-based time.
     * @param options
     *   When given, these configurations will override the those of the [Locale](_localization_.locale.html) and the
     *   instance, for this specific `write`. It does not change the object in any way whatsoever.
     * @return
     *   A string containing a synthetic representation of the given time.
     */
    write(time: TimeValueSource | Time, options?: TimeWriterSettings): string;
    /**
     * Writes a time value using a [Time](_index_.time.html) object and, optionally, a time unit to transform it and
     * configurations that may override those of the [Locale](_localization_.locale.html) and the instance, for the
     * duration of the method.
     *
     * @param time
     *   An encapsulated nanosecond-based time.
     * @param toTimeUnit
     *   Time unit to which the given time will be converted. If this parameter is not passed, it fallbacks to the
     *   [default time unit](../interfaces/_index_.timewritersettings.html#defaulttimeunit) and ultimately to
     *   "nanoseconds".
     * @param options
     *   When given, these configurations will override the those of the [Locale](_localization_.locale.html) and the
     *   instance, for this specific `write`. It does not change the object in any way whatsoever.
     * @return
     *   A string containing a synthetic representation of the given time.
     */
    write(time: Time, toTimeUnit?: TimeUnitSource, options?: TimeWriterSettings): string;
    /**
     * Writes a time value using a [Time](_index_.time.html) object and, optionally, a time unit to transform it and
     * configurations that may override those of the [Locale](_localization_.locale.html) and the instance, for the
     * duration of the method.
     *
     * @param time
     *   An encapsulated nanosecond-based time.
     * @param toTimeUnit
     *   Time unit to which the given time will be converted. If this parameter is not passed, it fallbacks to the
     *   [default time unit](../interfaces/_index_.timewritersettings.html#defaulttimeunit) and ultimately to
     *   "nanoseconds". Accepts plurals and case variations.
     * @param options
     *   When given, these configurations will override the those of the [Locale](_localization_.locale.html) and the
     *   instance, for this specific `write`. It does not change the object in any way whatsoever.
     * @return
     *   A string containing a synthetic representation of the given time.
     */
    write(time: Time, toTimeUnit?: string | TimeUnit, options?: TimeWriterSettings): string;
    /**
     * Writes a time value using a [Time](_index_.time.html) object and, optionally, a time unit to transform it and
     * configurations that may override those of the [Locale](_localization_.locale.html) and the instance, for the
     * duration the method.
     *
     * @param timeValue
     *   A numeric representation of a time value.
     * @param timeUnit
     *   Time unit from which the given time value will be converted. If this parameter is not passed, it fallbacks to
     *   the [default time unit](../interfaces/_index_.timewritersettings.html#defaulttimeunit) and ultimately to
     *   "nanoseconds".
     * @param options
     *   When given, these configurations will override the those of the [Locale](_localization_.locale.html) and the
     *   instance, for this specific `write`. It does not change the object in any way whatsoever.
     * @return
     *   A string containing a synthetic representation of the given time.
     */
    write(timeValue: TimeValueSource, timeUnit?: TimeUnitSource, options?: TimeWriterSettings): string;
    /**
     * Writes a time value using a [Time](_index_.time.html) object and, optionally, a time unit to transform it and
     * configurations that may override those of the [Locale](_localization_.locale.html) and the instance, for the
     * duration the method.
     *
     * @param timeValue
     *   A numeric representation of a time value.
     * @param timeUnit
     *   Time unit from which the given time value will be converted. If this parameter is not passed, it fallbacks to
     *   the [default time unit](../interfaces/_index_.timewritersettings.html#defaulttimeunit) and ultimately to
     *   "nanoseconds".
     * @param options
     *   When given, these configurations will override the those of the [Locale](_localization_.locale.html) and the
     *   instance, for this specific `write`. It does not change the object in any way whatsoever.
     * @return
     *   A string containing a synthetic representation of the given time.
     */
    write(timeValue: TimeValueSource, timeUnit?: string | TimeUnit, options?: TimeWriterSettings): string;
    /**
     * Writes a time value using a [Time](_index_.time.html) object and, optionally, a time unit to transform it and
     * configurations that may override those of the [Locale](_localization_.locale.html) and the instance, for the
     * duration the method.
     *
     * @param timeValue
     *   A numeric representation of a time value.
     * @param fromTimeUnit
     *   Time unit from which the given time value will be converted. If this parameter is not passed, it fallbacks to
     *   the [default time unit](../interfaces/_index_.timewritersettings.html#defaulttimeunit) and ultimately to
     *   "nanoseconds".
     * @param toTimeUnit
     *   Time unit to which the given time will be converted. If this parameter is not passed, it fallbacks to the
     *   [default time unit](../interfaces/_index_.timewritersettings.html#defaulttimeunit) and ultimately to
     *   "nanoseconds".
     * @param options
     *   When given, these configurations will override the those of the [Locale](_localization_.locale.html) and the
     *   instance, for this specific `write`. It does not change the object in any way whatsoever.
     * @return
     *   A string containing a synthetic representation of the given time.
     */
    write(timeValue: TimeValueSource, fromTimeUnit?: TimeUnitSource, toTimeUnit?: TimeUnitSource, options?: TimeWriterSettings): string;
    /**
     * Writes a time value using a [Time](_index_.time.html) object and, optionally, a time unit to transform it and
     * configurations that may override those of the [Locale](_localization_.locale.html) and the instance, for the
     * duration the method.
     *
     * @param timeValue
     *   A numeric representation of a time value.
     * @param fromTimeUnit
     *   Time unit from which the given time value will be converted. If this parameter is not passed, it fallbacks to
     *   the [default time unit](../interfaces/_index_.timewritersettings.html#defaulttimeunit) and ultimately to
     *   "nanoseconds". Accepts plurals and case variations.
     * @param toTimeUnit
     *   Time unit to which the given time will be converted. If this parameter is not passed, it fallbacks to the
     *   [default time unit](../interfaces/_index_.timewritersettings.html#defaulttimeunit) and ultimately to
     *   "nanoseconds".
     * @param options
     *   When given, these configurations will override the those of the [Locale](_localization_.locale.html) and the
     *   instance, for this specific `write`. It does not change the object in any way whatsoever.
     * @return
     *   A string containing a synthetic representation of the given time.
     */
    write(timeValue: TimeValueSource, fromTimeUnit?: string | TimeUnit, toTimeUnit?: TimeUnitSource, options?: TimeWriterSettings): string;
    /**
     * Writes a time value using a [Time](_index_.time.html) object and, optionally, a time unit to transform it and
     * configurations that may override those of the [Locale](_localization_.locale.html) and the instance, for the
     * duration the method.
     *
     * @param timeValue
     *   A numeric representation of a time value.
     * @param fromTimeUnit
     *   Time unit from which the given time value will be converted. If this parameter is not passed, it fallbacks to
     *   the [default time unit](../interfaces/_index_.timewritersettings.html#defaulttimeunit) and ultimately to
     *   "nanoseconds".
     * @param toTimeUnit
     *   Time unit to which the given time will be converted. If this parameter is not passed, it fallbacks to the
     *   [default time unit](../interfaces/_index_.timewritersettings.html#defaulttimeunit) and ultimately to
     *   "nanoseconds". Accepts plurals and case variations.
     * @param options
     *   When given, these configurations will override the those of the [Locale](_localization_.locale.html) and the
     *   instance, for this specific `write`. It does not change the object in any way whatsoever.
     * @return
     *   A string containing a synthetic representation of the given time.
     */
    write(timeValue: TimeValueSource, fromTimeUnit?: TimeUnitSource, toTimeUnit?: string | TimeUnit, options?: TimeWriterSettings): string;
    /**
     * Writes a time value using a [Time](_index_.time.html) object and, optionally, a time unit to transform it and
     * configurations that may override those of the [Locale](_localization_.locale.html) and the instance, for the
     * duration the method.
     *
     * @param timeValue
     *   A numeric representation of a time value.
     * @param fromTimeUnit
     *   Time unit from which the given time value will be converted. If this parameter is not passed, it fallbacks to
     *   the [default time unit](../interfaces/_index_.timewritersettings.html#defaulttimeunit) and ultimately to
     *   "nanoseconds". Accepts plurals and case variations.
     * @param toTimeUnit
     *   Time unit to which the given time will be converted. If this parameter is not passed, it fallbacks to the
     *   [default time unit](../interfaces/_index_.timewritersettings.html#defaulttimeunit) and ultimately to
     *   "nanoseconds". Accepts plurals and case variations.
     * @param options
     *   When given, these configurations will override the those of the [Locale](_localization_.locale.html) and the
     *   instance, for this specific `write`. It does not change the object in any way whatsoever.
     * @return
     *   A string containing a synthetic representation of the given time.
     */
    write(timeValue: TimeValueSource, fromTimeUnit?: string | TimeUnit, toTimeUnit?: string | TimeUnit, options?: TimeWriterSettings): string;
    private _combineOptions;
    private _countdownTime;
    private _writeNumber;
    private _writeTime;
    private _writeTimeUnit;
}
/**
 * Objects of this type are used to configure the behavior of [time writers](../classes/_index_.timewriter.html).
 *
 * Using these objects it is possible to change the lexical and numerical output to fit many different scenarios. See
 * the documentation for each property for more information.
 */
export interface TimeWriterSettings {
    /**
     * Numer of decimal places resulting from time conversions. Used in conjunction with [roundingMode] to write numeric
     * values
     *
     * Default: `undefined`.
     *
     * ---
     *
     * [[include:examples/timewritersettings/decimalPlaces.md]]
     */
    decimalPlaces?: number;
    /**
     * String used as decimal separator, specially useful when translating to languages and regions where the "dot"
     * notation is not standard.
     *
     * If not set, time writers will first try to parse the decimal separator for the locale of the machine where the
     * script is running and will ultimately fallback to `"."`.
     *
     * ---
     *
     * [[include:examples/timewritersettings/decimalSeparator.md]]
     */
    decimalSeparator?: string;
    /**
     * Specifies the default unit to convert to when writing time values.
     *
     * Default is [nanosecond](_index_.timeunitdatabase.html#nanosecond).
     *
     * ---
     *
     * [[include:examples/timewritersettings/defaultTimeUnit.md]]
     */
    defaultTimeUnit?: TimeUnitSource;
    /**
     * **This property is no longer supported!** When given, this will be used as the fixed number of decimal digits.
     *
     * @deprecated Since v1.1.0 - In favor of `significantDigits` (will be removed in v2).
     */
    fractionDigits?: number;
    /**
     * When this property is set to true, it will prevent the time writer from writting any form of time unit, be it
     * plural, symbol or verbose. It will also prevent the output of the [time unit separator](#timeunitseparator).
     *
     * Default is `false`.
     *
     * ---
     *
     * [[include:examples/timewritersettings/hideTimeUnit.md]]
     */
    hideTimeUnit?: boolean;
    /**
     * Whether to hide [countdown](../classes/_index.timewriter.html#countdown) segments with a value of 0 (zero).
     *
     * Default is `true`.
     *
     * ---
     *
     * [[include:examples/timewritersettings/hideZeroSegments.md]]
     */
    hideZeroSegments?: boolean;
    /**
     * Numeric notation used to write time values. Accepted values are:
     * - **"decimal":** standard _Hindu–Arabic numeral system_ using base ten;
     * - **"roman":** _Ancient Rome_ numeral system, ignoring fractions;
     * - **"roman-fractions":** _Ancient Rome_ numeral system, using
     *   [common fractions](https://en.wikipedia.org/wiki/Roman_numerals#Fractions);
     * - **"scientific":** Exponent notation; writes very small and very large numbers using powers of 10.
     *
     * Default is `"decimal"`.
     *
     * ---
     *
     * [[include:examples/timewritersettings/numericNotation.md]]
     */
    numericNotation?: NumericNotation;
    /**
     * This can be set to a function that will replace all other forms of numeric writting, ignoring the
     * [numeric notation](#numericnotation) and other mathematical properties.
     *
     * This function may receive two parameters: a number and an optional
     * [big decimal](https://www.npmjs.com/package/decimal.js).
     *
     * Default is `undefined`.
     *
     * ---
     *
     * [[include:examples/timewritersettings/numericWriter.md]]
     */
    numericWriter?: NumericWriter;
    /**
     * Numeric [rounding mode](../enums/_index_.roundingmode.html) used by the writer.
     *
     * Default is `RoundingMode.RoundHalfUp` or `4`.
     *
     * ---
     *
     * [[include:examples/timewritersettings/roundingMode.md]]
     */
    roundingMode?: RoundingMode;
    /**
     * A string used to separate [countdown](../classes/_index.timewriter.html#countdown) segments.
     *
     * Default is `", "` (comma and space).
     *
     * ---
     *
     * [[include:examples/timewritersettings/segmentSeparator.md]]
     */
    segmentSeparator?: string;
    /**
     * **This property is no longer supported!** Whether to separate the numeric value from the time unit.
     *
     * @deprecated Since v1.1.0 - In favor of `timeUnitSeparator` (will be removed in v2).
     */
    spaceTimeUnit?: boolean;
    /**
     * Number of significant digits of the decimal part of numeric values, intended to minimize the quantity of written
     * numbers for very large conversions.
     *
     * It will enforce a precision of the specified magnitude, but only for the decimal part of the number, unlike
     * [decimal.js precision](https://mikemcl.github.io/decimal.js/#sd). It doesn't apply to leading zeros.
     *
     * Default: `10`.
     *
     * ---
     *
     * [[include:examples/timewritersettings/significantDigits.md]]
     */
    significantDigits?: number;
    /**
     * When writting time values or units which based on approximations, this symbol will be added before the number to
     * demonstrate the approximation, when [verbose](#verbose) is disabled. Otherwise, its [term](#termapproximately) is
     * used instead.
     *
     * Default: `"≈"` (_almost equal to_ symbol).
     *
     * ---
     *
     * [[include:examples/timewritersettings/symbolApproximately.md]]
     */
    symbolApproximately?: string;
    /**
     * When writting time values that represent an _Infinity_, this symbol will be used to express it, when
     * [verbose](#verbose) is disabled. Otherwise, its [term](#terminfinite) is used instead.
     *
     * Default: `"∞"`.
     *
     * ---
     *
     * [[include:examples/timewritersettings/symbolInfinite.md]]
     */
    symbolInfinite?: string;
    /**
     * When writting time values that represent a _NaN_ (not a number), this symbol will be used to express it, when
     * [verbose](#verbose) is disabled. Otherwise, its [term](#termnan) is used instead.
     *
     * Default: `"NaN"`.
     *
     * ---
     *
     * [[include:examples/timewritersettings/symbolNaN.md]]
     */
    symbolNaN?: string;
    /**
     * When writting time values or units which based on approximations, this string will be added before the number to
     * demonstrate the approximation, when [verbose](#verbose) is enabled. Otherwise, its [symbol](#symbolapproximately)
     * is used instead.
     *
     * Default for English (US): `"approximately"`.
     *
     * ---
     *
     * [[include:examples/timewritersettings/termApproximately.md]]
     */
    termApproximately?: string;
    /**
     * When writting time values that represent an _Infinity_, this string will be used to express it, when
     * [verbose](#verbose) is enabled. Otherwise, its [symbol](#symbolinfinite) is used instead.
     *
     * Default for English (US): `"infinite"`.
     *
     * ---
     *
     * [[include:examples/timewritersettings/termInfinite.md]]
     */
    termInfinite?: string;
    /**
     * When writting time values that represent a _NaN_ (not a number), this string will be used to express it, when
     * [verbose](#verbose) is enabled. Otherwise, its [symbol](#symbolnan) is used instead.
     *
     * ---
     *
     * [[include:examples/timewritersettings/termNaN.md]]
     */
    termNaN?: string;
    /**
     * **This property is no longer supported!** This was used to define a few special numeric terms.
     *
     * @deprecated Since v1.1.0 - In favor of `verbose` (will be removed in v2).
     */
    terms?: {
        approximately?: string;
        infinite?: string;
        nan?: string;
    };
    /**
     * A string used as the thousands separator when using decimal [numeric notations](#numericnotation).
     *
     * Default is `undefined`.
     *
     * ---
     *
     * [[include:examples/timewritersettings/thousandsSeparator.md]]
     */
    thousandsSeparator?: string;
    /**
     * A string that separates the numeric value from the time unit.
     *
     * Default is `" "` (space).
     *
     * ---
     *
     * [[include:examples/timewritersettings/timeUnitSeparator.md]]
     */
    timeUnitSeparator?: string;
    /**
     * Whether to write more sentences to describe a time value instead of using symbols. Setting this to true enforce
     * descriptive text for time units
     *
     * All time units without a symbol are already written in verbose mode.
     *
     * Default is `false`.
     *
     * ---
     *
     * [[include:examples/timewritersettings/verbose.md]]
     */
    verbose?: boolean;
    /**
     * **This property is no longer supported!** Whether or not to write down the full unit readable name, instead of
     * its symbol.
     *
     * @deprecated Since v1.1.0 - In favor of `verbose` (will be removed in v2).
     */
    verboseTimeUnit?: boolean;
}
//# sourceMappingURL=index.d.ts.map