/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
/**
 * Contains the available time formats, with enumeration value corresponding to nanosecond divisor
 * required to calculated that format.
 */
export declare enum TimeDivisor {
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
export declare enum TimeFormat {
    Hours = "h",
    MicroSeconds = "\u03BCs",
    MiliSeconds = "ms",
    Minutes = "min",
    NanoSeconds = "ns",
    Seconds = "s",
}
/**
 * A class that contains the output configuration as well as utility methods.
 */
export declare class TimeOutput implements TimeOutputOptions {
    private _decimalSeparator;
    private _precision;
    private _separateUnitFromNumber;
    private _verboseUnit;
    /** Gets or sets the string used as decimal separator. */
    decimalSeparator: string;
    /** Gets or sets the precision used when writing down numbers. */
    precision: number;
    /** Gets or sets whether to separate numbers from their units. */
    separateUnitFromNumber: boolean;
    /** Gets or sets whether to write down the full unit name, instead of its abbreviation. */
    verboseUnit: boolean;
    /**
     * Initializes a new instance of the {@link TimeOutput} class, parsing the options if specified.
     *
     * @param options
     *   An object with the options to be imported to this object.
     */
    constructor(options?: TimeOutputOptions);
    /**
     * Resets this time output object options to its default values.
     */
    reset(): void;
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
export declare class TimeSpan implements TimeTransformer {
    private _output;
    private _value;
    /** Gets the configurable output object for this object. */
    readonly output: TimeOutput;
    /** Gets the numberic value that represents the time span in nanoseconds. */
    readonly value: number;
    /**
     * Initializes a new instance of the {@link TimeSpan} class, wrapping a numeric value to this
     * object.
     *
     * @param value
     *   A number that represents the time span in nanoseconds.
     * @param outputOptions
     *   An object that is used to configure the output of this object.
     */
    constructor(value: number, outputOptions?: TimeOutputOptions);
    /**
     * Gets the time span expressed in hours.
     *
     * @return
     *   A string with the time value converted to hours.
     */
    toHours(): string;
    /**
     * Gets the time span expressed in micro-seconds.
     *
     * @return
     *   A string with the time value converted to micro-seconds.
     */
    toMicroSeconds(): string;
    /**
     * Gets the time span expressed in mili-seconds.
     *
     * @return
     *   A string with the time value converted to mili-seconds.
     */
    toMiliSeconds(): string;
    /**
     * Gets the time span expressed in minutes.
     *
     * @return
     *   A string with the time value converted to minutes.
     */
    toMinutes(): string;
    /**
     * Gets the time span expressed in nano-seconds.
     *
     * @return
     *   A string with the time value converted to nano-seconds.
     */
    toNanoSeconds(): string;
    /**
     * Gets the time span expressed in seconds.
     *
     * @return
     *   A string with the time value converted to seconds.
     */
    toSeconds(): string;
    /**
     * Gets the time expressed with the most appropriate unit.
     *
     * @return
     *   A string with the time value converted to its most appropriate format.
     */
    toString(): string;
    private _formatOutput(calculatedValue, format);
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
export declare class TimeUtil {
    /**
     * Gets the current time with nanosecond precision.
     *
     * @return
     *   A numeric value that represents the current time, in nanoseconds.
     */
    static getPreciseTime(): number;
    private constructor();
}
