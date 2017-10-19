/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { TimeSpan } from "./time-utils";
import { Timer, TimerOptions } from "./timer";
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
export declare class StopWatch extends Timer {
    private _lapEndTimes;
    private _lapIndex;
    private _lapResults;
    private _lapTotalPauseTime;
    /** Gets the number of finished laps in the stopwatch. */
    readonly lapCount: number;
    /** Gets all time span objects containing the lap time count results. */
    readonly lapResults: TimeSpan[];
    /**
     * Initializes a new instance of the {@link StopWatch} class, optionally passing a configuration
     * object as parameter.
     *
     * @param options
     *   An object with the options to configure the timer execution and output.
     */
    constructor(options?: TimerOptions);
    /**
     * Finishes the time counting (including the lap), adjusting the time values and properties
     * accordingly.
     */
    end(): TimeSpan;
    /**
     * Finishes the current lap, adding the results to this object's result list.
     */
    endLap(): TimeSpan;
    /**
     * Resumes the time counting from a paused state.
     */
    resume(): number;
    /**
     * Starts the time counting, also starting the first lap.
     */
    start(): void;
    private _startLap();
}
