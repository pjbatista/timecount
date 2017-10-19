/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { TimeOutputOptions, TimeSpan } from "./time-utils";
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
export declare class SimpleTimer {
    private _end;
    private _options;
    private _result;
    private _start;
    /** Gets whether or not the time counting has ended. */
    readonly ended: boolean;
    /** Gets a value representing the end time, in nanoseconds. */
    readonly endTime: number;
    /** Gets the time span with the elapsed time so far. */
    readonly elapsedTime: TimeSpan;
    /** Gets the output options object used by this timer. */
    readonly options: TimeOutputOptions;
    /** Gets the result time span object from the time counting. */
    readonly result: TimeSpan;
    /** Gets whether or not the time counting has started. */
    readonly started: boolean;
    /** Gets a value representing the start time, in nanoseconds. */
    readonly startTime: number;
    /**
     * Initializes a new instance of the {@link Timer} class, optionally passing a configuration
     * object as parameter.
     *
     * @param options
     *   An object with the options to configure the timer execution and output.
     */
    constructor(options?: TimeOutputOptions);
    /**
     * Finishes the time counting, adjusting the time values and properties accordingly.
     *
     * @return
     *   An object with the time span between start and end.
     */
    end(): TimeSpan;
    /**
     * Starts the time counting.
     */
    start(): void;
    /** Protected setter for the endTime property. */
    protected setEndTime(value: number): void;
    /** Protected setter for the result property. */
    protected setResult(value: TimeSpan): void;
    /** Protected setter for the startTime property. */
    protected setStartTime(value: number): void;
    private _getElapsedTime();
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
export declare class Timer extends SimpleTimer {
    private _pauseEnd;
    private _pauseStart;
    private _totalPauseTime;
    /** Gets whether or not the time counting has ended. */
    readonly ended: boolean;
    /** Gets the time span with the elapsed time so far, minus the paused time. */
    readonly elapsedTime: TimeSpan;
    /** Gets a value representing the last time the object resumed from a pause, in nanoseconds. */
    readonly lastResumeTime: number;
    /** Gets whether or not the time counting is paused. */
    readonly paused: boolean;
    /** Gets a value representing the total paused time, in nanoseconds. */
    readonly totalPauseTime: number;
    /** Gets whether or not the time counting has started. */
    readonly started: boolean;
    /**
     * Initializes a new instance of the {@link Timer} class, optionally passing a configuration
     * object as parameter.
     *
     * @param options
     *   An object with the options to configure the timer execution and output.
     */
    constructor(options?: TimerOptions);
    /**
     * Finishes the time counting, adjusting the time values and properties accordingly.
     *
     * @return
     *   An object with the time span between start and end, minus the paused time.
     */
    end(): TimeSpan;
    /**
     * Gets the timer total timespan, including the time it was paused.
     *
     * @return
     *   A timespan object with the total time of the object.
     */
    getTimeIncludingPaused(): TimeSpan;
    /**
     * Pauses the time counting.
     */
    pause(): void;
    /**
     * Resumes the time counting from a paused state.
     *
     * @return
     *   A number with the paused time, in nanoseconds.
     */
    resume(): number;
    /**
     * Starts the time counting.
     */
    start(): void;
    private _getElapsedTimeWithPauses();
}
