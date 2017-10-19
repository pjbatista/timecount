"use strict";
/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
const time_utils_1 = require("./time-utils");
/**
 * Represents a simle time counting object, that is able to determine temporal differences between
 * start and end.
 *
 * For a more complete implementation, see {@link Timer}.
 *
 * @example **Timing an operation**
 *
 * ```typescript
 * import {SimpleTimer} from "timecount";
 *
 * const timer = new SimpleTimer({ autoStart: true });
 *
 * // Operation code...
 *
 * timer.end();
 * console.log(`It took ${timer.result.toString()} to do it.`);
 * ```
 */
class SimpleTimer {
    /** Gets whether or not the time counting has ended. */
    get ended() { return !isNaN(this._end); }
    /** Gets a value representing the end time, in nanoseconds. */
    get endTime() { return this._end; }
    /** Gets the time span with the elapsed time so far. */
    get elapsedTime() { return this._getElapsedTime(); }
    /** Gets the output options object used by this timer. */
    get options() { return this._options; }
    /** Gets the result time span object from the time counting. */
    get result() { return this._result; }
    /** Gets whether or not the time counting has started. */
    get started() { return !isNaN(this._start); }
    /** Gets a value representing the start time, in nanoseconds. */
    get startTime() { return this._start; }
    /**
     * Initializes a new instance of the {@link Timer} class, optionally passing a configuration
     * object as parameter.
     *
     * @param options
     *   An object with the options to configure the timer execution and output.
     */
    constructor(options) {
        this._end = NaN;
        this._result = new time_utils_1.TimeSpan(NaN);
        this._start = NaN;
        this._options = options || {};
    }
    /**
     * Finishes the time counting, adjusting the time values and properties accordingly.
     *
     * @return
     *   An object with the time span between start and end.
     */
    end() {
        this._end = time_utils_1.TimeUtil.getPreciseTime();
        this._result = new time_utils_1.TimeSpan(this._end - this._start, this.options);
        return this._result;
    }
    /**
     * Starts the time counting.
     */
    start() {
        this._end = NaN;
        this._start = time_utils_1.TimeUtil.getPreciseTime();
    }
    /** Protected setter for the endTime property. */
    setEndTime(value) { this._end = value; }
    /** Protected setter for the result property. */
    setResult(value) { this._result = value; }
    /** Protected setter for the startTime property. */
    setStartTime(value) { this._start = value; }
    // Gets the current elapsed time value
    _getElapsedTime() {
        if (!this.started || this.ended) {
            return this._result;
        }
        const elapsed = time_utils_1.TimeUtil.getPreciseTime() - this._start;
        return new time_utils_1.TimeSpan(elapsed, this._options);
    }
}
exports.SimpleTimer = SimpleTimer;
/**
 * Represents a time counting object, that is able to determine temporal differences between start
 * and end, inclusing pauses.
 *
 * @example **Timing and pausing**
 *
 * ```typescript
 * import {Timer} from "timecount";
 *
 * const timer = new Timer({ autoStart: true });
 *
 * // Operation code...
 *
 * timer.pause();
 *
 * // Do something while timer is paused (like reading CLI input)
 *
 * cli.read(response => {
 *     // The time it takes for the user to enter is not logged
 *     timer.resume();
 *
 *     // And later, pause to ask another input...
 *     timer.pause();
 *
 *     cli.read(response2 => {
 *         timer.end();
 *
 *         const result = timer.result;
 *         const resultIncludingPaused = timer.getTimeIncludingPaused();
 *
 *         console.log(`Processing: ${result.toString()}`);
 *         console.log(`Total: ${resultIncludingPaused.toString()}`);
 *     });
 * });
 * ```
 */
class Timer extends SimpleTimer {
    /** Gets whether or not the time counting has ended. */
    get ended() { return !isNaN(this.endTime); }
    /** Gets the time span with the elapsed time so far, minus the paused time. */
    get elapsedTime() { return this._getElapsedTimeWithPauses(); }
    /** Gets a value representing the last time the object resumed from a pause, in nanoseconds. */
    get lastResumeTime() { return this._pauseEnd; }
    /** Gets whether or not the time counting is paused. */
    get paused() { return !isNaN(this._pauseStart) && isNaN(this._pauseEnd); }
    /** Gets a value representing the total paused time, in nanoseconds. */
    get totalPauseTime() { return this._totalPauseTime; }
    /** Gets whether or not the time counting has started. */
    get started() { return !isNaN(this.startTime); }
    /**
     * Initializes a new instance of the {@link Timer} class, optionally passing a configuration
     * object as parameter.
     *
     * @param options
     *   An object with the options to configure the timer execution and output.
     */
    constructor(options) {
        super(options);
        this._pauseEnd = NaN;
        this._pauseStart = NaN;
        this._totalPauseTime = 0;
        if (options && options.autoStart) {
            this.start();
        }
    }
    /**
     * Finishes the time counting, adjusting the time values and properties accordingly.
     *
     * @return
     *   An object with the time span between start and end, minus the paused time.
     */
    end() {
        const endTime = this.paused ? this._pauseStart : time_utils_1.TimeUtil.getPreciseTime();
        const result = new time_utils_1.TimeSpan(endTime - this.startTime - this._totalPauseTime, this.options);
        this.setEndTime(endTime);
        this.setResult(result);
        return result;
    }
    /**
     * Gets the timer total timespan, including the time it was paused.
     *
     * @return
     *   A timespan object with the total time of the object.
     */
    getTimeIncludingPaused() {
        const time = this.result.value;
        if (isNaN(time)) {
            return this.result;
        }
        return new time_utils_1.TimeSpan(time + this._totalPauseTime, this.options);
    }
    /**
     * Pauses the time counting.
     */
    pause() {
        if (this.paused || this.ended || !this.started) {
            return;
        }
        this._pauseEnd = NaN;
        this._pauseStart = time_utils_1.TimeUtil.getPreciseTime();
    }
    /**
     * Resumes the time counting from a paused state.
     *
     * @return
     *   A number with the paused time, in nanoseconds.
     */
    resume() {
        if (!this.paused) {
            return 0;
        }
        this._pauseEnd = time_utils_1.TimeUtil.getPreciseTime();
        const pausedTime = this._pauseEnd - this._pauseStart;
        this._totalPauseTime += pausedTime;
        return pausedTime;
    }
    /**
     * Starts the time counting.
     */
    start() {
        this._pauseEnd = NaN;
        this._pauseStart = NaN;
        this._totalPauseTime = 0;
        super.start();
    }
    // Gets the elapsed time counting pauses
    _getElapsedTimeWithPauses() {
        // If it is not paused and never have been
        if (!this.paused && this._totalPauseTime === 0) {
            return super.elapsedTime;
        }
        // If object is not running
        if (!this.started || this.ended) {
            return this.result;
        }
        // If it is running, it can be paused or not:
        if (!this.paused) {
            const elapsed = time_utils_1.TimeUtil.getPreciseTime() - this.startTime - this._totalPauseTime;
            return new time_utils_1.TimeSpan(elapsed, this.options);
        }
        const elapsedWithPauses = this._pauseStart - this.startTime - this._totalPauseTime;
        return new time_utils_1.TimeSpan(elapsedWithPauses, this.options);
    }
}
exports.Timer = Timer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdGltZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztnRkFLZ0Y7O0FBRWhGLDZDQUFtRTtBQUVuRTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0g7SUFPSSx1REFBdUQ7SUFDdkQsSUFBVyxLQUFLLEtBQUssTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFaEQsOERBQThEO0lBQzlELElBQVcsT0FBTyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUUxQyx1REFBdUQ7SUFDdkQsSUFBVyxXQUFXLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFM0QseURBQXlEO0lBQ3pELElBQVcsT0FBTyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUU5QywrREFBK0Q7SUFDL0QsSUFBVyxNQUFNLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBRTVDLHlEQUF5RDtJQUN6RCxJQUFXLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVwRCxnRUFBZ0U7SUFDaEUsSUFBVyxTQUFTLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBRTlDOzs7Ozs7T0FNRztJQUNILFlBQW1CLE9BQTJCO1FBRTFDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUks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