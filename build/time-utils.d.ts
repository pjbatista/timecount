/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
export declare enum TimeDivisor {
    Hours = 3600000000000,
    MicroSeconds = 1000,
    MiliSeconds = 1000000,
    Minutes = 60000000000,
    NanoSeconds = 1,
    Seconds = 1000000000,
}
export declare enum TimeFormat {
    Hours = "h",
    MicroSeconds = "\u03BCs",
    MiliSeconds = "ms",
    Minutes = "min",
    NanoSeconds = "ns",
    Seconds = "s",
}
export declare class TimeOutput implements TimeOutputOptions {
    private _decimalSeparator;
    private _precision;
    private _separateUnitFromNumber;
    private _verboseUnit;
    decimalSeparator: string;
    precision: number;
    separateUnitFromNumber: boolean;
    verboseUnit: boolean;
    constructor(options?: TimeOutputOptions);
    reset(): void;
}
export interface TimeOutputOptions {
    decimalSeparator?: string;
    precision?: number;
    separateUnitFromNumber?: boolean;
    verboseUnit?: boolean;
}
export declare class TimeSpan implements TimeTransformer {
    private _output;
    private _value;
    readonly output: TimeOutput;
    readonly value: number;
    constructor(value: number, outputOptions?: TimeOutputOptions);
    toHours(): string;
    toMicroSeconds(): string;
    toMiliSeconds(): string;
    toMinutes(): string;
    toNanoSeconds(): string;
    toSeconds(): string;
    toString(): string;
    private _formatOutput(calculatedValue, format);
}
export interface TimeTransformer {
    toHours(): string;
    toMicroSeconds(): string;
    toMiliSeconds(): string;
    toMinutes(): string;
    toNanoSeconds(): string;
    toSeconds(): string;
    toString(): string;
}
export declare class TimeUtil {
    static getPreciseTime(): number;
    private constructor();
}
