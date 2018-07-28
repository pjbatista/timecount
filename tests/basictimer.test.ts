/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { expect } from "chai";
import { Suite } from "mocha";
import { BasicTimer, TimerError } from "../src/utils";

const timeout = 107;
const lowerBound = timeout - 20;
const upperBound = timeout + 20;

const testTimeout = (closure: (... args: any[]) => void) => setTimeout(closure, timeout);

describe("BasicTimer", function(this: Suite) {

    this.timeout(1000);

    it("should count time somewhat precisely", done => {
        const timer = new BasicTimer();
        timer.start();

        testTimeout(() => {
            const time = timer.stop().to("milisecond");

            expect(time).to.be.gte(lowerBound);
            expect(time).to.be.lte(upperBound);
            done();
        });
    });

    it("should be created with and without auto-start", done => {
        let timer = new BasicTimer();
        expect(timer.isRunning).to.equal(false);

        timer.start();

        testTimeout(() => {
            let time = timer.stop().to("milisecond");
            expect(time).to.be.gte(lowerBound);
            expect(time).to.be.lte(upperBound);

            timer = new BasicTimer(true);
            expect(timer.isRunning).to.equal(true);

            testTimeout(() => {
                time = timer.stop().to("milisecond");
                expect(time).to.be.gte(lowerBound);
                expect(time).to.be.lte(upperBound);

                done();
            });
        });
    });

    it("should reset its state after stopping", done => {
        const timer = new BasicTimer();
        timer.start();

        testTimeout(() => {
            timer.stop();
            expect(timer.isRunning).to.equal(false);
            expect(() => { timer.stop(); }).to.throw(TimerError, "The timer has not yet started");

            done();
        });
    });

    it("should throw when trying to start after it already started", () => {
        const timer = new BasicTimer();
        timer.start();

        expect(() => { timer.start(); }).to.throw(TimerError, "The timer has already started");
    });

    it("should throw when trying to stop before it starts", () => {
        const timer = new BasicTimer();
        expect(() => { timer.stop(); }).to.throw(TimerError, "The timer has not yet started");
    });
});
