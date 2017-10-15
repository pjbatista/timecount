"use strict";
/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
const time_utils_1 = require("./time-utils");
const timer_1 = require("./timer");
/**
 * Represents an extension of the timer object that allows time divisions (laps) during the
 * counting.
 */
class StopWatch extends timer_1.Timer {
    /** Gets the number of finished laps in the stopwatch. */
    get lapCount() { return this._lapIndex; }
    /** Gets all time span objects containing the lap time count results. */
    get lapResults() { return this._lapResults; }
    /**
     * Initializes a new instance of the {@link StopWatch} class, optionally passing a configuration
     * object as parameter.
     *
     * @param options
     *   An object with the options to configure the timer execution and output.
     */
    constructor(options) {
        super(options);
    }
    /**
     * Finishes the time counting (including the lap), adjusting the time values and properties
     * accordingly.
     */
    end() {
        this.endLap();
        return super.end();
    }
    /**
     * Finishes the current lap, adding the results to this object's result list.
     */
    endLap() {
        if (!this.started) {
            return new time_utils_1.TimeSpan(NaN, this.options);
        }
        const index = this._lapIndex;
        const startTime = index === 0 ? this.startTime : this._lapEndTimes[index - 1];
        const endTime = time_utils_1.TimeUtil.getPreciseTime() - this._lapTotalPauseTime;
        const result = new time_utils_1.TimeSpan(endTime - startTime, this.options);
        this._lapEndTimes[index] = endTime;
        this._lapResults[index] = result;
        this._startLap();
        return result;
    }
    /**
     * Resumes the time counting from a paused state.
     */
    resume() {
        const pausedTime = super.resume();
        this._lapTotalPauseTime += pausedTime;
        return pausedTime;
    }
    /**
     * Starts the time counting, also starting the first lap.
     */
    start() {
        this._lapEndTimes = [];
        this._lapIndex = 0;
        this._lapResults = [];
        this._lapTotalPauseTime = 0;
        super.start();
    }
    // Starts a new lap, resetting the lap-specific values
    _startLap() {
        this._lapIndex += 1;
        this._lapTotalPauseTime = 0;
    }
}
exports.StopWatch = StopWatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcHdhdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3N0b3B3YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O2dGQUtnRjs7QUFFaEYsNkNBQWdEO0FBQ2hELG1DQUE0QztBQUU1Qzs7O0dBR0c7QUFDSCxlQUF1QixTQUFRLGFBQUs7SUFPaEMseURBQXlEO0lBQ3pELElBQVcsUUFBUSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUVoRCx3RUFBd0U7SUFDeEUsSUFBVyxVQUFVLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBRXBEOzs7Ozs7T0FNRztJQUNILFlBQW1CLE9BQXNCO1FBQ3JDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksR0FBRztRQUVOLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNkLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTTtRQUVULEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDaEIsTUFBTSxDQUFDLElBQUkscUJBQVEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFFRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzdCLE1BQU0sU0FBUyxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlFLE1BQU0sT0FBTyxHQUFHLHFCQUFRLENBQUMsY0FBYyxFQUFFLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBRXBFLE1BQU0sTUFBTSxHQUFHLElBQUkscUJBQVEsQ0FBQyxPQUFPLEdBQUcsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUvRCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakIsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQ7O09BRUc7SUFDSSxNQUFNO1FBRVQsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxVQUFVLENBQUM7UUFFdEMsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLO1FBQ1IsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQztRQUU1QixLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQUVELHNEQUFzRDtJQUM5QyxTQUFTO1FBQ2IsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0o7QUFwRkQsOEJBb0ZDIn0=