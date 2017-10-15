/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */

import {TimeOutputOptions, TimeSpan, TimeUtil} from "./time-utils";

/**
 * Represents an object that is used to configure the timer object, as well the output of the
 * resulting time spans.
 */
export interface TimerOptions extends TimeOutputOptions {

    /** Whether or not to start the timer at its creation. */
    autoStart?: boolean;
}

/**
 * Represents a time counting object, that is able to determine temporal differences between start
 * and end, inclusing pauses.
 */
export class Timer {

    private _end: number;
    private _pauseEnd: number;
    private _pauseStart: number;
    private _options: TimerOptions | undefined;
    private _result: TimeSpan;
    private _start: number;
    private _totalPauseTime: number;

    /** Gets whether or not the time counting has ended. */
    public get ended() { return !isNaN(this._end); }

    /** Gets a value representing the end time, in nanoseconds. */
    public get endTime() { return this._end; }

    /** Gets a value representing the last time the object resumed from a pause, in nanoseconds. */
    public get lastResumeTime() { return this._pauseEnd; }

    /** Gets the output options object used by this timer. */
    public get options() { return this._options as TimeOutputOptions; }

    /** Gets whether or not the time counting is paused. */
    public get paused() { return !isNaN(this._pauseStart) && isNaN(this._pauseEnd); }

    /** Gets the result time span object from the time counting. */
    public get result() { return this._result; }

    /** Gets a value representing the total paused time, in nanoseconds. */
    public get totalPauseTime() { return this._totalPauseTime; }

    /** Gets whether or not the time counting has started. */
    public get started() { return !isNaN(this._start); }

    /** Gets a value representing the start time, in nanoseconds. */
    public get startTime() { return this._start; }

    /**
     * Initializes a new instance of the {@link Timer} class, optionally passing a configuration
     * object as parameter.
     *
     * @param options
     *   An object with the options to configure the timer execution and output.
     */
    public constructor(options?: TimerOptions) {

        this._end = NaN;
        this._result = new TimeSpan(NaN);
        this._start = NaN;
        this._options = options || {};

        if (this._options.autoStart) {
            this.start();
        }
    }

    /**
     * Finishes the time counting, adjusting the time values and properties accordingly.
     */
    public end() {

        this._end = this.paused ? this._pauseStart : TimeUtil.getPreciseTime();
        this._result = new TimeSpan(this._end - this._start - this._totalPauseTime, this._options);

        return this._result;
    }

    /**
     * Pauses the time counting.
     */
    public pause() {

        if (this.paused || this.ended || !this.started) {
            return;
        }

        this._pauseEnd = NaN;
        this._pauseStart = TimeUtil.getPreciseTime();
    }

    /**
     * Resumes the time counting from a paused state.
     */
    public resume() {

        if (!this.paused) {
            return 0;
        }

        this._pauseEnd = TimeUtil.getPreciseTime();

        const pausedTime = this._pauseEnd - this._pauseStart;
        this._totalPauseTime += pausedTime;

        this._pauseStart = NaN;
        return pausedTime;
    }

    /**
     * Starts the time counting.
     */
    public start() {

        this._end = NaN;
        this._pauseEnd = NaN;
        this._pauseStart = NaN;
        this._totalPauseTime = 0;

        this._start = TimeUtil.getPreciseTime();
    }
}
