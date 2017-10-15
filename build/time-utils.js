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
var TimeDivisor;
(function (TimeDivisor) {
    TimeDivisor[TimeDivisor["Hours"] = 3600000000000] = "Hours";
    TimeDivisor[TimeDivisor["MicroSeconds"] = 1000] = "MicroSeconds";
    TimeDivisor[TimeDivisor["MiliSeconds"] = 1000000] = "MiliSeconds";
    TimeDivisor[TimeDivisor["Minutes"] = 60000000000] = "Minutes";
    TimeDivisor[TimeDivisor["NanoSeconds"] = 1] = "NanoSeconds";
    TimeDivisor[TimeDivisor["Seconds"] = 1000000000] = "Seconds";
})(TimeDivisor = exports.TimeDivisor || (exports.TimeDivisor = {}));
var TimeFormat;
(function (TimeFormat) {
    TimeFormat["Hours"] = "h";
    TimeFormat["MicroSeconds"] = "\u03BCs";
    TimeFormat["MiliSeconds"] = "ms";
    TimeFormat["Minutes"] = "min";
    TimeFormat["NanoSeconds"] = "ns";
    TimeFormat["Seconds"] = "s";
})(TimeFormat = exports.TimeFormat || (exports.TimeFormat = {}));
class TimeOutput {
    get decimalSeparator() { return this._decimalSeparator; }
    set decimalSeparator(value) { this._decimalSeparator = value; }
    get precision() { return this._precision; }
    set precision(value) { this._precision = value; }
    get separateUnitFromNumber() { return this._separateUnitFromNumber; }
    set separateUnitFromNumber(value) { this._separateUnitFromNumber = value; }
    get verboseUnit() { return this._verboseUnit; }
    set verboseUnit(value) { this._verboseUnit = value; }
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
    reset() {
        this._decimalSeparator = DEFAULT_DECIMAL_SEPARATOR;
        this._precision = DEFAULT_PRECISION;
        this._separateUnitFromNumber = true;
        this._verboseUnit = false;
    }
}
exports.TimeOutput = TimeOutput;
class TimeSpan {
    get output() { return this._output; }
    get value() { return this._value; }
    constructor(value, outputOptions) {
        this._output = new TimeOutput(outputOptions);
        this._value = value;
    }
    toHours() {
        return this._formatOutput(this._value / TimeDivisor.Hours, TimeFormat.Hours);
    }
    toMicroSeconds() {
        return this._formatOutput(this._value / TimeDivisor.MicroSeconds, TimeFormat.MicroSeconds);
    }
    toMiliSeconds() {
        return this._formatOutput(this._value / TimeDivisor.MiliSeconds, TimeFormat.MiliSeconds);
    }
    toMinutes() {
        return this._formatOutput(this._value / TimeDivisor.Minutes, TimeFormat.Minutes);
    }
    toNanoSeconds() {
        return this._formatOutput(this._value / TimeDivisor.NanoSeconds, TimeFormat.NanoSeconds);
    }
    toSeconds() {
        return this._formatOutput(this._value / TimeDivisor.Seconds, TimeFormat.Seconds);
    }
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
class TimeUtil {
    static getPreciseTime() {
        const preciseTime = process.hrtime();
        return preciseTime[0] * 1000000000 + preciseTime[1];
    }
    constructor() { }
}
exports.TimeUtil = TimeUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy90aW1lLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Z0ZBS2dGOztBQUVoRixNQUFNLHlCQUF5QixHQUFHLEdBQUcsQ0FBQztBQUN0QyxNQUFNLGlCQUFpQixHQUFHLENBQUMsQ0FBQztBQUM1QixNQUFNLFVBQVUsR0FBRztJQUNmLENBQUMsRUFBRSxPQUFPO0lBQ1YsR0FBRyxFQUFFLFNBQVM7SUFDZCxFQUFFLEVBQUUsYUFBYTtJQUNqQixFQUFFLEVBQUUsYUFBYTtJQUNqQixDQUFDLEVBQUUsU0FBUztJQUNaLEVBQUUsRUFBRSxjQUFjO0NBQ3JCLENBQUM7QUFFRjtJQUNJLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQztJQUNsQixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFrQkQsSUFBWSxXQU9YO0FBUEQsV0FBWSxXQUFXO0lBQ25CLDJEQUFxQixDQUFBO0lBQ3JCLGdFQUFtQixDQUFBO0lBQ25CLGlFQUFxQixDQUFBO0lBQ3JCLDZEQUFxQixDQUFBO0lBQ3JCLDJEQUFlLENBQUE7SUFDZiw0REFBb0IsQ0FBQTtBQUN4QixDQUFDLEVBUFcsV0FBVyxHQUFYLG1CQUFXLEtBQVgsbUJBQVcsUUFPdEI7QUFLRCxJQUFZLFVBT1g7QUFQRCxXQUFZLFVBQVU7SUFDbEIseUJBQVcsQ0FBQTtJQUNYLHNDQUFtQixDQUFBO0lBQ25CLGdDQUFrQixDQUFBO0lBQ2xCLDZCQUFlLENBQUE7SUFDZixnQ0FBa0IsQ0FBQTtJQUNsQiwyQkFBYSxDQUFBO0FBQ2pCLENBQUMsRUFQVyxVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQU9yQjtBQUtEO0lBUUksSUFBVyxnQkFBZ0IsS0FBSyxNQUFN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