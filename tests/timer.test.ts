/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { expect } from "chai";
import { Suite } from "mocha";
import { Time } from "../src";
import { Timer, TimerError } from "../src/utils";

const timeout = 66;
const lowerBound = timeout - 20;
const upperBound = timeout + 20;

const testTimeout = (closure: (... args: any[]) => void) => setTimeout(closure, timeout);

describe("Timer", function(this: Suite) {

    this.timeout(1000);

    it("should count time somewhat precisely", done => {
        const timer = new Timer();
        timer.start();

        testTimeout(() => {
            const time = timer.stop().to("milisecond");

            expect(time).to.be.gte(lowerBound);
            expect(time).to.be.lte(upperBound);
            done();
        });
    });

    it("should be created with and without auto-start", done => {
        let timer = new Timer();
        expect(timer.isRunning).to.equal(false);

        timer.start();

        testTimeout(() => {
            let time = timer.stop().to("milisecond");
            expect(time).to.be.gte(lowerBound);
            expect(time).to.be.lte(upperBound);

            timer = new Timer(true);
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
        const timer = new Timer();
        timer.start();

        testTimeout(() => {
            timer.stop();
            expect(timer.elapsedTime).to.equal(null);
            expect(timer.isRunning).to.equal(false);

            done();
        });
    });

    it("should throw when trying to start after it already started", () => {
        const timer = new Timer();
        timer.start();

        expect(() => { timer.start(); }).to.throw(TimerError, "The timer has already started");
    });

    it("should throw when trying to stop before it starts", () => {
        const timer = new Timer();
        expect(() => { timer.stop(); }).to.throw(TimerError, "The timer has not yet started");
    });

    it("should pause and account for paused time", done => {
        const timer = new Timer(true);

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
        const timer = new Timer();
        expect(() => { timer.pause(); }).to.throw(TimerError, "The timer has not yet started");
    });

    it("should throw when trying to pause and it is already paused", () => {
        const timer = new Timer();
        timer.start();
        timer.pause();

        expect(() => { timer.pause(); }).to.throw(TimerError, "The timer is already paused");
    });

    it("should throw when trying to resume before it is paused", () => {
        const timer = new Timer();

        expect(() => { timer.resume(); }).to.throw(TimerError, "The timer is not paused");

        timer.start();
        expect(() => { timer.resume(); }).to.throw(TimerError, "The timer is not paused");
    });
});
