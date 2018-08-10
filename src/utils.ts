/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
/** [[include:utils.md]] */ /** */
import { Decimal } from "decimal.js";
import { Time } from ".";

/**
 * Gets the number of nanoseconds that represent the current time according to `process`.
 *
 * @return
 *   [Big decimal](https://www.npmjs.com/package/decimal.js) representation of the current time, in nanoseconds.
 */
export function getProcessTime() {
    const preciseTime = process.hrtime();
    return (new Decimal(preciseTime[0])).times("1e+9").add(preciseTime[1]);
}

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
export class BasicTimer {

    /** Protected field with the time value representing the moment the timer started. */
    protected _startTime?: Decimal;

    /** Gets the time elapsed since the start of the timer until _now_. */
    public get elapsedTime() {
        return this.getElapsedTime();
    }

    /** Gets whether the timer is currently running (it was [started](#start) and not yet [stopped](#stop)). */
    public get isRunning() { return !!this._startTime; }

    /**
     * A protected property useful when overriding the timers it changes the output of
     * [timer errors](_utils_.timererror.html) in order to represent the specified name.
     */
    protected get timerErrorType() { return "timer"; }

    /**
     * Initializes a new instance of the [BasicTimer](#) class, optionally auto-starting it.
     *
     * @param autoStart
     *   Determines whether the timer will immediately start; default is false.
     */
    public constructor(autoStart: boolean = false) {

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
    public start() {

        if (this._startTime) {
            throw TimerError.timerAlreadyStarted(this.timerErrorType);
        }

        this._startTime = getProcessTime();
        return this._startTime as Decimal;
    }

    /**
     * Ends the time counting, returning the total elapsed time and resetting the object to its default state.
     *
     * @return
     *   A time with the total amount of nanoseconds spent between [start](#start) and _now_.
     * @throws TimerError
     *   When the timer has not yet started.
     */
    public stop() {

        if (!this._startTime) {
            throw TimerError.timerNotStarted(this.timerErrorType);
        }

        const resultTime = new Time(getProcessTime().minus(this._startTime));
        this._startTime = undefined;

        return resultTime;
    }

    /**
     * Protected alias to [elapsedTime](#elapsedtime).
     */
    protected getElapsedTime() {

        if (!this._startTime) {
            return new Time(0);
        }

        return new Time(getProcessTime().minus(this._startTime));
    }

    /**
     * Protected alias to [isRunning](#isRunning).
     */
    protected getIsRunning() {
        return !!this._startTime;
    }
}

/**
 * This type of function is used by [stopwatches](../classes/_utils_.stopwatch.html) to return additional information
 * to the callers of [stop](../classes/_utils_.stopwatch.html#stop)
 */
export type StopWatchDetail = (partialTimes: Time[], error: number) => void;

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
export class Timer extends BasicTimer {

    /** Protected field with the time value representing the moment the pausing started. */
    protected _pauseStartTime?: Decimal;

    /** Protected field with the time value representing the sum of all previous pause times. */
    protected _pauseTimeSum = new Decimal(0);

    /** Gets the time elapsed since the timer was [paused](#pause). */
    public get elapsedPauseTime() {

        if (!this._pauseStartTime) {
            return new Time(0);
        }

        return new Time(getProcessTime().minus(this._pauseStartTime));
    }

    /** Gets the total amount of time the object spent [paused](#pause) during the current start-stop cycle. */
    public get totalPauseTime() {
        return this.elapsedPauseTime.add(this._pauseTimeSum);
    }

    /**
     * Gets the time elapsed since the start of the timer until _now_.
     *
     * The value of this time will remain unchanged when the timer is [paused](#stop).
     */
    public get elapsedTime() {

        if (!this._startTime) {
            return new Time(0);
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
    public get isPaused() { return !!this._pauseStartTime; }

    /**
     * Gets whether the timer is currently running (it was [started](#start) and not yet [stopped](#stop)).
     *
     * This property is **not influenced by [pauses](#pause)**, i.e. it will return true even when paused.
     */
    public get isRunning() { return super.getIsRunning(); }

    /**
     * Prevents the object from counting the time until it is [resumed](#resume).
     *
     * Both the [elapsed time](#elapsedtime) and the time resulting from [stop](#stop) won't change during the pause,
     * but [pausedTime](#pausedtime) and [totalPauseTime](#totalpausedtime) will.
     *
     * @throws TimerError
     *   When the timer has not yet started -or- it is already paused.
     */
    public pause() {

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
    public resume() {

        if (!this.isRunning) {
            throw TimerError.timerNotStarted(this.timerErrorType);
        }

        if (!this._pauseStartTime) {
            throw TimerError.timerNotPaused(this.timerErrorType);
        }

        const pausedTime = this.elapsedPauseTime;
        this._pauseStartTime = undefined;
        this._pauseTimeSum = this._pauseTimeSum.add(pausedTime.bigValue);

        return new Time(pausedTime);
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
    public stop() {

        const totalTime = super.stop();

        if (this._pauseStartTime) {
            this.resume();
        }

        const totalPauseTime = this._pauseTimeSum;
        this._pauseTimeSum = new Decimal(0);

        return totalTime.subtract(totalPauseTime);
    }
}

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
export class StopWatch extends Timer {

    /** Protected field with the array of partial lap time values. */
    protected _lapPartialTimes: Decimal[] = [];

    /** Protected field with the time value representing the moment the lap started. */
    protected _lapStartTime?: Decimal;

    /** Gets the time elapsed since the start of the current lap until _now_. */
    public get currentLapElapsedTime() {

        if (!this._lapStartTime) {
            return new Time(0);
        }

        return new Time(getProcessTime().minus(this._lapStartTime).minus(this._pauseStartTime || 0));
    }

    /**
     * Gets the time representing the moment the current lap started.
     *
     * @deprecated Since v1.1.0 - Unnecessary property (will be removed in v2).
     */
    public get currentLapStartTime() { return new Time(this._lapStartTime || 0); }

    /** Gets the number of laps currently stored at the stopwatch. */
    public get lapCount() { return this.partialTimes.length + 1; }

    /**
     * Gets an array with time partials of the laps of the stopwatch, excluding the [current](#currentlapelapsedtime).
     *
     * @deprecated Since v1.1.0 - In favor of `partialTimes` (will be removed in v2).
     */
    public get lapPartials() { return this._lapPartialTimes.map(value => new Time(value)); }

    /**
     * Gets an array with time partials of the laps of the stopwatch, including the [current](#currentlapelapsedtime).
     * The sum of these times is equivalent to the total elapsed time of the stopwatch.
     */
    public get partialTimes() {
        const partialTimes = this._lapPartialTimes.map(value => new Time(value));

        if (this._lapStartTime) {
            return partialTimes.concat(this.currentLapElapsedTime);
        }

        return partialTimes;
    }

    /** Gets the name used on stopwatch errors. */
    protected get timerErrorType() { return "stopwatch"; }

    /** Alias to [endLap](#endlap). */
    public createTimeSegment() { return this.endLap(); }

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
    public endLap() {

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
        return new Time(total);
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
    public start() {
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
    public stop(detail?: StopWatchDetail) {
        const partials = this.partialTimes;
        const totalTime = super.stop();

        this._lapPartialTimes = [];
        this._lapStartTime = undefined;

        if (!detail) {
            return totalTime;
        }

        let sum = new Decimal(0);
        partials.forEach(partial => sum = sum.add(partial.bigValue));

        // The error is calculated by the absolute difference between the stop value and the sum of partial times
        detail(partials, sum.minus(totalTime.bigValue).abs().toNumber());

        return totalTime;
    }
}

/**
 * This class represents errors that occur during the operation of [basic timers](../classes/_index_.basictimer.html),
 * [timers](../classes/_index_.timer.html) and [stopwatches](../classes/_index_.stopwatch.html).
 *
 * It has static methods able to create [TimerError](#) instances with generic error messages.
 */
export class TimerError extends Error {

    /** Creates and returns a new [TimerError](#) instance for when the timer is already paused. */
    public static timerAlreadyPaused(type: string = "timer") {
        return new TimerError(`The ${type} is already paused`);
    }

    /** Creates and returns a new [TimerError](#) instance for when the timer has already started. */
    public static timerAlreadyStarted(type: string = "timer") {
        return new TimerError(`The ${type} has already started`);
    }

    /** Creates and returns a new [TimerError](#) instance for when the timer is not paused. */
    public static timerNotPaused(type: string = "timer") {
        return new TimerError(`The ${type} is not paused`);
    }

    /** Creates and returns a new [TimerError](#) instance for when the timer has not yet started. */
    public static timerNotStarted(type: string = "timer") {
        return new TimerError(`The ${type} has not yet started`);
    }

    /** Gets a string representation of the [TimerError](#) class, used by the built-in `Object.prototype.toString`. */
    public get [Symbol.toStringTag]() { return "TimerError"; }
}
