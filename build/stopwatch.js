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
 *
 * @example **Counting parcial times**
 *
 * ```typescript
 * import {StopWatch} from "timecount";
 *
 * const sw = new StopWatch({ autoStart: true, precision: 4 });
 *
 * while (doingSomething) {
 *     // Something that takes time
 *     sw.endLap();
 * }
 *
 * sw.end();
 *
 * for (const lap of sw.lapResults) {
 *     console.log(`Lap parcial: ${lap.toString()}`);
 * }
 *
 * console.log(`Total time: ${sw.result.toString()}`);
 * ```
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcHdhdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3N0b3B3YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O2dGQUtnRjs7QUFFaEYsNkNBQWdEO0FBQ2hELG1DQUE0QztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsZUFBdUIsU0FBUSxhQUFLO0lBT2hDLHlEQUF5RDtJQUN6RCxJQUFXLFFBQVEsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFFaEQsd0VBQXdFO0lBQ3hFLElBQVcsVUFBVSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUVwRDs7Ozs7O09BTUc7SUFDSCxZQUFtQixPQUFzQjtRQUNyQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLEdBQUc7UUFFTixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU07UUFFVCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxJQUFJLHFCQUFRLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM3QixNQUFNLFNBQVMsR0FBRyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5RSxNQUFNLE9BQU8sR0FBRyxxQkFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztRQUVwRSxNQUFNLE1BQU0sR0FBRyxJQUFJLHFCQUFRLENBQUMsT0FBTyxHQUFHLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFL0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUM7UUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxNQUFNLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpCLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksTUFBTTtRQUVULE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNsQyxJQUFJLENBQUMsa0JBQWtCLElBQUksVUFBVSxDQUFDO1FBRXRDLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0ksS0FBSztRQUNSLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7UUFFNUIsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxzREFBc0Q7SUFDOUMsU0FBUztRQUNiLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNKO0FBcEZELDhCQW9GQyJ9