/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { expect } from "chai";
import "mocha";
import { Time } from "../src/index";

describe("Time", () => {

    it("should be created from nanosecond-based values", () => {
        let time = new Time(10.62626);
        expect(time.nanoseconds).to.equal(10.62626);

        time = new Time(-10.62626);
        expect(time.nanoseconds).to.equal(10.62626);

        time = new Time({ nanoseconds: 10.62626 });
        expect(time.nanoseconds).to.equal(10.62626);

        time = new Time({ nanoseconds: -10.62626 });
        expect(time.nanoseconds).to.equal(10.62626);

        time = new Time(Infinity);
        expect(time.nanoseconds).to.equal(Infinity);

        time = new Time(-Infinity);
        expect(time.nanoseconds).to.equal(Infinity);

        time = new Time(NaN);
        expect(time.nanoseconds).to.be.NaN;

        time = new Time(-NaN);
        expect(time.nanoseconds).to.be.NaN;
    });

    it("should convert `from` (static)", () => {
        let time = Time.from(1, "second");
        expect(time.nanoseconds).to.equal(1e9);

        time = Time.from(1, "femtosecond");
        expect(time.nanoseconds).to.equal(1e-6);
    });

    it("should convert `to`", () => {
        let time = new Time(1e9);
        expect(time.to("second")).to.equal(1);

        time = new Time(1e6);
        expect(time.to("milisecond")).to.equal(1);

        time = new Time(5);
        expect(time.to("shake")).to.equal(0.5);
    });
});
