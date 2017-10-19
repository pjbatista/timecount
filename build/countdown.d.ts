/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { TimeOutputOptions, TimeSpan } from "./time-utils";
import { SimpleTimer } from "./timer";
/**
 * Represents the callback function called at each `tick` of a CountDown object.
 *
 * @param elapsed
 *   AAAA
 */
export declare type CountDownCallback = (elapsed: TimeSpan, tickCount: number, object: CountDown) => void;
/**
 * Represents an object that is used to configure the countdown object, as well the output of the
 * resulting `tick` real elapsed time.
 */
export interface CountDownOptions extends TimeOutputOptions {
    /** The callback function used at each tick. */
    callback?: CountDownCallback;
    /**
     * The maximum number of ticks counted by the countdown object before it ends.
     *
     * If if its 0 (zero), there will be automatic stop for the object.
     */
    maxTicks?: number;
}
/**
 * Represents a time counting object, that is able to determine temporal differences and "tick" at a
 * specified interval, exporting the result time spans.
 *
 * Countdown objects also have nanosecond precision, but due to the small scale of this time
 * measuring unit, it may take longer
 */
export declare class CountDown extends SimpleTimer {
    private _interval;
    private _maxTicks;
    private _tickCallback;
    private _ticks;
    /**
     * Initializes a new instance of the {@link CountDown} class, using the specified interval as
     * nanosecond timer for the ticks and the options to configure the maximum ticks and/or time
     * span output.
     *
     * Use {@link TimeUtil.fromHours}, {@link TimeUtil.fromMicroSeconds},
     * {@link TimeUtil.fromMiliSeconds}, {@link TimeUtil.fromMinutes}, or
     * {@link TimeUtil.fromSeconds} to convert a time value to nanosecond.
     *
     * @param interval
     *   A numeric value with the countdown object `tick` interval, in nanoseconds.
     * @param options
     */
    constructor(interval: number, options?: CountDownOptions);
}
