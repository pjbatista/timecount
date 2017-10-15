"use strict";
/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
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
 * Contains the available time formats, with enumeration value corresponding to nanosecond divisor
 * required to calculated that format.
 */
var TimeDivisor;
(function (TimeDivisor) {
    TimeDivisor[TimeDivisor["Hours"] = 3600000000000] = "Hours";
    TimeDivisor[TimeDivisor["MicroSeconds"] = 1000] = "MicroSeconds";
    TimeDivisor[TimeDivisor["MiliSeconds"] = 1000000] = "MiliSeconds";
    TimeDivisor[TimeDivisor["Minutes"] = 60000000000] = "Minutes";
    TimeDivisor[TimeDivisor["NanoSeconds"] = 1] = "NanoSeconds";
    TimeDivisor[TimeDivisor["Seconds"] = 1000000000] = "Seconds";
})(TimeDivisor = exports.TimeDivisor || (exports.TimeDivisor = {}));
/**
 * Contains the available time formats, with enumeration value corresponding to their abbreviation.
 */
var TimeFormat;
(function (TimeFormat) {
    TimeFormat["Hours"] = "h";
    TimeFormat["MicroSeconds"] = "\u03BCs";
    TimeFormat["MiliSeconds"] = "ms";
    TimeFormat["Minutes"] = "min";
    TimeFormat["NanoSeconds"] = "ns";
    TimeFormat["Seconds"] = "s";
})(TimeFormat = exports.TimeFormat || (exports.TimeFormat = {}));
/**
 * A class that contains the output configuration as well as utility methods.
 */
class TimeOutput {
    /** Gets or sets the string used as decimal separator. */
    get decimalSeparator() { return this._decimalSeparator; }
    set decimalSeparator(value) { this._decimalSeparator = value; }
    /** Gets or sets the precision used when writing down numbers. */
    get precision() { return this._precision; }
    set precision(value) { this._precision = value; }
    /** Gets or sets whether to separate numbers from their units. */
    get separateUnitFromNumber() { return this._separateUnitFromNumber; }
    set separateUnitFromNumber(value) { this._separateUnitFromNumber = value; }
    /** Gets or sets whether to write down the full unit name, instead of its abbreviation. */
    get verboseUnit() { return this._verboseUnit; }
    set verboseUnit(value) { this._verboseUnit = value; }
    /**
     * Initializes a new instance of the {@link TimeOutput} class, parsing the options if specified.
     *
     * @param options
     *   An object with the options to be imported to this object.
     */
    constructor(options) {
        options = options || {};
        this._decimalSeparator = options.decimalSeparator || DEFAULT_DECIMAL_SEPARATOR;
        this._precision = DEFAULT_PRECISION;
        this._separateUnitFromNumber = true;
        this._verboseUnit = false;
        if (typeof (options.precision) !== "undefined") {
            this._precision = options.precision;
        }
        if (typeof (options.separateUnitFromNumber) !== "undefined") {
            this._separateUnitFromNumber = options.separateUnitFromNumber === true;
        }
        if (typeof (options.verboseUnit) !== "undefined") {
            this._verboseUnit = options.verboseUnit === true;
        }
    }
    /**
     * Resets this time output object options to its default values.
     */
    reset() {
        this._decimalSeparator = DEFAULT_DECIMAL_SEPARATOR;
        this._precision = DEFAULT_PRECISION;
        this._separateUnitFromNumber = true;
        this._verboseUnit = false;
    }
}
exports.TimeOutput = TimeOutput;
/**
 * Represents a difference, or measurement of a time value, and has the ability to output that time
 * in many different formats.
 */
class TimeSpan {
    /** Gets the configurable output object for this object. */
    get output() { return this._output; }
    /** Gets the numberic value that represents the time span in nanoseconds. */
    get value() { return this._value; }
    /**
     * Initializes a new instance of the {@link TimeSpan} class, wrapping a numeric value to this
     * object.
     *
     * @param value
     *   A number that represents the time span in nanoseconds.
     * @param outputOptions
     *   An object that is used to configure the output of this object.
     */
    constructor(value, outputOptions) {
        this._output = new TimeOutput(outputOptions);
        this._value = value;
    }
    /**
     * Gets the time span expressed in hours.
     *
     * @return
     *   A string with the time value converted to hours.
     */
    toHours() {
        return this._formatOutput(this._value / TimeDivisor.Hours, TimeFormat.Hours);
    }
    /**
     * Gets the time span expressed in micro-seconds.
     *
     * @return
     *   A string with the time value converted to micro-seconds.
     */
    toMicroSeconds() {
        return this._formatOutput(this._value / TimeDivisor.MicroSeconds, TimeFormat.MicroSeconds);
    }
    /**
     * Gets the time span expressed in mili-seconds.
     *
     * @return
     *   A string with the time value converted to mili-seconds.
     */
    toMiliSeconds() {
        return this._formatOutput(this._value / TimeDivisor.MiliSeconds, TimeFormat.MiliSeconds);
    }
    /**
     * Gets the time span expressed in minutes.
     *
     * @return
     *   A string with the time value converted to minutes.
     */
    toMinutes() {
        return this._formatOutput(this._value / TimeDivisor.Minutes, TimeFormat.Minutes);
    }
    /**
     * Gets the time span expressed in nano-seconds.
     *
     * @return
     *   A string with the time value converted to nano-seconds.
     */
    toNanoSeconds() {
        return this._formatOutput(this._value / TimeDivisor.NanoSeconds, TimeFormat.NanoSeconds);
    }
    /**
     * Gets the time span expressed in seconds.
     *
     * @return
     *   A string with the time value converted to seconds.
     */
    toSeconds() {
        return this._formatOutput(this._value / TimeDivisor.Seconds, TimeFormat.Seconds);
    }
    /**
     * Gets the time expressed with the most appropriate unit.
     *
     * @return
     *   A string with the time value converted to its most appropriate format.
     */
    toString() {
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
    _formatOutput(calculatedValue, format) {
        if (isNaN(calculatedValue)) {
            return "NaN";
        }
        const spaceText = this._output.separateUnitFromNumber ? " " : "";
        let formatText = format.toString();
        if (this._output.verboseUnit) {
            formatText = TIME_NAMES[format];
        }
        let valueText = calculatedValue.toFixed(this._output.precision).toString();
        const separator = getDecimalSeparator();
        if (this._output.decimalSeparator !== separator) {
            valueText = valueText.replace(separator, this._output.decimalSeparator);
        }
        return `${valueText}${spaceText}${formatText}`;
    }
}
exports.TimeSpan = TimeSpan;
/**
 * A utility, static class containing methods that pertain to time counting.
 */
class TimeUtil {
    /**
     * Gets the current time with nanosecond precision.
     *
     * @return
     *   A numeric value that represents the current time, in nanoseconds.
     */
    static getPreciseTime() {
        const preciseTime = process.hrtime();
        return preciseTime[0] * 1000000000 + preciseTime[1];
    }
    // "Static" class: private, empty constructor
    constructor() { }
}
exports.TimeUtil = TimeUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90aW1lLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Z0ZBS2dGOztBQUVoRixNQUFNLHlCQUF5QixHQUFHLEdBQUcsQ0FBQztBQUN0QyxNQUFNLGlCQUFpQixHQUFHLENBQUMsQ0FBQztBQUM1QixNQUFNLFVBQVUsR0FBRztJQUNmLENBQUMsRUFBRSxPQUFPO0lBQ1YsR0FBRyxFQUFFLFNBQVM7SUFDZCxFQUFFLEVBQUUsYUFBYTtJQUNqQixFQUFFLEVBQUUsYUFBYTtJQUNqQixDQUFDLEVBQUUsU0FBUztJQUNaLEVBQUUsRUFBRSxjQUFjO0NBQ3JCLENBQUM7QUFFRjtJQUNJLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUNsQixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFjRDs7O0dBR0c7QUFDSCxJQUFZLFdBT1g7QUFQRCxXQUFZLFdBQVc7SUFDbkIsMkRBQXFCLENBQUE7SUFDckIsZ0VBQW1CLENBQUE7SUFDbkIsaUVBQXFCLENBQUE7SUFDckIsNkRBQXFCLENBQUE7SUFDckIsMkRBQWUsQ0FBQTtJQUNmLDREQUFvQixDQUFBO0FBQ3hCLENBQUMsRUFQVyxXQUFXLEdBQVgsbUJBQVcsS0FBWCxtQkFBVyxRQU90QjtBQUVEOztHQUVHO0FBQ0gsSUFBWSxVQU9YO0FBUEQsV0FBWSxVQUFVO0lBQ2xCLHlCQUFXLENBQUE7SUFDWCxzQ0FBbUIsQ0FBQTtJQUNuQixnQ0FBa0IsQ0FBQTtJQUNsQiw2QkFBZSxDQUFBO0lBQ2YsZ0NBQWtCLENBQUE7SUFDbEIsMkJBQWEsQ0FBQTtBQUNqQixDQUFDLEVBUFcsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFPckI7QUFFRDs7R0FF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