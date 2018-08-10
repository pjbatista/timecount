/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { expect } from "chai";
import { BasicTimer } from "../src/utils";
import { TestHelper } from "./helpers";

describe("BasicTimer", () => {

    it("should be created using `constructor`", done => {
        const helper = new TestHelper(done);

        // First testing without auto-start
        let timer = new BasicTimer();

        helper
            .addTest(() => {
                expect(timer.elapsedTime.value).to.equal(0);

                // Then testing with auto-start
                timer = new BasicTimer(true);
            })
            .addTest(() => {
                expect(timer.stop()).to.satisfy(helper.timeAssertion, helper.timeAssertionFail);
            })
            .run();
    });

    it("should `start` and `stop`", done => {
        const helper = new TestHelper(done);
        const timer = new BasicTimer();

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

    it("should throw when attempting to `start` after it already started", () => {
        const timer = new BasicTimer();

        timer.start();
        expect(() => timer.start()).to.throw("The timer has already started");
    });

    it("should throw when attempting to `stop` before it starts", () => {
        const timer = new BasicTimer();

        expect(() => timer.stop()).to.throw("The timer has not yet started");
    });
});
