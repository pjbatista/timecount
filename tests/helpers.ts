/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { Time } from "../src";

type Test = () => void;

function randomTimeout() {
    return Math.round(Math.random() * 100 + 1);
}

const lowerCoefficient = 0.1;
const milisecondFactor = 1000000;
const upperLimit = 100000000;

export class TestHelper {

    private _current: number;
    private _done: Mocha.Done;
    private _tests: Test[];
    private _timeout: number;

    public get timeAssertion() {
        return (time: Time) =>
            time.bigValue.greaterThanOrEqualTo(this._timeout * milisecondFactor * lowerCoefficient) &&
            time.bigValue.lessThanOrEqualTo(this._timeout * milisecondFactor + upperLimit);
    }

    public get timeAssertionDouble() {
        return (time: Time) =>
            time.bigValue.greaterThanOrEqualTo(this._timeout * milisecondFactor * lowerCoefficient / 2) &&
            time.bigValue.lessThanOrEqualTo(this._timeout * milisecondFactor * 2 + upperLimit * 2);
    }

    public get timeAssertionTriple() {
        return (time: Time) =>
            time.bigValue.greaterThanOrEqualTo(this._timeout * milisecondFactor * lowerCoefficient / 3) &&
            time.bigValue.lessThanOrEqualTo(this._timeout * milisecondFactor * 3 + upperLimit * 3);
    }

    public get timeAssertionFail() {
        return `Time failed to be within acceptable range for ${this._timeout} ms`;
    }

    public constructor(done: Mocha.Done, timeout?: number) {
        this._current = 0;
        this._done = done;
        this._tests = [];
        this._timeout = timeout || randomTimeout();
    }

    public addTest(test: Test) {
        this._tests.push(test);
        return this;
    }

    public run() {
        this._runNext();
    }

    private _runNext() {

        if (this._current === this._tests.length) {
            this._current = 0;
            this._tests = [];

            this._done();
            return;
        }

        setTimeout(() => {
            this._tests[this._current]();
            this._current += 1;
            this._runNext();
        }, this._timeout);
    }
}
