/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { TimeOutputOptions, TimeSpan } from "./time-utils";
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
export declare class Timer {
    private _end;
    private _pauseEnd;
    private _pauseStart;
    private _options;
    private _result;
    private _start;
    private _totalPauseTime;
    /** Gets whether or not the time counting has ended. */
    readonly ended: boolean;
    /** Gets a value representing the end time, in nanoseconds. */
    readonly endTime: number;
    /** Gets a value representing the last time the object resumed from a pause, in nanoseconds. */
    readonly lastResumeTime: number;
    /** Gets the output options object used by this timer. */
    readonly options: TimeOutputOptions;
    /** Gets whether or not the time counting is paused. */
    readonly paused: boolean;
    /** Gets the result time span object from the time counting. */
    readonly result: TimeSpan;
    /** Gets a value representing the total paused time, in nanoseconds. */
    readonly totalPauseTime: number;
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
    constructor(options?: TimerOptions);
    /**
     * Finishes the time counting, adjusting the time values and properties accordingly.
     */
    end(): TimeSpan;
    /**
     * Pauses the time counting.
     */
    pause(): void;
    /**
     * Resumes the time counting from a paused state.
     */
    resume(): number;
    /**
     * Starts the time counting.
     */
    start(): void;
}
