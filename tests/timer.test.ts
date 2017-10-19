/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */

import {expect} from "chai";
import "mocha";

import {Timer} from "../src/timer";

describe("Timer", () => {

    it("should assign options to result correctly", () => {
        const timer = new Timer({
            autoStart: true,
            decimalSeparator: ",",
            precision: 0,
            separateUnitFromNumber: false,
            verboseUnit: true,
        });

        timer.end();
        expect(timer.result.output.decimalSeparator).to.equal(",");
        expect(timer.result.output.precision).to.equal(0);
        expect(timer.result.output.separateUnitFromNumber).to.equal(false);
        expect(timer.result.output.verboseUnit).to.equal(true);
    });

    it("should auto-start properly", () => {
        let timer = new Timer({ autoStart: false });
        expect(timer.started).to.equal(false);

        timer = new Timer();
        expect(timer.started).to.equal(false);

        timer = new Timer({ autoStart: true });
        expect(timer.started).to.equal(true);
    });

    it("should pause and resume properly", done => {
        const timer1 = new Timer();
        const timer2 = new Timer();

        timer1.start();
        timer2.start();

        timer1.pause();

        setTimeout(() => {
            timer1.resume();

            timer1.end();
            timer2.end();

            expect(timer2.result.value).to.be.greaterThan(timer1.result.value);
            done();
        }, 1);
    });

    it("should time one second somewhat precisely", done => {
        const timer = new Timer({ precision: 0 });
        timer.start();

        setTimeout(() => {
            timer.end();

            // Accept either "1 s" or "1000 ms", since values slight lesser than one second will
            // approximate to the later

            expect(timer.result.toString()).to.satisfy((result: string) => {
                return result === "1 s" || result === "1000 ms";
            });
            done();
        }, 1000);
    });

    it("should time pauses correctly", done => {
        const timer = new Timer();
        timer.start();
        timer.pause();

        setTimeout(() => {
            timer.resume();
            timer.end();

            const result = timer.result;
            const resultWithPause = timer.getTimeIncludingPaused();

            expect(result.value).to.lessThan(resultWithPause.value);
            done();
        }, 10);
    });
});
