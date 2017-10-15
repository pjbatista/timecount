/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */

import {expect} from "chai";
import "mocha";

import {StopWatch} from "../src/stopwatch";

describe("StopWatch", function(this: Mocha) {

    this.timeout(5000);

    it("should assign options to results correctly", () => {

        const stopwatch = new StopWatch({
            autoStart: true,
            decimalSeparator: ",",
            precision: 0,
            separateUnitFromNumber: false,
            verboseUnit: true,
        });

        const resultLap = stopwatch.endLap();

        expect(resultLap.output.decimalSeparator).to.equal(",");
        expect(resultLap.output.precision).to.equal(0);
        expect(resultLap.output.separateUnitFromNumber).to.equal(false);
        expect(resultLap.output.verboseUnit).to.equal(true);
    });

    it("should count laps properly", () => {

        const stopwatch = new StopWatch();
        stopwatch.start();

        stopwatch.endLap();
        stopwatch.endLap();
        stopwatch.endLap();
        stopwatch.endLap();

        stopwatch.end();

        expect(stopwatch.lapCount).to.equal(5);
    });

    it("should time 3 one second laps somewhat precisely", done => {

        const stopwatch = new StopWatch({ precision: 0});
        stopwatch.start();
        let count = 0;

        const almostDone = () => {
            stopwatch.end();
            done();
        };

        const interval = setInterval(() => {

            if (++count === 3) {
                clearInterval(interval);
                almostDone();
                return;
            }

            stopwatch.endLap();
            expect(stopwatch.lapResults[count - 1].toString()).to.satisfy((result: string) => {
                return result === "1 s" || result === "1000 ms";
            });
        }, 1000);
    });
} as any);
