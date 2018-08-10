/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { expect } from "chai";
import { StopWatch } from "../src/utils";
import { TestHelper } from "./helpers";

describe("StopWatch", () => {

    it("should be created using `constructor`", done => {
        const helper = new TestHelper(done);

        // First testing without auto-start
        let stopwatch = new StopWatch();

        helper
            .addTest(() => {
                expect(stopwatch.elapsedTime.value).to.equal(0);

                // Then testing with auto-start
                stopwatch = new StopWatch(true);
            })
            .addTest(() => {
                expect(stopwatch.stop()).to.satisfy(helper.timeAssertion, helper.timeAssertionFail);
            })
            .run();
    });

    it("should `start` and `stop`", done => {
        const helper = new TestHelper(done);
        const stopwatch = new StopWatch();

        helper
            .addTest(() => {
                expect(stopwatch.elapsedTime.value).to.equal(0);
                stopwatch.start();
            })
            .addTest(() => {
                expect(stopwatch.stop()).to.satisfy(helper.timeAssertion, helper.timeAssertionFail);
            })
            .run();
    });

    it("should `pause` and `resume`", done => {
        const helper = new TestHelper(done);
        const stopwatch = new StopWatch(true);

        helper
            .addTest(() => {
                expect(stopwatch.elapsedTime).to.satisfy(helper.timeAssertion, helper.timeAssertionFail);
                stopwatch.pause();
            })
            .addTest(() => {
                expect(stopwatch.elapsedPauseTime).to.satisfy(helper.timeAssertion, helper.timeAssertionFail);
                stopwatch.resume();
            })
            .addTest(() => {
                expect(stopwatch.stop()).to.satisfy(helper.timeAssertionDouble, helper.timeAssertionFail);
            })
            .run();
    });

    it("should `endLap` while not paused", done => {
        const helper = new TestHelper(done);
        const stopwatch = new StopWatch(true);

        helper
            .addTest(() => {
                expect(stopwatch.endLap()).to.satisfy(helper.timeAssertion, helper.timeAssertionFail);
            })
            .addTest(() => {
                expect(stopwatch.endLap()).to.satisfy(helper.timeAssertion, helper.timeAssertionFail);
            })
            .addTest(() => {
                expect(stopwatch.stop((detail, error) => {
                    expect(detail.length).to.equal(3);
                    expect(error).to.be.lte(3000000);
                })).to.satisfy(helper.timeAssertionTriple, helper.timeAssertionFail);
            })
            .run();
    });

    it("should `endLap` while paused, also pausing the new lap", done => {
        const helper = new TestHelper(done);
        const stopwatch = new StopWatch(true);

        helper
            .addTest(() => {
                expect(stopwatch.elapsedPauseTime.value).to.equal(0);
                expect(stopwatch.elapsedTime).to.satisfy(helper.timeAssertion, helper.timeAssertionFail);
                stopwatch.pause();
            })
            .addTest(() => {
                expect(stopwatch.elapsedPauseTime).to.satisfy(helper.timeAssertion, helper.timeAssertionFail);
                expect(stopwatch.endLap()).to.satisfy(helper.timeAssertion, helper.timeAssertionFail);

                expect(stopwatch.endLap().value).to.equal(0);
                stopwatch.resume();
            })
            .addTest(() => {
                expect(stopwatch.endLap()).to.satisfy(helper.timeAssertion, helper.timeAssertionFail);
                expect(stopwatch.stop((detail, error) => {
                    expect(detail.length).to.equal(4);
                    expect(error).to.be.lte(3000000);
                })).to.satisfy(helper.timeAssertionTriple, helper.timeAssertionFail);
            })
            .run();
    });

    it("should throw when attempting to `start` after it already started", () => {
        const stopwatch = new StopWatch();

        stopwatch.start();
        expect(() => stopwatch.start()).to.throw("The stopwatch has already started");
    });

    it("should throw when attempting to `stop` before it starts", () => {
        const stopwatch = new StopWatch();

        expect(() => stopwatch.stop()).to.throw("The stopwatch has not yet started");
    });

    it("should throw when attempting to `pause` before it starts", () => {
        const stopwatch = new StopWatch();

        expect(() => stopwatch.pause()).to.throw("The stopwatch has not yet started");
    });

    it("should throw when attempting to `pause` after it is already paused", () => {
        const stopwatch = new StopWatch(true);

        stopwatch.pause();
        expect(() => stopwatch.pause()).to.throw("The stopwatch is already paused");
    });

    it("should throw when attempting to `resume` before it starts or is paused", () => {
        const stopwatch = new StopWatch();

        expect(() => stopwatch.resume()).to.throw("The stopwatch has not yet started");

        stopwatch.start();
        expect(() => stopwatch.resume()).to.throw("The stopwatch is not paused");
    });

    it("should throw when attempting to `endLap` before it starts", () => {
        const stopwatch = new StopWatch();

        expect(() => stopwatch.endLap()).to.throw("The stopwatch has not yet started");
    });

});
