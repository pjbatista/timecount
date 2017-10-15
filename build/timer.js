"use strict";
/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
const time_utils_1 = require("./time-utils");
/**
 * Represents a time counting object, that is able to determine temporal differences between start
 * and end, inclusing pauses.
 */
class Timer {
    /** Gets whether or not the time counting has ended. */
    get ended() { return !isNaN(this._end); }
    /** Gets a value representing the end time, in nanoseconds. */
    get endTime() { return this._end; }
    /** Gets a value representing the last time the object resumed from a pause, in nanoseconds. */
    get lastResumeTime() { return this._pauseEnd; }
    /** Gets the output options object used by this timer. */
    get options() { return this._options; }
    /** Gets whether or not the time counting is paused. */
    get paused() { return !isNaN(this._pauseStart) && isNaN(this._pauseEnd); }
    /** Gets the result time span object from the time counting. */
    get result() { return this._result; }
    /** Gets a value representing the total paused time, in nanoseconds. */
    get totalPauseTime() { return this._totalPauseTime; }
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
        if (this._options.autoStart) {
            this.start();
        }
    }
    /**
     * Finishes the time counting, adjusting the time values and properties accordingly.
     */
    end() {
        this._end = this.paused ? this._pauseStart : time_utils_1.TimeUtil.getPreciseTime();
        this._result = new time_utils_1.TimeSpan(this._end - this._start - this._totalPauseTime, this._options);
        return this._result;
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
        this._end = NaN;
        this._pauseEnd = NaN;
        this._pauseStart = NaN;
        this._totalPauseTime = 0;
        this._start = time_utils_1.TimeUtil.getPreciseTime();
    }
}
exports.Timer = Timer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdGltZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztnRkFLZ0Y7O0FBRWhGLDZDQUFtRTtBQVluRTs7O0dBR0c7QUFDSDtJQVVJLHVEQUF1RDtJQUN2RCxJQUFXLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVoRCw4REFBOEQ7SUFDOUQsSUFBVyxPQUFPLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRTFDLCtGQUErRjtJQUMvRixJQUFXLGNBQWMsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFFdEQseURBQXlEO0lBQ3pELElBQVcsT0FBTyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBNkIsQ0FBQyxDQUFDLENBQUM7SUFFbkUsdURBQXVEO0lBQ3ZELElBQVcsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakYsK0RBQStEO0lBQy9ELElBQVcsTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUU1Qyx1RUFBdUU7SUFDdkUsSUFBVyxjQUFjLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBRTVELHlEQUF5RDtJQUN6RCxJQUFXLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVwRCxnRUFBZ0U7SUFDaEUsSUFBVyxTQUFTLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBRTlDOzs7Ozs7T0FNRztJQUNILFlBQW1CLE9BQXNCO1FBRXJDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxxQkFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUU5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2pCLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxHQUFHO1FBRU4sSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxxQkFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxxQkFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUUzRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBRVIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNO1FBRVQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDYixDQUFDO1FBRUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxxQkFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBRTNDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUNyRCxJQUFJLENBQUMsZUFBZSxJQUFJLFVBQVUsQ0FBQztRQUVuQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUN2QixNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUs7UUFFUixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUN2QixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUV6QixJQUFJLENBQUMsTUFBTSxHQUFHLHFCQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDNUMsQ0FBQztDQUNKO0FBOUdELHNCQThHQyJ9