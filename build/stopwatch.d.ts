/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { TimeSpan } from "./time-utils";
import { Timer, TimerOptions } from "./timer";
export declare class StopWatch extends Timer {
    private _lapEndTimes;
    private _lapIndex;
    private _lapResults;
    private _lapTotalPauseTime;
    readonly lapCount: number;
    readonly lapResults: TimeSpan[];
    constructor(options?: TimerOptions);
    end(): TimeSpan;
    endLap(): TimeSpan;
    resume(): number;
    start(): void;
    private _startLap();
}
