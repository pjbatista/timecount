/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { expect } from "chai";
import { Suite } from "mocha";
import { Time } from "../src";
import { StopWatch, TimerError } from "../src/utils";

const timeout = 41;
const lowerBound = timeout - 20;
const upperBound = timeout + 20;

const testTimeout = (closure: (... args: any[]) => void) => setTimeout(closure, timeout);

describe("StopWatch", function(this: Suite) {

    this.timeout(5000);

    it("should count time somewhat precisely", done => {
        const stopwatch = new StopWatch();
        stopwatch.start();

        testTimeout(() => {
            const time = stopwatch.stop().to("milisecond");

            expect(time).to.be.gte(lowerBound);
            expect(time).to.be.lte(upperBound);
            done();
        });
    });

    it("should be created with and without auto-start", done => {
        let stopwatch = new StopWatch();
        expect(stopwatch.isRunning).to.equal(false);

        stopwatch.start();

        testTimeout(() => {
            let time = stopwatch.stop().to("milisecond");
            expect(time).to.be.gte(lowerBound);
            expect(time).to.be.lte(upperBound);

            stopwatch = new StopWatch(true);
            expect(stopwatch.isRunning).to.equal(true);

            testTimeout(() => {
                time = stopwatch.stop().to("milisecond");
                expect(time).to.be.gte(lowerBound);
                expect(time).to.be.lte(upperBound);

                done();
            });
        });
    });

    it("should reset its state after stopping", done => {
        const stopwatch = new StopWatch();
        stopwatch.start();

        testTimeout(() => {
            stopwatch.stop();
            expect(stopwatch.elapsedTime).to.equal(null);
            expect(stopwatch.isRunning).to.equal(false);

            done();
        });
    });

    it("should throw when trying to start after it already started", () => {
        const stopwatch = new StopWatch();
        stopwatch.start();

        expect(() => { stopwatch.start(); }).to.throw(TimerError, "The timer has already started");
    });

    it("should throw when trying to stop before it starts", () => {
        const stopwatch = new StopWatch();
        expect(() => { stopwatch.stop(); }).to.throw(TimerError, "The timer has not yet started");
    });

    it("should pause and account for paused time", done => {
        const timer = new StopWatch(true);

        testTimeout(() => {
            timer.pause();
            let time = (timer.elapsedTime as Time).to("milisecond");

            expect(timer.isPaused).to.equal(true);
            expect(time).to.be.gte(lowerBound);
            expect(time).to.be.lte(upperBound);

            testTimeout(() => {
                time = (timer.elapsedTime as Time).to("milisecond");

                expect(timer.isPaused).to.equal(true);
                expect(time).to.be.gte(lowerBound);
                expect(time).to.be.lte(upperBound);

                timer.resume();
                expect(timer.isPaused).to.equal(false);

                testTimeout(() => {
                    time = timer.stop().to("milisecond");

                    expect(time).to.be.gte(lowerBound * 2);
                    expect(time).to.be.lte(upperBound * 2);

                    done();
                });
            });
        });

    });

    it("should throw when trying to pause before it starts", () => {
        const stopwatch = new StopWatch();
        expect(() => { stopwatch.pause(); }).to.throw(TimerError, "The timer has not yet started");
    });

    it("should throw when trying to pause and it is already paused", () => {
        const stopwatch = new StopWatch();
        stopwatch.start();
        stopwatch.pause();

        expect(() => { stopwatch.pause(); }).to.throw(TimerError, "The timer is already paused");
    });

    it("should throw when trying to resume before it is paused", () => {
        const stopwatch = new StopWatch();

        expect(() => { stopwatch.resume(); }).to.throw(TimerError, "The timer is not paused");

        stopwatch.start();
        expect(() => { stopwatch.resume(); }).to.throw(TimerError, "The timer is not paused");
    });

    it("should end laps and count their times somewhat precisely", done => {
        const stopwatch = new StopWatch(true);

        testTimeout(() => {
            let time = stopwatch.endLap().to("milisecond");

            expect(time).to.be.gte(lowerBound);
            expect(time).to.be.lte(upperBound);

            testTimeout(() => {
                time = stopwatch.endLap().to("milisecond");

                expect(time).to.be.gte(lowerBound);
                expect(time).to.be.lte(upperBound);

                time = stopwatch.stop().to("milisecond");

                expect(time).to.be.gte(lowerBound * 2);
                expect(time).to.be.lte(upperBound * 2);

                done();
            });
        });
    });

    it("should pause during laps and account for the paused time", done => {
        const stopwatch = new StopWatch();
        stopwatch.start();

        testTimeout(() => {
            stopwatch.pause();
            let time = (stopwatch.currentLapElapsedTime as Time).to("milisecond");

            expect(time).to.be.gte(lowerBound);
            expect(time).to.be.lte(upperBound);

            testTimeout(() => {
                time = (stopwatch.currentLapElapsedTime as Time).to("milisecond");

                expect(time).to.be.gte(lowerBound);
                expect(time).to.be.lte(upperBound);

                stopwatch.resume();
                time = stopwatch.endLap().to("milisecond");

                expect(time).to.be.gte(lowerBound);
                expect(time).to.be.lte(upperBound);

                testTimeout(() => {
                    stopwatch.pause();
                    time = (stopwatch.currentLapElapsedTime as Time).to("milisecond");

                    expect(time).to.be.gte(lowerBound);
                    expect(time).to.be.lte(upperBound);

                    time = stopwatch.stop().to("milisecond");

                    expect(time).to.be.gte(lowerBound * 2);
                    expect(time).to.be.lte(upperBound * 2);

                    done();
                });
            });
        });
    });

    it("should start a new lap paused if it was already paused", done => {
        const stopwatch = new StopWatch(true);

        testTimeout(() => {
            stopwatch.pause();
            let time = (stopwatch.currentLapElapsedTime as Time).to("milisecond");

            expect(time).to.be.gte(lowerBound);
            expect(time).to.be.lte(upperBound);

            stopwatch.endLap();
            expect(stopwatch.isPaused).to.equal(true);

            testTimeout(() => {
                time = stopwatch.endLap().to("milisecond");

                // 10 milisecond leniency
                expect(time).to.be.lte(10);

                time = stopwatch.stop().to("milisecond");
                expect(time).to.be.gte(lowerBound + 10);
                expect(time).to.be.lte(upperBound + 10);

                done();
            });
        });
    });

    it("should throw when trying to end the lap before it starts", () => {
        const stopwatch = new StopWatch();
        expect(() => { stopwatch.endLap(); }).to.throw(TimerError, "The timer has not yet started");
    });
});
