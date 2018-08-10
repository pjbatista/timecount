"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
/** [[include:utils.md]] */ /** */
const decimal_js_1 = require("decimal.js");
const _1 = require(".");
/**
 * Gets the number of nanoseconds that represent the current time according to `process`.
 *
 * @return
 *   [Big decimal](https://www.npmjs.com/package/decimal.js) representation of the current time, in nanoseconds.
 */
function getProcessTime() {
    const preciseTime = process.hrtime();
    return (new decimal_js_1.Decimal(preciseTime[0])).times("1e+9").add(preciseTime[1]);
}
exports.getProcessTime = getProcessTime;
/**
 * Counts the duration of runtime operations.
 *
 * An instance of [BasicTimer](#) is able to count the duration between its [start](#start) and [stop](#stop).
 * Every start-stop cycle resets the object to its default state.
 *
 * See [Timer](_utils_.timer.html) if you need pausing and [StopWatch](_utils_.stopwatch.html) for time segmentation
 * (laps).
 *
 * ---
 *
 * [[include:examples/basictimer.md]]
 */
class BasicTimer {
    /** Gets the time elapsed since the start of the timer until _now_. */
    get elapsedTime() {
        return this.getElapsedTime();
    }
    /** Gets whether the timer is currently running (it was [started](#start) and not yet [stopped](#stop)). */
    get isRunning() { return !!this._startTime; }
    /**
     * A protected property useful when overriding the timers it changes the output of
     * [timer errors](_utils_.timererror.html) in order to represent the specified name.
     */
    get timerErrorType() { return "timer"; }
    /**
     * Initializes a new instance of the [BasicTimer](#) class, optionally auto-starting it.
     *
     * @param autoStart
     *   Determines whether the timer will immediately start; default is false.
     */
    constructor(autoStart = false) {
        if (autoStart) {
            this.start();
        }
    }
    /**
     * Begins to count time, setting the [start time](#starttime) to a value equivalent to _now_.
     *
     * @return
     *   Time that represents _now_ (or better yet, the moment the timer has started).
     * @throws TimerError
     *   When the timer is already running.
     */
    start() {
        if (this._startTime) {
            throw TimerError.timerAlreadyStarted(this.timerErrorType);
        }
        this._startTime = getProcessTime();
        return this._startTime;
    }
    /**
     * Ends the time counting, returning the total elapsed time and resetting the object to its default state.
     *
     * @return
     *   A time with the total amount of nanoseconds spent between [start](#start) and _now_.
     * @throws TimerError
     *   When the timer has not yet started.
     */
    stop() {
        if (!this._startTime) {
            throw TimerError.timerNotStarted(this.timerErrorType);
        }
        const resultTime = new _1.Time(getProcessTime().minus(this._startTime));
        this._startTime = undefined;
        return resultTime;
    }
    /**
     * Protected alias to [elapsedTime](#elapsedtime).
     */
    getElapsedTime() {
        if (!this._startTime) {
            return new _1.Time(0);
        }
        return new _1.Time(getProcessTime().minus(this._startTime));
    }
    /**
     * Protected alias to [isRunning](#isRunning).
     */
    getIsRunning() {
        return !!this._startTime;
    }
}
exports.BasicTimer = BasicTimer;
/**
 * Counts the duration of runtime operations, with pausing capabilities.
 *
 * An instance of [Timer](#) is able to count the duration between its [start](#start) and [stop](#stop), as well as
 * [pausing](#pause), which temporarily stops the time counting. Every start-stop cycle resets the object to its
 * default state.
 *
 * See [BasicTimer](_utils_.basictimer.html) for a simpler timer implentation (less overhead) and
 * [StopWatch](_utils_.stopwatch.html) for time segmentation.
 *
 * ---
 *
 * [[include:examples/timer.md]]
 */
class Timer extends BasicTimer {
    constructor() {
        super(...arguments);
        /** Protected field with the time value representing the sum of all previous pause times. */
        this._pauseTimeSum = new decimal_js_1.Decimal(0);
    }
    /** Gets the time elapsed since the timer was [paused](#pause). */
    get elapsedPauseTime() {
        if (!this._pauseStartTime) {
            return new _1.Time(0);
        }
        return new _1.Time(getProcessTime().minus(this._pauseStartTime));
    }
    /** Gets the total amount of time the object spent [paused](#pause) during the current start-stop cycle. */
    get totalPauseTime() {
        return this.elapsedPauseTime.add(this._pauseTimeSum);
    }
    /**
     * Gets the time elapsed since the start of the timer until _now_.
     *
     * The value of this time will remain unchanged when the timer is [paused](#stop).
     */
    get elapsedTime() {
        if (!this._startTime) {
            return new _1.Time(0);
        }
        const totalElapsedTime = super.getElapsedTime();
        if (!this._pauseStartTime) {
            return totalElapsedTime.subtract(this._pauseTimeSum);
        }
        // If paused, calculate the difference between the elapsed time and the paused time
        return totalElapsedTime
            .add(this._startTime)
            .subtract(this._pauseStartTime)
            .subtract(this._pauseTimeSum);
    }
    /** Gets whether the timer is paused. */
    get isPaused() { return !!this._pauseStartTime; }
    /**
     * Gets whether the timer is currently running (it was [started](#start) and not yet [stopped](#stop)).
     *
     * This property is **not influenced by [pauses](#pause)**, i.e. it will return true even when paused.
     */
    get isRunning() { return super.getIsRunning(); }
    /**
     * Prevents the object from counting the time until it is [resumed](#resume).
     *
     * Both the [elapsed time](#elapsedtime) and the time resulting from [stop](#stop) won't change during the pause,
     * but [pausedTime](#pausedtime) and [totalPauseTime](#totalpausedtime) will.
     *
     * @throws TimerError
     *   When the timer has not yet started -or- it is already paused.
     */
    pause() {
        if (!this.isRunning) {
            throw TimerError.timerNotStarted(this.timerErrorType);
        }
        if (this._pauseStartTime) {
            throw TimerError.timerAlreadyPaused(this.timerErrorType);
        }
        this._pauseStartTime = getProcessTime();
        return this._pauseStartTime;
    }
    /**
     * Resumes the time counting, recovering the object from a [paused](#pause) state.
     *
     * @return
     *   The amount of time the timer spent paused.
     * @throws TimerError
     *   When the timer has not yet started -or- it is not paused.
     */
    resume() {
        if (!this.isRunning) {
            throw TimerError.timerNotStarted(this.timerErrorType);
        }
        if (!this._pauseStartTime) {
            throw TimerError.timerNotPaused(this.timerErrorType);
        }
        const pausedTime = this.elapsedPauseTime;
        this._pauseStartTime = undefined;
        this._pauseTimeSum = this._pauseTimeSum.add(pausedTime.bigValue);
        return new _1.Time(pausedTime);
    }
    /**
     * Ends the time counting, returning the total elapsed time and resetting the object to its default state.
     *
     * If the timer is [paused](#pause), there **is no need** to [resume](#resume) before calling this method.
     *
     * @return
     *   A time with the total amount of nanoseconds spent between [start](#start) and _now_.
     * @throws TimerError
     *   When the timer has not yet started.
     */
    stop() {
        const totalTime = super.stop();
        if (this._pauseStartTime) {
            this.resume();
        }
        const totalPauseTime = this._pauseTimeSum;
        this._pauseTimeSum = new decimal_js_1.Decimal(0);
        return totalTime.subtract(totalPauseTime);
    }
}
exports.Timer = Timer;
/**
 * Counts the duration of runtime operations, with pausing capabilities and time segmentation — which are arbitry
 * divisions of time.
 *
 * An instance of [StopWatch](#) is able to count the duration between its [start](#start) and [stop](#stop),
 * [pausing](#pause), which temporarily stops the time counting, and [create laps](#endlap), which splits the
 * stopwatch . Every start-stop cycle resets the object to its default state.
 *
 * See [BasicTimer](_utils_.basictimer.html) and [Timer](_utils_.timer.html) for simpler timer implentations (less
 * overhead).
 *
 * ---
 *
 * [[include:examples/stopwatch.md]]
 */
class StopWatch extends Timer {
    constructor() {
        super(...arguments);
        /** Protected field with the array of partial lap time values. */
        this._lapPartialTimes = [];
    }
    /** Gets the time elapsed since the start of the current lap until _now_. */
    get currentLapElapsedTime() {
        if (!this._lapStartTime) {
            return new _1.Time(0);
        }
        return new _1.Time(getProcessTime().minus(this._lapStartTime).minus(this._pauseStartTime || 0));
    }
    /**
     * Gets the time representing the moment the current lap started.
     *
     * @deprecated Since v1.1.0 - Unnecessary property (will be removed in v2).
     */
    get currentLapStartTime() { return new _1.Time(this._lapStartTime || 0); }
    /** Gets the number of laps currently stored at the stopwatch. */
    get lapCount() { return this.partialTimes.length + 1; }
    /**
     * Gets an array with time partials of the laps of the stopwatch, excluding the [current](#currentlapelapsedtime).
     *
     * @deprecated Since v1.1.0 - In favor of `partialTimes` (will be removed in v2).
     */
    get lapPartials() { return this._lapPartialTimes.map(value => new _1.Time(value)); }
    /**
     * Gets an array with time partials of the laps of the stopwatch, including the [current](#currentlapelapsedtime).
     * The sum of these times is equivalent to the total elapsed time of the stopwatch.
     */
    get partialTimes() {
        const partialTimes = this._lapPartialTimes.map(value => new _1.Time(value));
        if (this._lapStartTime) {
            return partialTimes.concat(this.currentLapElapsedTime);
        }
        return partialTimes;
    }
    /** Gets the name used on stopwatch errors. */
    get timerErrorType() { return "stopwatch"; }
    /** Alias to [endLap](#endlap). */
    createTimeSegment() { return this.endLap(); }
    /**
     * Finishes the current lap and starts a new one. This will add a new entry to [partial times](#partialtimes) and
     * start counting time for the new lap.
     *
     * **Note:** The first lap **always** start in parallel with the stopwatch.
     *
     * @return
     *   The partial time of the finished lap (elapsed time from the start of the lap until _now_).
     * @throws TimerError
     *   When the stopwatch has not yet started.
     */
    endLap() {
        if (!this._lapStartTime) {
            throw TimerError.timerNotStarted(this.timerErrorType);
        }
        const now = getProcessTime();
        let total = now.minus(this._lapStartTime);
        // Adjust the pause start relative to the beginning of the new lap
        if (this._pauseStartTime) {
            const pauseTime = now.minus(this._pauseStartTime);
            this._pauseTimeSum = this._pauseTimeSum.add(pauseTime);
            this._pauseStartTime = now;
            total = total.minus(pauseTime);
        }
        this._lapStartTime = now;
        this._lapPartialTimes.push(total);
        return new _1.Time(total);
    }
    /**
     * Begins to count time, setting the [start time](#starttime) to a value equivalent to _now_. This also starts the
     * first lap of the stopwatch.
     *
     * @return
     *   Time that represents _now_ (or better yet, the moment the stopwatch has started).
     * @throws TimerError
     *   When the stopwatch is already running.
     */
    start() {
        this._lapStartTime = super.start();
        return this._lapStartTime;
    }
    /**
     * Ends the time counting, returning the total elapsed time (sum of all lap partials) and resetting the object to
     * its default state. This will automatically end the last created lap!
     *
     * If the stopwatch is [paused](#pause), there **is no need** to [resume](#resume) before calling this method.
     *
     * @param detail
     *   A closure that can be used to retrieve additional data about the stopwatch. This information would otherwise be
     *   lost after the method is completed.
     * @return
     *   A time with the total amount of nanoseconds spent between [start](#start) and _now_.
     * @throws TimerError
     *   When the stopwatch has not yet started.
     */
    stop(detail) {
        const partials = this.partialTimes;
        const totalTime = super.stop();
        this._lapPartialTimes = [];
        this._lapStartTime = undefined;
        if (!detail) {
            return totalTime;
        }
        let sum = new decimal_js_1.Decimal(0);
        partials.forEach(partial => sum = sum.add(partial.bigValue));
        // The error is calculated by the absolute difference between the stop value and the sum of partial times
        detail(partials, sum.minus(totalTime.bigValue).abs().toNumber());
        return totalTime;
    }
}
exports.StopWatch = StopWatch;
/**
 * This class represents errors that occur during the operation of [basic timers](../classes/_index_.basictimer.html),
 * [timers](../classes/_index_.timer.html) and [stopwatches](../classes/_index_.stopwatch.html).
 *
 * It has static methods able to create [TimerError](#) instances with generic error messages.
 */
class TimerError extends Error {
    /** Creates and returns a new [TimerError](#) instance for when the timer is already paused. */
    static timerAlreadyPaused(type = "timer") {
        return new TimerError(`The ${type} is already paused`);
    }
    /** Creates and returns a new [TimerError](#) instance for when the timer has already started. */
    static timerAlreadyStarted(type = "timer") {
        return new TimerError(`The ${type} has already started`);
    }
    /** Creates and returns a new [TimerError](#) instance for when the timer is not paused. */
    static timerNotPaused(type = "timer") {
        return new TimerError(`The ${type} is not paused`);
    }
    /** Creates and returns a new [TimerError](#) instance for when the timer has not yet started. */
    static timerNotStarted(type = "timer") {
        return new TimerError(`The ${type} has not yet started`);
    }
    /** Gets a string representation of the [TimerError](#) class, used by the built-in `Object.prototype.toString`. */
    get [Symbol.toStringTag]() { return "TimerError"; }
}
exports.TimerError = TimerError;

//# sourceMappingURL=data:application/json;charset=utf8;base64,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RUQsaUdBQWlHO0lBQzFGLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBZSxPQUFPO1FBQ2hELE9BQU8sSUFBSSxVQUFVLENBQUMsT0FBTyxJQUFJLHNCQUFzQixDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVELG1IQUFtSDtJQUNuSCxJQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLE9BQU8sWUFBWSxDQUFDLENBQUMsQ0FBQztDQUM3RDtBQXhCRCxnQ0F3QkMiLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIDIwMTctMjAxOCBQZWRybyBKb3PDqSBCYXRpc3RhXHJcbk1JVCBMaWNlbnNlXHJcblxyXG5TZWUgdGhlIExJQ0VOU0UgZmlsZSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyoqIFtbaW5jbHVkZTp1dGlscy5tZF1dICovIC8qKiAqL1xyXG5pbXBvcnQgeyBEZWNpbWFsIH0gZnJvbSBcImRlY2ltYWwuanNcIjtcclxuaW1wb3J0IHsgVGltZSB9IGZyb20gXCIuXCI7XHJcblxyXG4vKipcclxuICogR2V0cyB0aGUgbnVtYmVyIG9mIG5hbm9zZWNvbmRzIHRoYXQgcmVwcmVzZW50IHRoZSBjdXJyZW50IHRpbWUgYWNjb3JkaW5nIHRvIGBwcm9jZXNzYC5cclxuICpcclxuICogQHJldHVyblxyXG4gKiAgIFtCaWcgZGVjaW1hbF0oaHR0cHM6Ly93d3cubnBtanMuY29tL3BhY2thZ2UvZGVjaW1hbC5qcykgcmVwcmVzZW50YXRpb24gb2YgdGhlIGN1cnJlbnQgdGltZSwgaW4gbmFub3NlY29uZHMuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvY2Vzc1RpbWUoKSB7XHJcbiAgICBjb25zdCBwcmVjaXNlVGltZSA9IHByb2Nlc3MuaHJ0aW1lKCk7XHJcbiAgICByZXR1cm4gKG5ldyBEZWNpbWFsKHByZWNpc2VUaW1lWzBdKSkudGltZXMoXCIxZSs5XCIpLmFkZChwcmVjaXNlVGltZVsxXSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb3VudHMgdGhlIGR1cmF0aW9uIG9mIHJ1bnRpbWUgb3BlcmF0aW9ucy5cclxuICpcclxuICogQW4gaW5zdGFuY2Ugb2YgW0Jhc2ljVGltZXJdKCMpIGlzIGFibGUgdG8gY291bnQgdGhlIGR1cmF0aW9uIGJldHdlZW4gaXRzIFtzdGFydF0oI3N0YXJ0KSBhbmQgW3N0b3BdKCNzdG9wKS5cclxuICogRXZlcnkgc3RhcnQtc3RvcCBjeWNsZSByZXNldHMgdGhlIG9iamVjdCB0byBpdHMgZGVmYXVsdCBzdGF0ZS5cclxuICpcclxuICogU2VlIFtUaW1lcl0oX3V0aWxzXy50aW1lci5odG1sKSBpZiB5b3UgbmVlZCBwYXVzaW5nIGFuZCBbU3RvcFdhdGNoXShfdXRpbHNfLnN0b3B3YXRjaC5odG1sKSBmb3IgdGltZSBzZWdtZW50YXRpb25cclxuICogKGxhcHMpLlxyXG4gKlxyXG4gKiAtLS1cclxuICpcclxuICogW1tpbmNsdWRlOmV4YW1wbGVzL2Jhc2ljdGltZXIubWRdXVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEJhc2ljVGltZXIge1xyXG5cclxuICAgIC8qKiBQcm90ZWN0ZWQgZmllbGQgd2l0aCB0aGUgdGltZSB2YWx1ZSByZXByZXNlbnRpbmcgdGhlIG1vbWVudCB0aGUgdGltZXIgc3RhcnRlZC4gKi9cclxuICAgIHByb3RlY3RlZCBfc3RhcnRUaW1lPzogRGVjaW1hbDtcclxuXHJcbiAgICAvKiogR2V0cyB0aGUgdGltZSBlbGFwc2VkIHNpbmNlIHRoZSBzdGFydCBvZiB0aGUgdGltZXIgdW50aWwgX25vd18uICovXHJcbiAgICBwdWJsaWMgZ2V0IGVsYXBzZWRUaW1lKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldEVsYXBzZWRUaW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdldHMgd2hldGhlciB0aGUgdGltZXIgaXMgY3VycmVudGx5IHJ1bm5pbmcgKGl0IHdhcyBbc3RhcnRlZF0oI3N0YXJ0KSBhbmQgbm90IHlldCBbc3RvcHBlZF0oI3N0b3ApKS4gKi9cclxuICAgIHB1YmxpYyBnZXQgaXNSdW5uaW5nKCkgeyByZXR1cm4gISF0aGlzLl9zdGFydFRpbWU7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEEgcHJvdGVjdGVkIHByb3BlcnR5IHVzZWZ1bCB3aGVuIG92ZXJyaWRpbmcgdGhlIHRpbWVycyBpdCBjaGFuZ2VzIHRoZSBvdXRwdXQgb2ZcclxuICAgICAqIFt0aW1lciBlcnJvcnNdKF91dGlsc18udGltZXJlcnJvci5odG1sKSBpbiBvcmRlciB0byByZXByZXNlbnQgdGhlIHNwZWNpZmllZCBuYW1lLlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IHRpbWVyRXJyb3JUeXBlKCkgeyByZXR1cm4gXCJ0aW1lclwiOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJbml0aWFsaXplcyBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgW0Jhc2ljVGltZXJdKCMpIGNsYXNzLCBvcHRpb25hbGx5IGF1dG8tc3RhcnRpbmcgaXQuXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGF1dG9TdGFydFxyXG4gICAgICogICBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHRpbWVyIHdpbGwgaW1tZWRpYXRlbHkgc3RhcnQ7IGRlZmF1bHQgaXMgZmFsc2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcihhdXRvU3RhcnQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG5cclxuICAgICAgICBpZiAoYXV0b1N0YXJ0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBCZWdpbnMgdG8gY291bnQgdGltZSwgc2V0dGluZyB0aGUgW3N0YXJ0IHRpbWVdKCNzdGFydHRpbWUpIHRvIGEgdmFsdWUgZXF1aXZhbGVudCB0byBfbm93Xy5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuXHJcbiAgICAgKiAgIFRpbWUgdGhhdCByZXByZXNlbnRzIF9ub3dfIChvciBiZXR0ZXIgeWV0LCB0aGUgbW9tZW50IHRoZSB0aW1lciBoYXMgc3RhcnRlZCkuXHJcbiAgICAgKiBAdGhyb3dzIFRpbWVyRXJyb3JcclxuICAgICAqICAgV2hlbiB0aGUgdGltZXIgaXMgYWxyZWFkeSBydW5uaW5nLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhcnQoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9zdGFydFRpbWUpIHtcclxuICAgICAgICAgICAgdGhyb3cgVGltZXJFcnJvci50aW1lckFscmVhZHlTdGFydGVkKHRoaXMudGltZXJFcnJvclR5cGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gZ2V0UHJvY2Vzc1RpbWUoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc3RhcnRUaW1lIGFzIERlY2ltYWw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmRzIHRoZSB0aW1lIGNvdW50aW5nLCByZXR1cm5pbmcgdGhlIHRvdGFsIGVsYXBzZWQgdGltZSBhbmQgcmVzZXR0aW5nIHRoZSBvYmplY3QgdG8gaXRzIGRlZmF1bHQgc3RhdGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVyblxyXG4gICAgICogICBBIHRpbWUgd2l0aCB0aGUgdG90YWwgYW1vdW50IG9mIG5hbm9zZWNvbmRzIHNwZW50IGJldHdlZW4gW3N0YXJ0XSgjc3RhcnQpIGFuZCBfbm93Xy5cclxuICAgICAqIEB0aHJvd3MgVGltZXJFcnJvclxyXG4gICAgICogICBXaGVuIHRoZSB0aW1lciBoYXMgbm90IHlldCBzdGFydGVkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RvcCgpIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9zdGFydFRpbWUpIHtcclxuICAgICAgICAgICAgdGhyb3cgVGltZXJFcnJvci50aW1lck5vdFN0YXJ0ZWQodGhpcy50aW1lckVycm9yVHlwZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCByZXN1bHRUaW1lID0gbmV3IFRpbWUoZ2V0UHJvY2Vzc1RpbWUoKS5taW51cyh0aGlzLl9zdGFydFRpbWUpKTtcclxuICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHRUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJvdGVjdGVkIGFsaWFzIHRvIFtlbGFwc2VkVGltZV0oI2VsYXBzZWR0aW1lKS5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldEVsYXBzZWRUaW1lKCkge1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX3N0YXJ0VGltZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWUoMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFRpbWUoZ2V0UHJvY2Vzc1RpbWUoKS5taW51cyh0aGlzLl9zdGFydFRpbWUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByb3RlY3RlZCBhbGlhcyB0byBbaXNSdW5uaW5nXSgjaXNSdW5uaW5nKS5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldElzUnVubmluZygpIHtcclxuICAgICAgICByZXR1cm4gISF0aGlzLl9zdGFydFRpbWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIHR5cGUgb2YgZnVuY3Rpb24gaXMgdXNlZCBieSBbc3RvcHdhdGNoZXNdKC4uL2NsYXNzZXMvX3V0aWxzXy5zdG9wd2F0Y2guaHRtbCkgdG8gcmV0dXJuIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cclxuICogdG8gdGhlIGNhbGxlcnMgb2YgW3N0b3BdKC4uL2NsYXNzZXMvX3V0aWxzXy5zdG9wd2F0Y2guaHRtbCNzdG9wKVxyXG4gKi9cclxuZXhwb3J0IHR5cGUgU3RvcFdhdGNoRGV0YWlsID0gKHBhcnRpYWxUaW1lczogVGltZVtdLCBlcnJvcjogbnVtYmVyKSA9PiB2b2lkO1xyXG5cclxuLyoqXHJcbiAqIENvdW50cyB0aGUgZHVyYXRpb24gb2YgcnVudGltZSBvcGVyYXRpb25zLCB3aXRoIHBhdXNpbmcgY2FwYWJpbGl0aWVzLlxyXG4gKlxyXG4gKiBBbiBpbnN0YW5jZSBvZiBbVGltZXJdKCMpIGlzIGFibGUgdG8gY291bnQgdGhlIGR1cmF0aW9uIGJldHdlZW4gaXRzIFtzdGFydF0oI3N0YXJ0KSBhbmQgW3N0b3BdKCNzdG9wKSwgYXMgd2VsbCBhc1xyXG4gKiBbcGF1c2luZ10oI3BhdXNlKSwgd2hpY2ggdGVtcG9yYXJpbHkgc3RvcHMgdGhlIHRpbWUgY291bnRpbmcuIEV2ZXJ5IHN0YXJ0LXN0b3AgY3ljbGUgcmVzZXRzIHRoZSBvYmplY3QgdG8gaXRzXHJcbiAqIGRlZmF1bHQgc3RhdGUuXHJcbiAqXHJcbiAqIFNlZSBbQmFzaWNUaW1lcl0oX3V0aWxzXy5iYXNpY3RpbWVyLmh0bWwpIGZvciBhIHNpbXBsZXIgdGltZXIgaW1wbGVudGF0aW9uIChsZXNzIG92ZXJoZWFkKSBhbmRcclxuICogW1N0b3BXYXRjaF0oX3V0aWxzXy5zdG9wd2F0Y2guaHRtbCkgZm9yIHRpbWUgc2VnbWVudGF0aW9uLlxyXG4gKlxyXG4gKiAtLS1cclxuICpcclxuICogW1tpbmNsdWRlOmV4YW1wbGVzL3RpbWVyLm1kXV1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBUaW1lciBleHRlbmRzIEJhc2ljVGltZXIge1xyXG5cclxuICAgIC8qKiBQcm90ZWN0ZWQgZmllbGQgd2l0aCB0aGUgdGltZSB2YWx1ZSByZXByZXNlbnRpbmcgdGhlIG1vbWVudCB0aGUgcGF1c2luZyBzdGFydGVkLiAqL1xyXG4gICAgcHJvdGVjdGVkIF9wYXVzZVN0YXJ0VGltZT86IERlY2ltYWw7XHJcblxyXG4gICAgLyoqIFByb3RlY3RlZCBmaWVsZCB3aXRoIHRoZSB0aW1lIHZhbHVlIHJlcHJlc2VudGluZyB0aGUgc3VtIG9mIGFsbCBwcmV2aW91cyBwYXVzZSB0aW1lcy4gKi9cclxuICAgIHByb3RlY3RlZCBfcGF1c2VUaW1lU3VtID0gbmV3IERlY2ltYWwoMCk7XHJcblxyXG4gICAgLyoqIEdldHMgdGhlIHRpbWUgZWxhcHNlZCBzaW5jZSB0aGUgdGltZXIgd2FzIFtwYXVzZWRdKCNwYXVzZSkuICovXHJcbiAgICBwdWJsaWMgZ2V0IGVsYXBzZWRQYXVzZVRpbWUoKSB7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fcGF1c2VTdGFydFRpbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBUaW1lKDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1lKGdldFByb2Nlc3NUaW1lKCkubWludXModGhpcy5fcGF1c2VTdGFydFRpbWUpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogR2V0cyB0aGUgdG90YWwgYW1vdW50IG9mIHRpbWUgdGhlIG9iamVjdCBzcGVudCBbcGF1c2VkXSgjcGF1c2UpIGR1cmluZyB0aGUgY3VycmVudCBzdGFydC1zdG9wIGN5Y2xlLiAqL1xyXG4gICAgcHVibGljIGdldCB0b3RhbFBhdXNlVGltZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5lbGFwc2VkUGF1c2VUaW1lLmFkZCh0aGlzLl9wYXVzZVRpbWVTdW0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB0aGUgdGltZSBlbGFwc2VkIHNpbmNlIHRoZSBzdGFydCBvZiB0aGUgdGltZXIgdW50aWwgX25vd18uXHJcbiAgICAgKlxyXG4gICAgICogVGhlIHZhbHVlIG9mIHRoaXMgdGltZSB3aWxsIHJlbWFpbiB1bmNoYW5nZWQgd2hlbiB0aGUgdGltZXIgaXMgW3BhdXNlZF0oI3N0b3ApLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGVsYXBzZWRUaW1lKCkge1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX3N0YXJ0VGltZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWUoMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCB0b3RhbEVsYXBzZWRUaW1lID0gc3VwZXIuZ2V0RWxhcHNlZFRpbWUoKTtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9wYXVzZVN0YXJ0VGltZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdG90YWxFbGFwc2VkVGltZS5zdWJ0cmFjdCh0aGlzLl9wYXVzZVRpbWVTdW0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gSWYgcGF1c2VkLCBjYWxjdWxhdGUgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgZWxhcHNlZCB0aW1lIGFuZCB0aGUgcGF1c2VkIHRpbWVcclxuICAgICAgICByZXR1cm4gdG90YWxFbGFwc2VkVGltZVxyXG4gICAgICAgICAgICAuYWRkKHRoaXMuX3N0YXJ0VGltZSlcclxuICAgICAgICAgICAgLnN1YnRyYWN0KHRoaXMuX3BhdXNlU3RhcnRUaW1lKVxyXG4gICAgICAgICAgICAuc3VidHJhY3QodGhpcy5fcGF1c2VUaW1lU3VtKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogR2V0cyB3aGV0aGVyIHRoZSB0aW1lciBpcyBwYXVzZWQuICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzUGF1c2VkKCkgeyByZXR1cm4gISF0aGlzLl9wYXVzZVN0YXJ0VGltZTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyB3aGV0aGVyIHRoZSB0aW1lciBpcyBjdXJyZW50bHkgcnVubmluZyAoaXQgd2FzIFtzdGFydGVkXSgjc3RhcnQpIGFuZCBub3QgeWV0IFtzdG9wcGVkXSgjc3RvcCkpLlxyXG4gICAgICpcclxuICAgICAqIFRoaXMgcHJvcGVydHkgaXMgKipub3QgaW5mbHVlbmNlZCBieSBbcGF1c2VzXSgjcGF1c2UpKiosIGkuZS4gaXQgd2lsbCByZXR1cm4gdHJ1ZSBldmVuIHdoZW4gcGF1c2VkLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzUnVubmluZygpIHsgcmV0dXJuIHN1cGVyLmdldElzUnVubmluZygpOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmV2ZW50cyB0aGUgb2JqZWN0IGZyb20gY291bnRpbmcgdGhlIHRpbWUgdW50aWwgaXQgaXMgW3Jlc3VtZWRdKCNyZXN1bWUpLlxyXG4gICAgICpcclxuICAgICAqIEJvdGggdGhlIFtlbGFwc2VkIHRpbWVdKCNlbGFwc2VkdGltZSkgYW5kIHRoZSB0aW1lIHJlc3VsdGluZyBmcm9tIFtzdG9wXSgjc3RvcCkgd29uJ3QgY2hhbmdlIGR1cmluZyB0aGUgcGF1c2UsXHJcbiAgICAgKiBidXQgW3BhdXNlZFRpbWVdKCNwYXVzZWR0aW1lKSBhbmQgW3RvdGFsUGF1c2VUaW1lXSgjdG90YWxwYXVzZWR0aW1lKSB3aWxsLlxyXG4gICAgICpcclxuICAgICAqIEB0aHJvd3MgVGltZXJFcnJvclxyXG4gICAgICogICBXaGVuIHRoZSB0aW1lciBoYXMgbm90IHlldCBzdGFydGVkIC1vci0gaXQgaXMgYWxyZWFkeSBwYXVzZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwYXVzZSgpIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUnVubmluZykge1xyXG4gICAgICAgICAgICB0aHJvdyBUaW1lckVycm9yLnRpbWVyTm90U3RhcnRlZCh0aGlzLnRpbWVyRXJyb3JUeXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9wYXVzZVN0YXJ0VGltZSkge1xyXG4gICAgICAgICAgICB0aHJvdyBUaW1lckVycm9yLnRpbWVyQWxyZWFkeVBhdXNlZCh0aGlzLnRpbWVyRXJyb3JUeXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3BhdXNlU3RhcnRUaW1lID0gZ2V0UHJvY2Vzc1RpbWUoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGF1c2VTdGFydFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXN1bWVzIHRoZSB0aW1lIGNvdW50aW5nLCByZWNvdmVyaW5nIHRoZSBvYmplY3QgZnJvbSBhIFtwYXVzZWRdKCNwYXVzZSkgc3RhdGUuXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVyblxyXG4gICAgICogICBUaGUgYW1vdW50IG9mIHRpbWUgdGhlIHRpbWVyIHNwZW50IHBhdXNlZC5cclxuICAgICAqIEB0aHJvd3MgVGltZXJFcnJvclxyXG4gICAgICogICBXaGVuIHRoZSB0aW1lciBoYXMgbm90IHlldCBzdGFydGVkIC1vci0gaXQgaXMgbm90IHBhdXNlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc3VtZSgpIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUnVubmluZykge1xyXG4gICAgICAgICAgICB0aHJvdyBUaW1lckVycm9yLnRpbWVyTm90U3RhcnRlZCh0aGlzLnRpbWVyRXJyb3JUeXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5fcGF1c2VTdGFydFRpbWUpIHtcclxuICAgICAgICAgICAgdGhyb3cgVGltZXJFcnJvci50aW1lck5vdFBhdXNlZCh0aGlzLnRpbWVyRXJyb3JUeXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBhdXNlZFRpbWUgPSB0aGlzLmVsYXBzZWRQYXVzZVRpbWU7XHJcbiAgICAgICAgdGhpcy5fcGF1c2VTdGFydFRpbWUgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy5fcGF1c2VUaW1lU3VtID0gdGhpcy5fcGF1c2VUaW1lU3VtLmFkZChwYXVzZWRUaW1lLmJpZ1ZhbHVlKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1lKHBhdXNlZFRpbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5kcyB0aGUgdGltZSBjb3VudGluZywgcmV0dXJuaW5nIHRoZSB0b3RhbCBlbGFwc2VkIHRpbWUgYW5kIHJlc2V0dGluZyB0aGUgb2JqZWN0IHRvIGl0cyBkZWZhdWx0IHN0YXRlLlxyXG4gICAgICpcclxuICAgICAqIElmIHRoZSB0aW1lciBpcyBbcGF1c2VkXSgjcGF1c2UpLCB0aGVyZSAqKmlzIG5vIG5lZWQqKiB0byBbcmVzdW1lXSgjcmVzdW1lKSBiZWZvcmUgY2FsbGluZyB0aGlzIG1ldGhvZC5cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuXHJcbiAgICAgKiAgIEEgdGltZSB3aXRoIHRoZSB0b3RhbCBhbW91bnQgb2YgbmFub3NlY29uZHMgc3BlbnQgYmV0d2VlbiBbc3RhcnRdKCNzdGFydCkgYW5kIF9ub3dfLlxyXG4gICAgICogQHRocm93cyBUaW1lckVycm9yXHJcbiAgICAgKiAgIFdoZW4gdGhlIHRpbWVyIGhhcyBub3QgeWV0IHN0YXJ0ZWQuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdG9wKCkge1xyXG5cclxuICAgICAgICBjb25zdCB0b3RhbFRpbWUgPSBzdXBlci5zdG9wKCk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9wYXVzZVN0YXJ0VGltZSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlc3VtZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdG90YWxQYXVzZVRpbWUgPSB0aGlzLl9wYXVzZVRpbWVTdW07XHJcbiAgICAgICAgdGhpcy5fcGF1c2VUaW1lU3VtID0gbmV3IERlY2ltYWwoMCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0b3RhbFRpbWUuc3VidHJhY3QodG90YWxQYXVzZVRpbWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ291bnRzIHRoZSBkdXJhdGlvbiBvZiBydW50aW1lIG9wZXJhdGlvbnMsIHdpdGggcGF1c2luZyBjYXBhYmlsaXRpZXMgYW5kIHRpbWUgc2VnbWVudGF0aW9uIOKAlCB3aGljaCBhcmUgYXJiaXRyeVxyXG4gKiBkaXZpc2lvbnMgb2YgdGltZS5cclxuICpcclxuICogQW4gaW5zdGFuY2Ugb2YgW1N0b3BXYXRjaF0oIykgaXMgYWJsZSB0byBjb3VudCB0aGUgZHVyYXRpb24gYmV0d2VlbiBpdHMgW3N0YXJ0XSgjc3RhcnQpIGFuZCBbc3RvcF0oI3N0b3ApLFxyXG4gKiBbcGF1c2luZ10oI3BhdXNlKSwgd2hpY2ggdGVtcG9yYXJpbHkgc3RvcHMgdGhlIHRpbWUgY291bnRpbmcsIGFuZCBbY3JlYXRlIGxhcHNdKCNlbmRsYXApLCB3aGljaCBzcGxpdHMgdGhlXHJcbiAqIHN0b3B3YXRjaCAuIEV2ZXJ5IHN0YXJ0LXN0b3AgY3ljbGUgcmVzZXRzIHRoZSBvYmplY3QgdG8gaXRzIGRlZmF1bHQgc3RhdGUuXHJcbiAqXHJcbiAqIFNlZSBbQmFzaWNUaW1lcl0oX3V0aWxzXy5iYXNpY3RpbWVyLmh0bWwpIGFuZCBbVGltZXJdKF91dGlsc18udGltZXIuaHRtbCkgZm9yIHNpbXBsZXIgdGltZXIgaW1wbGVudGF0aW9ucyAobGVzc1xyXG4gKiBvdmVyaGVhZCkuXHJcbiAqXHJcbiAqIC0tLVxyXG4gKlxyXG4gKiBbW2luY2x1ZGU6ZXhhbXBsZXMvc3RvcHdhdGNoLm1kXV1cclxuICovXHJcbmV4cG9ydCBjbGFzcyBTdG9wV2F0Y2ggZXh0ZW5kcyBUaW1lciB7XHJcblxyXG4gICAgLyoqIFByb3RlY3RlZCBmaWVsZCB3aXRoIHRoZSBhcnJheSBvZiBwYXJ0aWFsIGxhcCB0aW1lIHZhbHVlcy4gKi9cclxuICAgIHByb3RlY3RlZCBfbGFwUGFydGlhbFRpbWVzOiBEZWNpbWFsW10gPSBbXTtcclxuXHJcbiAgICAvKiogUHJvdGVjdGVkIGZpZWxkIHdpdGggdGhlIHRpbWUgdmFsdWUgcmVwcmVzZW50aW5nIHRoZSBtb21lbnQgdGhlIGxhcCBzdGFydGVkLiAqL1xyXG4gICAgcHJvdGVjdGVkIF9sYXBTdGFydFRpbWU/OiBEZWNpbWFsO1xyXG5cclxuICAgIC8qKiBHZXRzIHRoZSB0aW1lIGVsYXBzZWQgc2luY2UgdGhlIHN0YXJ0IG9mIHRoZSBjdXJyZW50IGxhcCB1bnRpbCBfbm93Xy4gKi9cclxuICAgIHB1YmxpYyBnZXQgY3VycmVudExhcEVsYXBzZWRUaW1lKCkge1xyXG5cclxuICAgICAgICBpZiAoIXRoaXMuX2xhcFN0YXJ0VGltZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFRpbWUoMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IFRpbWUoZ2V0UHJvY2Vzc1RpbWUoKS5taW51cyh0aGlzLl9sYXBTdGFydFRpbWUpLm1pbnVzKHRoaXMuX3BhdXNlU3RhcnRUaW1lIHx8IDApKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgdGhlIHRpbWUgcmVwcmVzZW50aW5nIHRoZSBtb21lbnQgdGhlIGN1cnJlbnQgbGFwIHN0YXJ0ZWQuXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgU2luY2UgdjEuMS4wIC0gVW5uZWNlc3NhcnkgcHJvcGVydHkgKHdpbGwgYmUgcmVtb3ZlZCBpbiB2MikuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY3VycmVudExhcFN0YXJ0VGltZSgpIHsgcmV0dXJuIG5ldyBUaW1lKHRoaXMuX2xhcFN0YXJ0VGltZSB8fCAwKTsgfVxyXG5cclxuICAgIC8qKiBHZXRzIHRoZSBudW1iZXIgb2YgbGFwcyBjdXJyZW50bHkgc3RvcmVkIGF0IHRoZSBzdG9wd2F0Y2guICovXHJcbiAgICBwdWJsaWMgZ2V0IGxhcENvdW50KCkgeyByZXR1cm4gdGhpcy5wYXJ0aWFsVGltZXMubGVuZ3RoICsgMTsgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogR2V0cyBhbiBhcnJheSB3aXRoIHRpbWUgcGFydGlhbHMgb2YgdGhlIGxhcHMgb2YgdGhlIHN0b3B3YXRjaCwgZXhjbHVkaW5nIHRoZSBbY3VycmVudF0oI2N1cnJlbnRsYXBlbGFwc2VkdGltZSkuXHJcbiAgICAgKlxyXG4gICAgICogQGRlcHJlY2F0ZWQgU2luY2UgdjEuMS4wIC0gSW4gZmF2b3Igb2YgYHBhcnRpYWxUaW1lc2AgKHdpbGwgYmUgcmVtb3ZlZCBpbiB2MikuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgbGFwUGFydGlhbHMoKSB7IHJldHVybiB0aGlzLl9sYXBQYXJ0aWFsVGltZXMubWFwKHZhbHVlID0+IG5ldyBUaW1lKHZhbHVlKSk7IH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEdldHMgYW4gYXJyYXkgd2l0aCB0aW1lIHBhcnRpYWxzIG9mIHRoZSBsYXBzIG9mIHRoZSBzdG9wd2F0Y2gsIGluY2x1ZGluZyB0aGUgW2N1cnJlbnRdKCNjdXJyZW50bGFwZWxhcHNlZHRpbWUpLlxyXG4gICAgICogVGhlIHN1bSBvZiB0aGVzZSB0aW1lcyBpcyBlcXVpdmFsZW50IHRvIHRoZSB0b3RhbCBlbGFwc2VkIHRpbWUgb2YgdGhlIHN0b3B3YXRjaC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBwYXJ0aWFsVGltZXMoKSB7XHJcbiAgICAgICAgY29uc3QgcGFydGlhbFRpbWVzID0gdGhpcy5fbGFwUGFydGlhbFRpbWVzLm1hcCh2YWx1ZSA9PiBuZXcgVGltZSh2YWx1ZSkpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5fbGFwU3RhcnRUaW1lKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJ0aWFsVGltZXMuY29uY2F0KHRoaXMuY3VycmVudExhcEVsYXBzZWRUaW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYXJ0aWFsVGltZXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqIEdldHMgdGhlIG5hbWUgdXNlZCBvbiBzdG9wd2F0Y2ggZXJyb3JzLiAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCB0aW1lckVycm9yVHlwZSgpIHsgcmV0dXJuIFwic3RvcHdhdGNoXCI7IH1cclxuXHJcbiAgICAvKiogQWxpYXMgdG8gW2VuZExhcF0oI2VuZGxhcCkuICovXHJcbiAgICBwdWJsaWMgY3JlYXRlVGltZVNlZ21lbnQoKSB7IHJldHVybiB0aGlzLmVuZExhcCgpOyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBGaW5pc2hlcyB0aGUgY3VycmVudCBsYXAgYW5kIHN0YXJ0cyBhIG5ldyBvbmUuIFRoaXMgd2lsbCBhZGQgYSBuZXcgZW50cnkgdG8gW3BhcnRpYWwgdGltZXNdKCNwYXJ0aWFsdGltZXMpIGFuZFxyXG4gICAgICogc3RhcnQgY291bnRpbmcgdGltZSBmb3IgdGhlIG5ldyBsYXAuXHJcbiAgICAgKlxyXG4gICAgICogKipOb3RlOioqIFRoZSBmaXJzdCBsYXAgKiphbHdheXMqKiBzdGFydCBpbiBwYXJhbGxlbCB3aXRoIHRoZSBzdG9wd2F0Y2guXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVyblxyXG4gICAgICogICBUaGUgcGFydGlhbCB0aW1lIG9mIHRoZSBmaW5pc2hlZCBsYXAgKGVsYXBzZWQgdGltZSBmcm9tIHRoZSBzdGFydCBvZiB0aGUgbGFwIHVudGlsIF9ub3dfKS5cclxuICAgICAqIEB0aHJvd3MgVGltZXJFcnJvclxyXG4gICAgICogICBXaGVuIHRoZSBzdG9wd2F0Y2ggaGFzIG5vdCB5ZXQgc3RhcnRlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGVuZExhcCgpIHtcclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLl9sYXBTdGFydFRpbWUpIHtcclxuICAgICAgICAgICAgdGhyb3cgVGltZXJFcnJvci50aW1lck5vdFN0YXJ0ZWQodGhpcy50aW1lckVycm9yVHlwZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBub3cgPSBnZXRQcm9jZXNzVGltZSgpO1xyXG4gICAgICAgIGxldCB0b3RhbCA9IG5vdy5taW51cyh0aGlzLl9sYXBTdGFydFRpbWUpO1xyXG5cclxuICAgICAgICAvLyBBZGp1c3QgdGhlIHBhdXNlIHN0YXJ0IHJlbGF0aXZlIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIG5ldyBsYXBcclxuICAgICAgICBpZiAodGhpcy5fcGF1c2VTdGFydFRpbWUpIHtcclxuICAgICAgICAgICAgY29uc3QgcGF1c2VUaW1lID0gbm93Lm1pbnVzKHRoaXMuX3BhdXNlU3RhcnRUaW1lKTtcclxuICAgICAgICAgICAgdGhpcy5fcGF1c2VUaW1lU3VtID0gdGhpcy5fcGF1c2VUaW1lU3VtLmFkZChwYXVzZVRpbWUpO1xyXG4gICAgICAgICAgICB0aGlzLl9wYXVzZVN0YXJ0VGltZSA9IG5vdztcclxuXHJcbiAgICAgICAgICAgIHRvdGFsID0gdG90YWwubWludXMocGF1c2VUaW1lKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX2xhcFN0YXJ0VGltZSA9IG5vdztcclxuICAgICAgICB0aGlzLl9sYXBQYXJ0aWFsVGltZXMucHVzaCh0b3RhbCk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1lKHRvdGFsKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEJlZ2lucyB0byBjb3VudCB0aW1lLCBzZXR0aW5nIHRoZSBbc3RhcnQgdGltZV0oI3N0YXJ0dGltZSkgdG8gYSB2YWx1ZSBlcXVpdmFsZW50IHRvIF9ub3dfLiBUaGlzIGFsc28gc3RhcnRzIHRoZVxyXG4gICAgICogZmlyc3QgbGFwIG9mIHRoZSBzdG9wd2F0Y2guXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVyblxyXG4gICAgICogICBUaW1lIHRoYXQgcmVwcmVzZW50cyBfbm93XyAob3IgYmV0dGVyIHlldCwgdGhlIG1vbWVudCB0aGUgc3RvcHdhdGNoIGhhcyBzdGFydGVkKS5cclxuICAgICAqIEB0aHJvd3MgVGltZXJFcnJvclxyXG4gICAgICogICBXaGVuIHRoZSBzdG9wd2F0Y2ggaXMgYWxyZWFkeSBydW5uaW5nLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5fbGFwU3RhcnRUaW1lID0gc3VwZXIuc3RhcnQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbGFwU3RhcnRUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRW5kcyB0aGUgdGltZSBjb3VudGluZywgcmV0dXJuaW5nIHRoZSB0b3RhbCBlbGFwc2VkIHRpbWUgKHN1bSBvZiBhbGwgbGFwIHBhcnRpYWxzKSBhbmQgcmVzZXR0aW5nIHRoZSBvYmplY3QgdG9cclxuICAgICAqIGl0cyBkZWZhdWx0IHN0YXRlLiBUaGlzIHdpbGwgYXV0b21hdGljYWxseSBlbmQgdGhlIGxhc3QgY3JlYXRlZCBsYXAhXHJcbiAgICAgKlxyXG4gICAgICogSWYgdGhlIHN0b3B3YXRjaCBpcyBbcGF1c2VkXSgjcGF1c2UpLCB0aGVyZSAqKmlzIG5vIG5lZWQqKiB0byBbcmVzdW1lXSgjcmVzdW1lKSBiZWZvcmUgY2FsbGluZyB0aGlzIG1ldGhvZC5cclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZGV0YWlsXHJcbiAgICAgKiAgIEEgY2xvc3VyZSB0aGF0IGNhbiBiZSB1c2VkIHRvIHJldHJpZXZlIGFkZGl0aW9uYWwgZGF0YSBhYm91dCB0aGUgc3RvcHdhdGNoLiBUaGlzIGluZm9ybWF0aW9uIHdvdWxkIG90aGVyd2lzZSBiZVxyXG4gICAgICogICBsb3N0IGFmdGVyIHRoZSBtZXRob2QgaXMgY29tcGxldGVkLlxyXG4gICAgICogQHJldHVyblxyXG4gICAgICogICBBIHRpbWUgd2l0aCB0aGUgdG90YWwgYW1vdW50IG9mIG5hbm9zZWNvbmRzIHNwZW50IGJldHdlZW4gW3N0YXJ0XSgjc3RhcnQpIGFuZCBfbm93Xy5cclxuICAgICAqIEB0aHJvd3MgVGltZXJFcnJvclxyXG4gICAgICogICBXaGVuIHRoZSBzdG9wd2F0Y2ggaGFzIG5vdCB5ZXQgc3RhcnRlZC5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0b3AoZGV0YWlsPzogU3RvcFdhdGNoRGV0YWlsKSB7XHJcbiAgICAgICAgY29uc3QgcGFydGlhbHMgPSB0aGlzLnBhcnRpYWxUaW1lcztcclxuICAgICAgICBjb25zdCB0b3RhbFRpbWUgPSBzdXBlci5zdG9wKCk7XHJcblxyXG4gICAgICAgIHRoaXMuX2xhcFBhcnRpYWxUaW1lcyA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2xhcFN0YXJ0VGltZSA9IHVuZGVmaW5lZDtcclxuXHJcbiAgICAgICAgaWYgKCFkZXRhaWwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRvdGFsVGltZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzdW0gPSBuZXcgRGVjaW1hbCgwKTtcclxuICAgICAgICBwYXJ0aWFscy5mb3JFYWNoKHBhcnRpYWwgPT4gc3VtID0gc3VtLmFkZChwYXJ0aWFsLmJpZ1ZhbHVlKSk7XHJcblxyXG4gICAgICAgIC8vIFRoZSBlcnJvciBpcyBjYWxjdWxhdGVkIGJ5IHRoZSBhYnNvbHV0ZSBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIHN0b3AgdmFsdWUgYW5kIHRoZSBzdW0gb2YgcGFydGlhbCB0aW1lc1xyXG4gICAgICAgIGRldGFpbChwYXJ0aWFscywgc3VtLm1pbnVzKHRvdGFsVGltZS5iaWdWYWx1ZSkuYWJzKCkudG9OdW1iZXIoKSk7XHJcblxyXG4gICAgICAgIHJldHVybiB0b3RhbFRpbWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgZXJyb3JzIHRoYXQgb2NjdXIgZHVyaW5nIHRoZSBvcGVyYXRpb24gb2YgW2Jhc2ljIHRpbWVyc10oLi4vY2xhc3Nlcy9faW5kZXhfLmJhc2ljdGltZXIuaHRtbCksXHJcbiAqIFt0aW1lcnNdKC4uL2NsYXNzZXMvX2luZGV4Xy50aW1lci5odG1sKSBhbmQgW3N0b3B3YXRjaGVzXSguLi9jbGFzc2VzL19pbmRleF8uc3RvcHdhdGNoLmh0bWwpLlxyXG4gKlxyXG4gKiBJdCBoYXMgc3RhdGljIG1ldGhvZHMgYWJsZSB0byBjcmVhdGUgW1RpbWVyRXJyb3JdKCMpIGluc3RhbmNlcyB3aXRoIGdlbmVyaWMgZXJyb3IgbWVzc2FnZXMuXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgVGltZXJFcnJvciBleHRlbmRzIEVycm9yIHtcclxuXHJcbiAgICAvKiogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIG5ldyBbVGltZXJFcnJvcl0oIykgaW5zdGFuY2UgZm9yIHdoZW4gdGhlIHRpbWVyIGlzIGFscmVhZHkgcGF1c2VkLiAqL1xyXG4gICAgcHVibGljIHN0YXRpYyB0aW1lckFscmVhZHlQYXVzZWQodHlwZTogc3RyaW5nID0gXCJ0aW1lclwiKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBUaW1lckVycm9yKGBUaGUgJHt0eXBlfSBpcyBhbHJlYWR5IHBhdXNlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgbmV3IFtUaW1lckVycm9yXSgjKSBpbnN0YW5jZSBmb3Igd2hlbiB0aGUgdGltZXIgaGFzIGFscmVhZHkgc3RhcnRlZC4gKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdGltZXJBbHJlYWR5U3RhcnRlZCh0eXBlOiBzdHJpbmcgPSBcInRpbWVyXCIpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFRpbWVyRXJyb3IoYFRoZSAke3R5cGV9IGhhcyBhbHJlYWR5IHN0YXJ0ZWRgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiogQ3JlYXRlcyBhbmQgcmV0dXJucyBhIG5ldyBbVGltZXJFcnJvcl0oIykgaW5zdGFuY2UgZm9yIHdoZW4gdGhlIHRpbWVyIGlzIG5vdCBwYXVzZWQuICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHRpbWVyTm90UGF1c2VkKHR5cGU6IHN0cmluZyA9IFwidGltZXJcIikge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGltZXJFcnJvcihgVGhlICR7dHlwZX0gaXMgbm90IHBhdXNlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBDcmVhdGVzIGFuZCByZXR1cm5zIGEgbmV3IFtUaW1lckVycm9yXSgjKSBpbnN0YW5jZSBmb3Igd2hlbiB0aGUgdGltZXIgaGFzIG5vdCB5ZXQgc3RhcnRlZC4gKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdGltZXJOb3RTdGFydGVkKHR5cGU6IHN0cmluZyA9IFwidGltZXJcIikge1xyXG4gICAgICAgIHJldHVybiBuZXcgVGltZXJFcnJvcihgVGhlICR7dHlwZX0gaGFzIG5vdCB5ZXQgc3RhcnRlZGApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiBHZXRzIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBbVGltZXJFcnJvcl0oIykgY2xhc3MsIHVzZWQgYnkgdGhlIGJ1aWx0LWluIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYC4gKi9cclxuICAgIHB1YmxpYyBnZXQgW1N5bWJvbC50b1N0cmluZ1RhZ10oKSB7IHJldHVybiBcIlRpbWVyRXJyb3JcIjsgfVxyXG59XHJcbiJdfQ==
