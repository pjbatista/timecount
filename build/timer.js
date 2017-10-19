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
        this._pauseStart = NaN;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdGltZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztnRkFLZ0Y7O0FBRWhGLDZDQUFtRTtBQUVuRTs7Ozs7R0FLRztBQUNIO0lBT0ksdURBQXVEO0lBQ3ZELElBQVcsS0FBSyxLQUFLLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWhELDhEQUE4RDtJQUM5RCxJQUFXLE9BQU8sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFMUMsdURBQXVEO0lBQ3ZELElBQVcsV0FBVyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTNELHlEQUF5RDtJQUN6RCxJQUFXLE9BQU8sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFFOUMsK0RBQStEO0lBQy9ELElBQVcsTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUU1Qyx5REFBeUQ7SUFDekQsSUFBVyxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFcEQsZ0VBQWdFO0lBQ2hFLElBQVcsU0FBUyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUU5Qzs7Ozs7O09BTUc7SUFDSCxZQUFtQixPQUEyQjtRQUUxQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUkscUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFH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