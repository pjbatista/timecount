/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { TimeOutputOptions, TimeSpan } from "./time-utils";
export interface TimerOptions extends TimeOutputOptions {
    autoStart?: boolean;
}
export declare class Timer {
    private _end;
    private _pauseEnd;
    private _pauseStart;
    private _options;
    private _result;
    private _start;
    private _totalPauseTime;
    readonly ended: boolean;
    readonly endTime: number;
    readonly lastResumeTime: number;
    readonly options: TimeOutputOptions;
    readonly paused: boolean;
    readonly result: TimeSpan;
    readonly totalPauseTime: number;
    readonly started: boolean;
    readonly startTime: number;
    constructor(options?: TimerOptions);
    end(): TimeSpan;
    pause(): void;
    resume(): number;
    start(): void;
}
