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

    it("should convert from multiple time units", () => {
        let time = Time.from(1, "second");
        expect(time.nanoseconds).to.equal(1e9);

        time = Time.from(1, "femtosecond");
        expect(time.nanoseconds).to.equal(1e-6);
    });

    it("should convert to multiple time units", () => {
        let time = new Time(1e9);
        expect(time.to("second")).to.equal(1);

        time = new Time(1e6);
        expect(time.to("milisecond")).to.equal(1);

        time = new Time(5);
        expect(time.to("shake")).to.equal(0.5);
    });

    it("should convert time values using plurals and case-insensitive strings", () => {

        expect(Time.from(10, "SeCONd").nanoseconds).to.equal(10000000000);
        expect(Time.from(10, "seconds").nanoseconds).to.equal(10000000000);
        expect(Time.from(10, "SeCoNdS").nanoseconds).to.equal(10000000000);

        expect(Time.from(2, "JiFfY").nanoseconds).to.equal(6e-15);
        expect(Time.from(2, "jiffies").nanoseconds).to.equal(6e-15);
        expect(Time.from(2, "jiFFies").nanoseconds).to.equal(6e-15);

        expect((new Time(10000000000)).to("SeCOnD")).to.equal(10);
        expect((new Time(10000000000)).to("seconds")).to.equal(10);
        expect((new Time(10000000000)).to("SeCoNdS")).to.equal(10);

        expect((new Time(6e-15)).to("JiFfY")).to.equal(2);
        expect((new Time(6e-15)).to("jiffies")).to.equal(2);
        expect((new Time(6e-15)).to("jiFFies")).to.equal(2);
    });

    it("should throw when trying to convert from/to a invalid time unit", () => {

        expect(() => { Time.from(1, "invalidTestUnit"); }).to.throw(Error, "Invalid time unit");
        expect(() => { Time.from(1, { foo: "bar" } as any); }).to.throw(Error, "Invalid time unit");

        expect(() => { (new Time(1)).to("invalidTestUnit"); }).to.throw(Error, "Invalid time unit");
        expect(() => { (new Time(1)).to({ foo: "bar" } as any); }).to.throw(Error, "Invalid time unit");
    });
});
