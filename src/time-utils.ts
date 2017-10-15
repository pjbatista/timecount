/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */

const DEFAULT_DECIMAL_SEPARATOR = ".";
const DEFAULT_PRECISION = 2;
const TIME_NAMES = {
    h: "hours",
    min: "minutes",
    ms: "miliseconds",
    ns: "nanoseconds",
    s: "seconds",
    μs: "microseconds",
};

function getDecimalSeparator() {
    const value = 1.1;
    const text = value.toLocaleString().substring(1, 2);
    return text;
}

/**
 * Type definition for dictionaries, which are objects that store a single type of value.
 *
 * @typeparam T
 *   The type of object stored by the dictionary.
 */
declare class Dictionary<T> {

    /** Indexer for a object-property stored value. */
    [key: string]: T;
}

/**
 * Contains the available time formats, with enumeration value corresponding to nanosecond divisor
 * required to calculated that format.
 */
export enum TimeDivisor {
    Hours = 3600000000000,
    MicroSeconds = 1000,
    MiliSeconds = 1000000,
    Minutes = 60000000000,
    NanoSeconds = 1,
    Seconds = 1000000000,
}

/**
 * Contains the available time formats, with enumeration value corresponding to their abbreviation.
 */
export enum TimeFormat {
    Hours = "h",
    MicroSeconds = "μs",
    MiliSeconds = "ms",
    Minutes = "min",
    NanoSeconds = "ns",
    Seconds = "s",
}

/**
 * A class that contains the output configuration as well as utility methods.
 */
export class TimeOutput implements TimeOutputOptions {

    private _decimalSeparator: string;
    private _precision: number;
    private _separateUnitFromNumber: boolean;
    private _verboseUnit: boolean;

    /** Gets or sets the string used as decimal separator. */
    public get decimalSeparator() { return this._decimalSeparator; }
    public set decimalSeparator(value) { this._decimalSeparator = value; }

    /** Gets or sets the precision used when writing down numbers. */
    public get precision() { return this._precision; }
    public set precision(value) { this._precision = value; }

    /** Gets or sets whether to separate numbers from their units. */
    public get separateUnitFromNumber() { return this._separateUnitFromNumber; }
    public set separateUnitFromNumber(value) { this._separateUnitFromNumber = value; }

    /** Gets or sets whether to write down the full unit name, instead of its abbreviation. */
    public get verboseUnit() { return this._verboseUnit; }
    public set verboseUnit(value) { this._verboseUnit = value; }

    /**
     * Initializes a new instance of the {@link TimeOutput} class, parsing the options if specified.
     *
     * @param options
     *   An object with the options to be imported to this object.
     */
    public constructor(options?: TimeOutputOptions) {

        options = options || {};
        this._decimalSeparator = options.decimalSeparator || DEFAULT_DECIMAL_SEPARATOR;
        this._precision = DEFAULT_PRECISION;
        this._separateUnitFromNumber = true;
        this._verboseUnit = false;

        if (typeof(options.precision) !== "undefined") {
            this._precision = options.precision;
        }

        if (typeof(options.separateUnitFromNumber) !== "undefined") {
            this._separateUnitFromNumber = options.separateUnitFromNumber === true;
        }

        if (typeof(options.verboseUnit) !== "undefined") {
            this._verboseUnit = options.verboseUnit === true;
        }
    }

    /**
     * Resets this time output object options to its default values.
     */
    public reset() {
        this._decimalSeparator = DEFAULT_DECIMAL_SEPARATOR;
        this._precision = DEFAULT_PRECISION;
        this._separateUnitFromNumber = true;
        this._verboseUnit = false;
    }
}

/**
 * Represents the objects with the output configurations available to time formatters.
 */
export interface TimeOutputOptions {

    /** Specifies the string used as decimal separator. */
    decimalSeparator?: string;

    /** Specifies the precision used when writing down numbers. */
    precision?: number;

    /** Whether or not to separate numbers from their units. */
    separateUnitFromNumber?: boolean;

    /** Whether or not to write down the full unit name, instead of its abbreviation. */
    verboseUnit?: boolean;
}

/**
 * Represents a difference, or measurement of a time value, and has the ability to output that time
 * in many different formats.
 */
export class TimeSpan implements TimeTransformer {

    private _output: TimeOutput;
    private _value: number;

    /** Gets the configurable output object for this object. */
    public get output() { return this._output; }

    /** Gets the numberic value that represents the time span in nanoseconds. */
    public get value() { return this._value; }

    /**
     * Initializes a new instance of the {@link TimeSpan} class, wrapping a numeric value to this
     * object.
     *
     * @param value
     *   A number that represents the time span in nanoseconds.
     * @param outputOptions
     *   An object that is used to configure the output of this object.
     */
    public constructor(value: number, outputOptions?: TimeOutputOptions) {
        this._output = new TimeOutput(outputOptions);
        this._value = value;
    }

    /**
     * Gets the time span expressed in hours.
     *
     * @return
     *   A string with the time value converted to hours.
     */
    public toHours() {
        return this._formatOutput(this._value / TimeDivisor.Hours, TimeFormat.Hours);
    }

    /**
     * Gets the time span expressed in micro-seconds.
     *
     * @return
     *   A string with the time value converted to micro-seconds.
     */
    public toMicroSeconds() {
        return this._formatOutput(this._value / TimeDivisor.MicroSeconds, TimeFormat.MicroSeconds);
    }

    /**
     * Gets the time span expressed in mili-seconds.
     *
     * @return
     *   A string with the time value converted to mili-seconds.
     */
    public toMiliSeconds() {
        return this._formatOutput(this._value / TimeDivisor.MiliSeconds, TimeFormat.MiliSeconds);
    }

    /**
     * Gets the time span expressed in minutes.
     *
     * @return
     *   A string with the time value converted to minutes.
     */
    public toMinutes() {
        return this._formatOutput(this._value / TimeDivisor.Minutes, TimeFormat.Minutes);
    }

    /**
     * Gets the time span expressed in nano-seconds.
     *
     * @return
     *   A string with the time value converted to nano-seconds.
     */
    public toNanoSeconds() {
        return this._formatOutput(this._value / TimeDivisor.NanoSeconds, TimeFormat.NanoSeconds);
    }

    /**
     * Gets the time span expressed in seconds.
     *
     * @return
     *   A string with the time value converted to seconds.
     */
    public toSeconds() {
        return this._formatOutput(this._value / TimeDivisor.Seconds, TimeFormat.Seconds);
    }

    /**
     * Gets the time expressed with the most appropriate unit.
     *
     * @return
     *   A string with the time value converted to its most appropriate format.
     */
    public toString() {

        let format = TimeFormat.NanoSeconds;
        let value = Math.abs(this._value);

        const multipler = this._value < 0 ? -1 : 1;

        if (value >= 1000) {
            value /= 1000;
            format = TimeFormat.MicroSeconds;
        }

        if (value >= 1000) {
            value /= 1000;
            format = TimeFormat.MiliSeconds;
        }

        if (value >= 1000) {
            value /= 1000;
            format = TimeFormat.Seconds;

            if (value >= 60) {
                value /= 60;
                format = TimeFormat.Minutes;
            }

            if (value >= 60) {
                value /= 60;
                format = TimeFormat.Hours;
            }
        }

        return this._formatOutput(value * multipler, format);
    }

    // Actual output formatting takes places in here
    private _formatOutput(calculatedValue: number, format: TimeFormat) {

        if (isNaN(calculatedValue)) {
            return "NaN";
        }

        const spaceText = this._output.separateUnitFromNumber ? " " : "";
        let formatText = format.toString();

        if (this._output.verboseUnit) {
            formatText = (TIME_NAMES as Dictionary<string>)[format];
        }

        let valueText = calculatedValue.toFixed(this._output.precision).toString();
        const separator = getDecimalSeparator();

        if (this._output.decimalSeparator !== separator) {
            valueText = valueText.replace(separator, this._output.decimalSeparator);
        }

        return `${valueText}${spaceText}${formatText}`;
    }
}

/**
 * Represents an object that is able to express a time value in a range of formats;
 */
export interface TimeTransformer {

    /** Gets the time expressed in hours. */
    toHours(): string;

    /** Gets the time expressed in micro-seconds. */
    toMicroSeconds(): string;

    /** Gets the time expressed in mili-seconds. */
    toMiliSeconds(): string;

    /** Gets the time expressed in minutes. */
    toMinutes(): string;

    /** Gets the time expressed in nano-seconds. */
    toNanoSeconds(): string;

    /** Gets the time expressed in seconds. */
    toSeconds(): string;

    /** Gets the time expressed with the most appropriate unit. */
    toString(): string;
}

/**
 * A utility, static class containing methods that pertain to time counting.
 */
export class TimeUtil {

    /**
     * Gets the current time with nanosecond precision.
     *
     * @return
     *   A numeric value that represents the current time, in nanoseconds.
     */
    public static getPreciseTime() {
        const preciseTime = process.hrtime();
        return preciseTime[0] * 1000000000 + preciseTime[1];
    }

    // "Static" class: private, empty constructor
    private constructor() {}
}
