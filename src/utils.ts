/** [[include:utils.md]] */ /** */
/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { Time } from ".";

/**
 * Gets the number of nanoseconds that represent the current time according to `process`.
 *
 * @return
 *   Current time, in nanoseconds.
 */
export function getProcessTime(): number {
    const preciseTime = process.hrtime();
    return preciseTime[0] * 1e9 + preciseTime[1];
}

/**
 * This class represents a simple nanosecond-based time counter; instances of [[BasicTimer]] are able to measure the
 * span between the time they started and stopped.
 *
 * ---
 *
 * See [[Timer]] if you need pausing and [[StopWatch]] for time segmentation (laps).
 *
 * [[include:examples/basictimer.md]]
 */
export class BasicTimer {

    private _startTime?: number;

    /** Gets the time elapsed since the start of the timer until now, or null if the timer is stopped. */
    public get elapsedTime() {

        if (!this._startTime) {
            return null;
        }

        return new Time(getProcessTime() - this._startTime);
    }

    /** Gets whether the timer is running ([[start]] was invoked). */
    public get isRunning() { return !!this._startTime; }

    /** Gets a time that represents the moment the timer started, or null if the timer is stopped. */
    public get startTime() {

        if (!this._startTime) {
            return null;
        }

        return new Time(this._startTime);
    }

    /**
     * Initializes a new instance of the [[BasicTimer]] class, with the ability to automatically start the timer.
     *
     * @param autoStart
     *   Determines whether or not the timer will immediately start; default is false.
     */
    public constructor(autoStart: boolean = false) {

        if (autoStart) {
            this.start();
        }
    }

    /**
     * Starts the timer, configuring its starting time to now.
     *
     * @throws TimerError
     *   When the timer is already running.
     */
    public start() {

        if (this._startTime) {
            throw TimerError.timerHasAlreadyStarted();
        }

        this._startTime = getProcessTime();
    }

    /**
     * Stops the timer, resetting this instance to its initial state and retrieving the amount of time spent.
     *
     * @return
     *   The time span from when the timer started until now.
     * @throws TimerError
     *   When the timer is already stopped.
     */
    public stop() {

        if (!this._startTime) {
            throw TimerError.timerHasNotStarted();
        }

        const resultTime = new Time(getProcessTime() - this._startTime);
        this._startTime = undefined;

        return resultTime;
    }
}

/**
 * This class represents a nanosecond-based time counting unit; instances of [[Timer]] are able to:
 *
 * - Measure the span between the time they started and stopped;
 * - Pause and account for the paused time.
 *
 * --
 *
 * See [[BasicTimer]] if you need a simple time counter and [[StopWatch]] for time segmentation.
 *
 * [[include:examples/timer.md]]
 */
export class Timer extends BasicTimer {

    private _pauseStartTime?: number;
    private _totalPauseTime = 0;

    /** Gets the time elapsed since the start of the timer until now, or null if the timer is stopped. */
    public get elapsedTime() {

        const totalElapsedTime = super.elapsedTime;

        if (totalElapsedTime === null || !this._pauseStartTime) {
            return totalElapsedTime;
        }

        return totalElapsedTime.subtract(getProcessTime() - this._pauseStartTime - this._totalPauseTime);
    }

    /** Gets whether the timer is paused. */
    public get isPaused() { return !!this._pauseStartTime; }

    /**
     * Pauses the timer, preventing time from being counted until it's [resumed](#resume).
     *
     * @throws TimerError
     *   When the timer is already paused.
     */
    public pause() {

        if (!this.isRunning) {
            throw TimerError.timerHasNotStarted();
        }

        if (this._pauseStartTime) {
            throw TimerError.timerIsAlreadyPaused();
        }

        this._pauseStartTime = getProcessTime();
    }

    /**
     * Resumes the timer, recovering the time counting from a [paused](#pause) state.
     *
     * @throws TimerError
     *   When the timer is not paused.
     */
    public resume() {

        if (!this._pauseStartTime) {
            throw TimerError.timerIsNotPaused();
        }

        const pausedTime = getProcessTime() - this._pauseStartTime;
        this._pauseStartTime = undefined;
        this._totalPauseTime += pausedTime;

        return new Time(pausedTime);
    }

    /**
     * Stops the timer, resetting this instance to its initial state and retrieving the amount of time spent. If the
     * timer is paused, it will be resumed before stopping.
     *
     * @return
     *   The time span from when the timer started until now.
     * @throws TimerError
     *   When the timer is already stopped.
     */
    public stop() {

        if (this._pauseStartTime) {
            this.resume();
        }

        const resultTime = super.stop();
        const totalPauseTime = this._totalPauseTime;
        this._totalPauseTime = 0;

        return resultTime.subtract(totalPauseTime);
    }

}

/**
 * This class represents a nanosecond-based time counting unit; instances of [[StopWatch]] are able to:
 *
 * - Measure the span between the time they started and stopped;
 * - Pause and account for the paused time;
 * - Split time into laps (arbitrary segmentations of time).
 *
 * --
 *
 * See [[BasicTimer]] if you need a simple time counter and [[Timer]] for pausing — without time segmentation.
 *
 * [[include:examples/stopwatch.md]]
 */
export class StopWatch extends Timer {

    private _currentLapPauseTime = 0;
    private _currentLapStartTime?: number;
    private _lapPartials: Time[] = [];

    /** Gets a time that represents the moment the current lap started, or null if the stopwatch is stopped.. */
    public get currentLapStartTime() {

        if (!this._currentLapStartTime) {
            return this.startTime;
        }

        return new Time(this._currentLapStartTime);
    }

    /** Gets the time elapsed since the start of the current lap until now, or null if the stopwatch is stopped. */
    public get currentLapElapsedTime() {

        if (!this._currentLapStartTime) {
            return this.elapsedTime;
        }

        const difference = (this.startTime as Time).subtract(getProcessTime());
        return (this.elapsedTime as Time).subtract(difference);
    }

    /** Gets an array with the total time of each lap (excluding the current). Laps are created using [[endLap]]. */
    public get lapPartials() { return this._lapPartials.slice(); }

    /**
     * Ends the current lap, resetting the stopwatch lap variables to their initial state. Also adds a new lap to
     * [[lapPartials]] with the same time as the result of this method.
     *
     * If the stopwatch is paused the new lap will start paused.
     *
     * @return
     *   The time span from when the current lap started until now.
     * @throws TimerError
     *   When the stopwatch has not yet started.
     */
    public endLap() {

        if (!this.isRunning) {
            throw TimerError.timerHasNotStarted();
        }

        const wasPaused = this.isPaused;

        if (wasPaused) {
            this.resume();
        }

        const currentLapPauseTime = this._currentLapPauseTime;
        const currentTime = getProcessTime();
        const startTime = this.currentLapStartTime as Time;
        const lapTime = new Time(currentTime - startTime.nanoseconds - currentLapPauseTime);
        this._currentLapPauseTime = 0;
        this._currentLapStartTime = currentTime;
        this._lapPartials.push(lapTime);

        if (wasPaused) {
            this.pause();
        }

        return lapTime;
    }

    /**
     * Resumes the stopwatch, recovering the time counting from a [paused](#pause) state.
     *
     * @throws TimerError
     *   When the stopwatch is not paused.
     */
    public resume() {
        const pausedTime = super.resume();
        this._currentLapPauseTime += pausedTime.nanoseconds;

        return pausedTime;
    }

    /**
     * Stops the stopwatch, resetting this instance to its initial state and retrieving the amount of time spent. If the
     * stopwatch is paused, it will be resumed before stopping.
     *
     * @param detail
     *   An optional, non-obstrusive closure that obtains all lap partials (including the last lap) and the error, which
     *   is a difference between the total from the laps and the stopwatch itself (usually merely nanoseconds).
     * @return
     *   The time span from when the stopwatch started until now.
     * @throws TimerError
     *   When the stopwatch is already stopped.
     */
    public stop(detail?: (lapPartials: Time[], error: number) => void) {
        this.endLap();
        const totalTime = super.stop();
        const lapPartials = this._lapPartials;
        this._lapPartials = [];

        let lapsTotalTime = 0;
        for (const lapPartial of lapPartials) {
            lapsTotalTime += lapPartial.nanoseconds;
        }

        if (!detail) {
            return totalTime;
        }

        const error = totalTime.nanoseconds - lapsTotalTime;
        detail(lapPartials, error);

        return totalTime;
    }
}

/**
 * This class represents errors that occur during the operation of [simple timers](../classes/_index_.simpletimer.html),
 * [timers](../classes/_index_.timer.html) and [stopwatches](../classes/_index_.stopwatch.html). It has static methods
 * able to create [[TimerError]] instances with default error messages.
 */
export class TimerError extends Error {

    /** Creates and returns a new [[TimerError]] instance for when the timer has already started. */
    public static timerHasAlreadyStarted() {
        return new TimerError("The timer has already started");
    }

    /** Creates and returns a new [[TimerError]] instance for when the timer has not yet started. */
    public static timerHasNotStarted() {
        return new TimerError("The timer has not yet started");
    }

    /** Creates and returns a new [[TimerError]] instance for when the timer is already paused. */
    public static timerIsAlreadyPaused() {
        return new TimerError("The timer is already paused");
    }

    /** Creates and returns a new [[TimerError]] instance for when the timer is not paused. */
    public static timerIsNotPaused() {
        return new TimerError("The timer is not paused");
    }

    /** Gets a string representation of the [[TimeError]] class, used by the built-in `Object.prototype.toString`. */
    public get [Symbol.toStringTag]() { return "TimerError"; }
}
