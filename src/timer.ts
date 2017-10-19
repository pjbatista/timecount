/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */

import {TimeOutputOptions, TimeSpan, TimeUtil} from "./time-utils";

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
export class SimpleTimer {

    private _end: number;
    private _options: TimeOutputOptions;
    private _result: TimeSpan;
    private _start: number;

    /** Gets whether or not the time counting has ended. */
    public get ended() { return !isNaN(this._end); }

    /** Gets a value representing the end time, in nanoseconds. */
    public get endTime() { return this._end; }

    /** Gets the time span with the elapsed time so far. */
    public get elapsedTime() { return this._getElapsedTime(); }

    /** Gets the output options object used by this timer. */
    public get options() { return this._options; }

    /** Gets the result time span object from the time counting. */
    public get result() { return this._result; }

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
    public constructor(options?: TimeOutputOptions) {

        this._end = NaN;
        this._result = new TimeSpan(NaN);
        this._start = NaN;
        this._options = options || {};
    }

    /**
     * Finishes the time counting, adjusting the time values and properties accordingly.
     *
     * @return
     *   An object with the time span between start and end.
     */
    public end() {

        this._end = TimeUtil.getPreciseTime();
        this._result = new TimeSpan(this._end - this._start, this.options);

        return this._result;
    }

    /**
     * Starts the time counting.
     */
    public start() {

        this._end = NaN;
        this._start = TimeUtil.getPreciseTime();
    }

    /** Protected setter for the endTime property. */
    protected setEndTime(value: number) { this._end = value; }

    /** Protected setter for the result property. */
    protected setResult(value: TimeSpan) { this._result = value; }

    /** Protected setter for the startTime property. */
    protected setStartTime(value: number) { this._start = value; }

    // Gets the current elapsed time value
    private _getElapsedTime() {

        if (!this.started || this.ended) {
            return this._result;
        }

        const elapsed = TimeUtil.getPreciseTime() - this._start;
        return new TimeSpan(elapsed, this._options);
    }
}

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
export class Timer extends SimpleTimer {

    private _pauseEnd: number;
    private _pauseStart: number;
    private _totalPauseTime: number;

    /** Gets whether or not the time counting has ended. */
    public get ended() { return !isNaN(this.endTime); }

    /** Gets the time span with the elapsed time so far, minus the paused time. */
    public get elapsedTime() { return this._getElapsedTimeWithPauses(); }

    /** Gets a value representing the last time the object resumed from a pause, in nanoseconds. */
    public get lastResumeTime() { return this._pauseEnd; }

    /** Gets whether or not the time counting is paused. */
    public get paused() { return !isNaN(this._pauseStart) && isNaN(this._pauseEnd); }

    /** Gets a value representing the total paused time, in nanoseconds. */
    public get totalPauseTime() { return this._totalPauseTime; }

    /** Gets whether or not the time counting has started. */
    public get started() { return !isNaN(this.startTime); }

    /**
     * Initializes a new instance of the {@link Timer} class, optionally passing a configuration
     * object as parameter.
     *
     * @param options
     *   An object with the options to configure the timer execution and output.
     */
    public constructor(options?: TimerOptions) {

        super(options as TimeOutputOptions);

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
    public end() {

        const endTime = this.paused ? this._pauseStart : TimeUtil.getPreciseTime();
        const result = new TimeSpan(endTime - this.startTime - this._totalPauseTime, this.options);

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
    public getTimeIncludingPaused() {
        const time = this.result.value;

        if (isNaN(time)) { return this.result; }

        return new TimeSpan(time + this._totalPauseTime, this.options);
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
     *
     * @return
     *   A number with the paused time, in nanoseconds.
     */
    public resume() {

        if (!this.paused) {
            return 0;
        }

        this._pauseEnd = TimeUtil.getPreciseTime();

        const pausedTime = this._pauseEnd - this._pauseStart;
        this._totalPauseTime += pausedTime;

        return pausedTime;
    }

    /**
     * Starts the time counting.
     */
    public start() {
        this._pauseEnd = NaN;
        this._pauseStart = NaN;
        this._totalPauseTime = 0;

        super.start();
    }

    // Gets the elapsed time counting pauses
    private _getElapsedTimeWithPauses() {

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
            const elapsed = TimeUtil.getPreciseTime() - this.startTime - this._totalPauseTime;
            return new TimeSpan(elapsed, this.options);
        }

        const elapsedWithPauses = this._pauseStart - this.startTime - this._totalPauseTime;
        return new TimeSpan(elapsedWithPauses, this.options);
    }
}
