/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */

import {expect} from "chai";
import "mocha";

import {TimeOutput, TimeSpan} from "../src/time-utils";

describe("TimeOutput", () => {

    it("should create default values", () => {
        const output = new TimeOutput();

        expect(output.decimalSeparator).to.equal(".");
        expect(output.precision).to.equal(2);
        expect(output.separateUnitFromNumber).to.equal(true);
        expect(output.verboseUnit).to.equal(false);
    });

    it("should merge defaults with given values", () => {
        let output = new TimeOutput({ decimalSeparator: "," });

        expect(output.decimalSeparator).to.equal(",");
        expect(output.precision).to.equal(2);
        expect(output.separateUnitFromNumber).to.equal(true);
        expect(output.verboseUnit).to.equal(false);

        output = new TimeOutput({ precision: 5 });

        expect(output.decimalSeparator).to.equal(".");
        expect(output.precision).to.equal(5);
        expect(output.separateUnitFromNumber).to.equal(true);
        expect(output.verboseUnit).to.equal(false);

        output = new TimeOutput({ separateUnitFromNumber: false });

        expect(output.decimalSeparator).to.equal(".");
        expect(output.precision).to.equal(2);
        expect(output.separateUnitFromNumber).to.equal(false);
        expect(output.verboseUnit).to.equal(false);

        output = new TimeOutput({ verboseUnit: true });

        expect(output.decimalSeparator).to.equal(".");
        expect(output.precision).to.equal(2);
        expect(output.separateUnitFromNumber).to.equal(true);
        expect(output.verboseUnit).to.equal(true);
    });

    it("should reset to default values", () => {
        const output = new TimeOutput({
            decimalSeparator: "-",
            precision: 9,
            separateUnitFromNumber: false,
            verboseUnit: true,
        });

        expect(output.decimalSeparator).to.equal("-");
        expect(output.precision).to.equal(9);
        expect(output.separateUnitFromNumber).to.equal(false);
        expect(output.verboseUnit).to.equal(true);

        output.reset();

        expect(output.decimalSeparator).to.equal(".");
        expect(output.precision).to.equal(2);
        expect(output.separateUnitFromNumber).to.equal(true);
        expect(output.verboseUnit).to.equal(false);
    });
});

describe("TimeSpan", () => {

    it("should always signalize NaNs", () => {
        const timeSpan = new TimeSpan(NaN);

        expect(timeSpan.toString()).to.equal("NaN");
        expect(timeSpan.toHours()).to.equal("NaN");
        expect(timeSpan.toMinutes()).to.equal("NaN");
        expect(timeSpan.toSeconds()).to.equal("NaN");
        expect(timeSpan.toMiliSeconds()).to.equal("NaN");
        expect(timeSpan.toMicroSeconds()).to.equal("NaN");
        expect(timeSpan.toNanoSeconds()).to.equal("NaN");
    });

    it("should return correct strings using default options", () => {
        let timeSpan = new TimeSpan(3600000000000);

        expect(timeSpan.toString()).to.equal("1.00 h");
        expect(timeSpan.toHours()).to.equal("1.00 h");
        expect(timeSpan.toMinutes()).to.equal("60.00 min");
        expect(timeSpan.toSeconds()).to.equal("3600.00 s");

        timeSpan = new TimeSpan(1000000001);

        expect(timeSpan.toString()).to.equal("1.00 s");
        expect(timeSpan.toSeconds()).to.equal("1.00 s");
        expect(timeSpan.toMiliSeconds()).to.equal("1000.00 ms");
        expect(timeSpan.toMicroSeconds()).to.equal("1000000.00 μs");
        expect(timeSpan.toNanoSeconds()).to.equal("1000000001.00 ns");
    });

    it("should return correct strings using negative numbers", () => {
        let timeSpan = new TimeSpan(-3600000000000);

        expect(timeSpan.toString()).to.equal("-1.00 h");
        expect(timeSpan.toHours()).to.equal("-1.00 h");
        expect(timeSpan.toMinutes()).to.equal("-60.00 min");
        expect(timeSpan.toSeconds()).to.equal("-3600.00 s");

        timeSpan = new TimeSpan(-1000000001);

        expect(timeSpan.toString()).to.equal("-1.00 s");
        expect(timeSpan.toSeconds()).to.equal("-1.00 s");
        expect(timeSpan.toMiliSeconds()).to.equal("-1000.00 ms");
        expect(timeSpan.toMicroSeconds()).to.equal("-1000000.00 μs");
        expect(timeSpan.toNanoSeconds()).to.equal("-1000000001.00 ns");
    });

    it ("should return correct strings changing the decimal separator", () => {

        let timeSpan = new TimeSpan(1, { decimalSeparator: ","} );
        expect(timeSpan.toString()).to.equal("1,00 ns");
        expect(timeSpan.toNanoSeconds()).to.equal("1,00 ns");

        timeSpan = new TimeSpan(1500000000, { decimalSeparator: "-_$!"} );
        expect(timeSpan.toString()).to.equal("1-_$!50 s");
        expect(timeSpan.toSeconds()).to.equal("1-_$!50 s");
    });

    it ("should return correct strings changing the precision", () => {

        let timeSpan = new TimeSpan(1, { precision: 0 });
        expect(timeSpan.toString()).to.equal("1 ns");
        expect(timeSpan.toNanoSeconds()).to.equal("1 ns");

        timeSpan = new TimeSpan(1500000000, { precision: 5 });
        expect(timeSpan.toString()).to.equal("1.50000 s");
        expect(timeSpan.toSeconds()).to.equal("1.50000 s");
    });

    it ("should return correct strings changing the separation of values", () => {

        let timeSpan = new TimeSpan(1, { separateUnitFromNumber: false });
        expect(timeSpan.toString()).to.equal("1.00ns");
        expect(timeSpan.toNanoSeconds()).to.equal("1.00ns");

        timeSpan = new TimeSpan(1500000000, { separateUnitFromNumber: false });
        expect(timeSpan.toString()).to.equal("1.50s");
        expect(timeSpan.toSeconds()).to.equal("1.50s");
    });

    it ("should return correct strings changing to verbose units", () => {

        const timeSpan = new TimeSpan(3600000000000.1, { verboseUnit: true });
        expect(timeSpan.toNanoSeconds()).to.equal("3600000000000.10 nanoseconds");
        expect(timeSpan.toMicroSeconds()).to.equal("3600000000.00 microseconds");
        expect(timeSpan.toMiliSeconds()).to.equal("3600000.00 miliseconds");
        expect(timeSpan.toSeconds()).to.equal("3600.00 seconds");
        expect(timeSpan.toMinutes()).to.equal("60.00 minutes");
        expect(timeSpan.toHours()).to.equal("1.00 hours");
    });

    it ("should return correct strings changing all options", () => {

        const options = {
            decimalSeparator: "-",
            precision: 4,
            separateUnitFromNumber: false,
            verboseUnit: true,
        };

        let timeSpan = new TimeSpan(1, options);

        expect(timeSpan.toNanoSeconds()).to.equal("1-0000nanoseconds");

        timeSpan = new TimeSpan(1500000000, options);
        expect(timeSpan.toSeconds()).to.equal("1-5000seconds");
    });
});
