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
})(TimeDivisor || (TimeDivisor = {}));
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
})(TimeFormat || (TimeFormat = {}));
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
    /**
     * Gets the nanoseconds of a hour-formatted time.
     *
     * @return
     *   A numeric value with the hours converted to nanoseconds.
     */
    fromHours(hours) {
        return hours * TimeDivisor.Hours;
    }
    /**
     * Gets the nanoseconds of a microsecond-formatted time.
     *
     * @return
     *   A numeric value with the microseconds converted to nanoseconds.
     */
    fromMicroSeconds(microseconds) {
        return microseconds * TimeDivisor.MicroSeconds;
    }
    /**
     * Gets the nanoseconds of a milisecond-formatted time.
     *
     * @return
     *   A numeric value with the miliseconds converted to nanoseconds.
     */
    fromMiliSeconds(miliseconds) {
        return miliseconds * TimeDivisor.MiliSeconds;
    }
    /**
     * Gets the nanoseconds of a minute-formatted time.
     *
     * @return
     *   A numeric value with the minutes converted to nanoseconds.
     */
    fromMinutes(minutes) {
        return minutes * TimeDivisor.Minutes;
    }
    /**
     * Gets the nanoseconds of a second-formatted time.
     *
     * @return
     *   A numeric value with the seconds converted to nanoseconds.
     */
    fromSeconds(seconds) {
        return seconds * TimeDivisor.Seconds;
    }
    // "Static" class: private, empty constructor
    constructor() { }
}
exports.TimeUtil = TimeUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90aW1lLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Z0ZBS2dGOztBQUVoRixNQUFNLHlCQUF5QixHQUFHLEdBQUcsQ0FBQztBQUN0QyxNQUFNLGlCQUFpQixHQUFHLENBQUMsQ0FBQztBQUM1QixNQUFNLFVBQVUsR0FBRztJQUNmLENBQUMsRUFBRSxPQUFPO0lBQ1YsR0FBRyxFQUFFLFNBQVM7SUFDZCxFQUFFLEVBQUUsYUFBYTtJQUNqQixFQUFFLEVBQUUsYUFBYTtJQUNqQixDQUFDLEVBQUUsU0FBUztJQUNaLEVBQUUsRUFBRSxjQUFjO0NBQ3JCLENBQUM7QUFFRjtJQUNJLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUNsQixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFjRDs7O0dBR0c7QUFDSCxJQUFLLFdBT0o7QUFQRCxXQUFLLFdBQVc7SUFDWiwyREFBcUIsQ0FBQTtJQUNyQixnRUFBbUIsQ0FBQTtJQUNuQixpRUFBcUIsQ0FBQTtJQUNyQiw2REFBcUIsQ0FBQTtJQUNyQiwyREFBZSxDQUFBO0lBQ2YsNERBQW9CLENBQUE7QUFDeEIsQ0FBQyxFQVBJLFdBQVcsS0FBWCxXQUFXLFFBT2Y7QUFFRDs7R0FFRztBQUNILElBQUssVUFPSjtBQVBELFdBQUssVUFBVTtJQUNYLHlCQUFXLENBQUE7SUFDWCxzQ0FBbUIsQ0FBQTtJQUNuQixnQ0FBa0IsQ0FBQTtJQUNsQiw2QkFBZSxDQUFBO0lBQ2YsZ0NBQWtCLENBQUE7SUFDbEIsMkJBQWEsQ0FBQTtBQUNqQixDQUFDLEVBUEksVUFBVSxLQUFWLFVBQVUsUUFPZDtBQUVEOztHQUVHO0FBQ0g7SUFPSSx5REFBeUQ7SUFDekQsSUFB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