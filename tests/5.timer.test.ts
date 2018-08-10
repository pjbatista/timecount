/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { expect } from "chai";
import { Timer } from "../src/utils";
import { TestHelper } from "./helpers";

describe("StopWatch", () => {

    it("should be created using `constructor`", done => {
        const helper = new TestHelper(done);

        // First testing without auto-start
        let timer = new Timer();

        helper
            .addTest(() => {
                expect(timer.elapsedTime.value).to.equal(0);

                // Then testing with auto-start
                timer = new Timer(true);
            })
            .addTest(() => {
                expect(timer.stop()).to.satisfy(helper.timeAssertion, helper.timeAssertionFail);
            })
            .run();
    });

    it("should `start` and `stop`", done => {
        const helper = new TestHelper(done);
        const timer = new Timer();

        helper
            .addTest(() => {
                expect(timer.elapsedTime.value).to.equal(0);
                timer.start();
            })
            .addTest(() => {
                expect(timer.stop()).to.satisfy(helper.timeAssertion, helper.timeAssertionFail);
            })
            .run();
    });

    it("should `pause` and `resume`", done => {
        const helper = new TestHelper(done);
        const timer = new Timer(true);

        helper
            .addTest(() => {
                expect(timer.elapsedTime).to.satisfy(helper.timeAssertion, helper.timeAssertionFail);
                timer.pause();
            })
            .addTest(() => {
                expect(timer.elapsedPauseTime).to.satisfy(helper.timeAssertion, helper.timeAssertionFail);
                timer.resume();
            })
            .addTest(() => {
                expect(timer.stop()).to.satisfy(helper.timeAssertionTriple, helper.timeAssertionFail);
            })
            .run();
    });

    it("should throw when attempting to `start` after it already started", () => {
        const timer = new Timer();

        timer.start();
        expect(() => timer.start()).to.throw("The timer has already started");
    });

    it("should throw when attempting to `stop` before it starts", () => {
        const timer = new Timer();

        expect(() => timer.stop()).to.throw("The timer has not yet started");
    });

    it("should throw when attempting to `pause` before it starts", () => {
        const timer = new Timer();

        expect(() => timer.pause()).to.throw("The timer has not yet started");
    });

    it("should throw when attempting to `pause` after it is already paused", () => {
        const timer = new Timer(true);

        timer.pause();
        expect(() => timer.pause()).to.throw("The timer is already paused");
    });

    it("should throw when attempting to `resume` before it starts or is paused", () => {
        const timer = new Timer();

        expect(() => timer.resume()).to.throw("The timer has not yet started");

        timer.start();
        expect(() => timer.resume()).to.throw("The timer is not paused");
    });
});
