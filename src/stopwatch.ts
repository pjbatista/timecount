/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */

import {TimeSpan, TimeUtil} from "./time-utils";
import {Timer, TimerOptions} from "./timer";

/**
 * Represents an extension of the timer object that allows time divisions (laps) during the
 * counting.
 */
export class StopWatch extends Timer {

    private _lapEndTimes: number[];
    private _lapIndex: number;
    private _lapResults: TimeSpan[];
    private _lapTotalPauseTime: number;

    /** Gets the number of finished laps in the stopwatch. */
    public get lapCount() { return this._lapIndex; }

    /** Gets all time span objects containing the lap time count results. */
    public get lapResults() { return this._lapResults; }

    /**
     * Initializes a new instance of the {@link StopWatch} class, optionally passing a configuration
     * object as parameter.
     *
     * @param options
     *   An object with the options to configure the timer execution and output.
     */
    public constructor(options?: TimerOptions) {
        super(options);
    }

    /**
     * Finishes the time counting (including the lap), adjusting the time values and properties
     * accordingly.
     */
    public end() {

        this.endLap();
        return super.end();
    }

    /**
     * Finishes the current lap, adding the results to this object's result list.
     */
    public endLap() {

        if (!this.started) {
            return new TimeSpan(NaN, this.options);
        }

        const index = this._lapIndex;
        const startTime = index === 0 ? this.startTime : this._lapEndTimes[index - 1];
        const endTime = TimeUtil.getPreciseTime() - this._lapTotalPauseTime;

        const result = new TimeSpan(endTime - startTime, this.options);

        this._lapEndTimes[index] = endTime;
        this._lapResults[index] = result;
        this._startLap();

        return result;
    }

    /**
     * Resumes the time counting from a paused state.
     */
    public resume() {

        const pausedTime = super.resume();
        this._lapTotalPauseTime += pausedTime;

        return pausedTime;
    }

    /**
     * Starts the time counting, also starting the first lap.
     */
    public start() {
        this._lapEndTimes = [];
        this._lapIndex = 0;
        this._lapResults = [];
        this._lapTotalPauseTime = 0;

        super.start();
    }

    // Starts a new lap, resetting the lap-specific values
    private _startLap() {
        this._lapIndex += 1;
        this._lapTotalPauseTime = 0;
    }
}
