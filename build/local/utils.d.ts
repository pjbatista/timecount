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
export declare function getProcessTime(): Decimal;
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
export declare class BasicTimer {
    /** Protected field with the time value representing the moment the timer started. */
    protected _startTime?: Decimal;
    /** Gets the time elapsed since the start of the timer until _now_. */
    readonly elapsedTime: Time;
    /** Gets whether the timer is currently running (it was [started](#start) and not yet [stopped](#stop)). */
    readonly isRunning: boolean;
    /**
     * A protected property useful when overriding the timers it changes the output of
     * [timer errors](_utils_.timererror.html) in order to represent the specified name.
     */
    protected readonly timerErrorType: string;
    /**
     * Initializes a new instance of the [BasicTimer](#) class, optionally auto-starting it.
     *
     * @param autoStart
     *   Determines whether the timer will immediately start; default is false.
     */
    constructor(autoStart?: boolean);
    /**
     * Begins to count time, setting the [start time](#starttime) to a value equivalent to _now_.
     *
     * @return
     *   Time that represents _now_ (or better yet, the moment the timer has started).
     * @throws TimerError
     *   When the timer is already running.
     */
    start(): Decimal;
    /**
     * Ends the time counting, returning the total elapsed time and resetting the object to its default state.
     *
     * @return
     *   A time with the total amount of nanoseconds spent between [start](#start) and _now_.
     * @throws TimerError
     *   When the timer has not yet started.
     */
    stop(): Time;
    /**
     * Protected alias to [elapsedTime](#elapsedtime).
     */
    protected getElapsedTime(): Time;
    /**
     * Protected alias to [isRunning](#isRunning).
     */
    protected getIsRunning(): boolean;
}
/**
 * This type of function is used by [stopwatches](../classes/_utils_.stopwatch.html) to return additional information
 * to the callers of [stop](../classes/_utils_.stopwatch.html#stop)
 */
export declare type StopWatchDetail = (partialTimes: Time[], error: number) => void;
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
export declare class Timer extends BasicTimer {
    /** Protected field with the time value representing the moment the pausing started. */
    protected _pauseStartTime?: Decimal;
    /** Protected field with the time value representing the sum of all previous pause times. */
    protected _pauseTimeSum: Decimal;
    /** Gets the time elapsed since the timer was [paused](#pause). */
    readonly elapsedPauseTime: Time;
    /** Gets the total amount of time the object spent [paused](#pause) during the current start-stop cycle. */
    readonly totalPauseTime: Time;
    /**
     * Gets the time elapsed since the start of the timer until _now_.
     *
     * The value of this time will remain unchanged when the timer is [paused](#stop).
     */
    readonly elapsedTime: Time;
    /** Gets whether the timer is paused. */
    readonly isPaused: boolean;
    /**
     * Gets whether the timer is currently running (it was [started](#start) and not yet [stopped](#stop)).
     *
     * This property is **not influenced by [pauses](#pause)**, i.e. it will return true even when paused.
     */
    readonly isRunning: boolean;
    /**
     * Prevents the object from counting the time until it is [resumed](#resume).
     *
     * Both the [elapsed time](#elapsedtime) and the time resulting from [stop](#stop) won't change during the pause,
     * but [pausedTime](#pausedtime) and [totalPauseTime](#totalpausedtime) will.
     *
     * @throws TimerError
     *   When the timer has not yet started -or- it is already paused.
     */
    pause(): Decimal;
    /**
     * Resumes the time counting, recovering the object from a [paused](#pause) state.
     *
     * @return
     *   The amount of time the timer spent paused.
     * @throws TimerError
     *   When the timer has not yet started -or- it is not paused.
     */
    resume(): Time;
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
    stop(): Time;
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
export declare class StopWatch extends Timer {
    /** Protected field with the array of partial lap time values. */
    protected _lapPartialTimes: Decimal[];
    /** Protected field with the time value representing the moment the lap started. */
    protected _lapStartTime?: Decimal;
    /** Gets the time elapsed since the start of the current lap until _now_. */
    readonly currentLapElapsedTime: Time;
    /**
     * Gets the time representing the moment the current lap started.
     *
     * @deprecated Since v1.1.0 - Unnecessary property (will be removed in v2).
     */
    readonly currentLapStartTime: Time;
    /** Gets the number of laps currently stored at the stopwatch. */
    readonly lapCount: number;
    /**
     * Gets an array with time partials of the laps of the stopwatch, excluding the [current](#currentlapelapsedtime).
     *
     * @deprecated Since v1.1.0 - In favor of `partialTimes` (will be removed in v2).
     */
    readonly lapPartials: Time[];
    /**
     * Gets an array with time partials of the laps of the stopwatch, including the [current](#currentlapelapsedtime).
     * The sum of these times is equivalent to the total elapsed time of the stopwatch.
     */
    readonly partialTimes: Time[];
    /** Gets the name used on stopwatch errors. */
    protected readonly timerErrorType: string;
    /** Alias to [endLap](#endlap). */
    createTimeSegment(): Time;
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
    endLap(): Time;
    /**
     * Begins to count time, setting the [start time](#starttime) to a value equivalent to _now_. This also starts the
     * first lap of the stopwatch.
     *
     * @return
     *   Time that represents _now_ (or better yet, the moment the stopwatch has started).
     * @throws TimerError
     *   When the stopwatch is already running.
     */
    start(): Decimal;
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
    stop(detail?: StopWatchDetail): Time;
}
/**
 * This class represents errors that occur during the operation of [basic timers](../classes/_index_.basictimer.html),
 * [timers](../classes/_index_.timer.html) and [stopwatches](../classes/_index_.stopwatch.html).
 *
 * It has static methods able to create [TimerError](#) instances with generic error messages.
 */
export declare class TimerError extends Error {
    /** Creates and returns a new [TimerError](#) instance for when the timer is already paused. */
    static timerAlreadyPaused(type?: string): TimerError;
    /** Creates and returns a new [TimerError](#) instance for when the timer has already started. */
    static timerAlreadyStarted(type?: string): TimerError;
    /** Creates and returns a new [TimerError](#) instance for when the timer is not paused. */
    static timerNotPaused(type?: string): TimerError;
    /** Creates and returns a new [TimerError](#) instance for when the timer has not yet started. */
    static timerNotStarted(type?: string): TimerError;
    /** Gets a string representation of the [TimerError](#) class, used by the built-in `Object.prototype.toString`. */
    readonly [Symbol.toStringTag]: string;
}
//# sourceMappingURL=utils.d.ts.map