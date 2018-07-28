/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { expect } from "chai";
import "mocha";
import { Time, TimeWriter } from "../src/index";
import { Locale } from "../src/localization";

describe("TimeWriter", () => {

    it("should be created with or without custom settings", () => {
        let timeWriter = new TimeWriter();
        expect(timeWriter.write(10)).to.equal("10 ns");

        timeWriter = new TimeWriter({ verboseTimeUnit: true });
        expect(timeWriter.write(10)).to.equal("10 nanoseconds");
    });

    it("should parse all Locale settings", () => {
        const timeWriter = new TimeWriter({ verboseTimeUnit: true });

        expect(timeWriter.write(2.1, "yobisecond")).to.equal("2.1 yobiseconds");
        expect(timeWriter.write(20)).to.equal("20 nanoseconds");
        expect(timeWriter.write(1, "year", "day")).to.equal("365.2425 days");
        expect(timeWriter.write(new Time(20))).to.equal("20 nanoseconds");
        expect(timeWriter.write(new Time(20), "shake")).to.equal("2 shakes");
        expect(timeWriter.write(new Time(20), "microsecond")).to.equal("0.02 microsecond");
        expect(timeWriter.write(45, "femtosecond", "attosecond")).to.equal("45000 attoseconds");
        expect(timeWriter.write(20, "second", "milisecond")).to.equal("20000 miliseconds");
        expect(timeWriter.write(0.2)).to.equal("0.2 nanosecond");
        expect(timeWriter.write(Infinity)).to.equal("infinite nanoseconds");
        expect(timeWriter.write(NaN)).to.equal("not-a-number nanosecond");

        Locale.set("pt-br");

        expect(timeWriter.write(2.1, "yobisecond")).to.equal("2,1 yobissegundos");
        expect(timeWriter.write(20)).to.equal("20 nanossegundos");
        expect(timeWriter.write(1, "year", "day")).to.equal("365,2425 dias");
        expect(timeWriter.write(new Time(20))).to.equal("20 nanossegundos");
        expect(timeWriter.write(new Time(20), "shake")).to.equal("2 shakes");
        expect(timeWriter.write(new Time(20), "microsecond")).to.equal("0,02 microssegundo");
        expect(timeWriter.write(45, "femtosecond", "attosecond")).to.equal("45000 attossegundos");
        expect(timeWriter.write(20, "second", "milisecond")).to.equal("20000 milissegundos");
        expect(timeWriter.write(0.2)).to.equal("0,2 nanossegundo");
        expect(timeWriter.write(Infinity)).to.equal("infinitos nanossegundos");
        expect(timeWriter.write(NaN)).to.equal("não-é-um-número nanossegundo");

        Locale.set("en-us");
    });

    it("should parse all custom settings at creation", () => {
        const timeWriter1 = new TimeWriter();
        const timeWriter2 = new TimeWriter({
            decimalSeparator: "-",
            defaultTimeUnit: "second",
            numericNotation: "scientific",
            spaceTimeUnit: false,
            terms: {
                infinite: "foo",
                nan: "bar",
            },
            verboseTimeUnit: true,
        });
        const timeWriter3 = new TimeWriter({
            hideTimeUnit: true,
            numericWriter: value => `test = ${value}`,
        });

        expect(timeWriter1.write(2.1, "yobisecond")).to.equal("2.1 Yis");
        expect(timeWriter2.write(2.1, "yobisecond")).to.equal("2-1e+0yobiseconds");
        expect(timeWriter3.write(2.1, "yobisecond")).to.equal("test = 2.1");

        expect(timeWriter1.write(20)).to.equal("20 ns");
        expect(timeWriter2.write(20)).to.equal("2e+1seconds");
        expect(timeWriter3.write(20)).to.equal("test = 20");

        expect(timeWriter1.write(1, "year", "day")).to.equal("365.2425 days");
        expect(timeWriter2.write(1, "year", "day")).to.equal("3-652425e+2days");
        expect(timeWriter3.write(1, "year", "day")).to.equal("test = 365.2425");

        expect(timeWriter1.write(new Time(20))).to.equal("20 ns");
        expect(timeWriter2.write(new Time(20))).to.equal("2e-8second");
        expect(timeWriter3.write(new Time(20))).to.equal("test = 20");

        expect(timeWriter1.write(new Time(20), "shake")).to.equal("2 shakes");
        expect(timeWriter2.write(new Time(20), "shake")).to.equal("2e+0shakes");
        expect(timeWriter3.write(new Time(20), "shake")).to.equal("test = 2");

        expect(timeWriter1.write(new Time(20), "microsecond")).to.equal("0.02 µs");
        expect(timeWriter2.write(new Time(20), "microsecond")).to.equal("2e-2microsecond");
        expect(timeWriter3.write(new Time(20), "microsecond")).to.equal("test = 0.02");

        expect(timeWriter1.write(45, "femtosecond", "attosecond")).to.equal("45000 as");
        expect(timeWriter2.write(45, "femtosecond", "attosecond")).to.equal("4-5e+4attoseconds");
        expect(timeWriter3.write(45, "femtosecond", "attosecond")).to.equal("test = 45000");

        expect(timeWriter1.write(20, "second", "milisecond")).to.equal("20000 ms");
        expect(timeWriter2.write(20, "second", "milisecond")).to.equal("2e+4miliseconds");
        expect(timeWriter3.write(20, "second", "milisecond")).to.equal("test = 20000");

        expect(timeWriter1.write(20)).to.equal("20 ns");
        expect(timeWriter2.write(20)).to.equal("2e+1seconds");
        expect(timeWriter3.write(20)).to.equal("test = 20");

        expect(timeWriter1.write(Infinity)).to.equal("infinite ns");
        expect(timeWriter2.write(Infinity)).to.equal("fooseconds");
        expect(timeWriter3.write(Infinity)).to.equal("test = Infinity");

        expect(timeWriter1.write(NaN)).to.equal("not-a-number ns");
        expect(timeWriter2.write(NaN)).to.equal("barsecond");
        expect(timeWriter3.write(NaN)).to.equal("test = NaN");
    });

    it("should parse all custom settings after creation", () => {

        const timeWriter = new TimeWriter();
        expect(timeWriter.write(10.6, "svedberg")).to.equal("10.6 Sv");

        timeWriter.settings.decimalSeparator = "o";
        expect(timeWriter.write(10.6, "svedberg")).to.equal("10o6 Sv");

        timeWriter.settings.defaultTimeUnit = "svedberg";
        expect(timeWriter.write(10.6)).to.equal("10o6 Sv");

        timeWriter.settings.fractionDigits = 4;
        expect(timeWriter.write(10.6)).to.equal("10o6000 Sv");

        timeWriter.settings.terms = { infinite: "∞" };
        expect(timeWriter.write(Infinity)).to.equal("∞ Sv");

        timeWriter.settings.terms.nan = "-";
        expect(timeWriter.write(NaN)).to.equal("- Sv");

        timeWriter.settings.numericNotation = "roman";
        expect(timeWriter.write(10.6)).to.equal("X Sv");

        timeWriter.settings.spaceTimeUnit = false;
        expect(timeWriter.write(10.6)).to.equal("XSv");

        timeWriter.settings.verboseTimeUnit = true;
        expect(timeWriter.write(10.6)).to.equal("Xsvedbergs");

        timeWriter.settings.hideTimeUnit = true;
        expect(timeWriter.write(10.6)).to.equal("X");

        timeWriter.settings.numericWriter = value => (value * 10).toString();
        expect(timeWriter.write(10.6)).to.equal("106");

    });

    it("should parse all `write` parameter custom settings", () => {
        const timeWriter = new TimeWriter();

        expect(timeWriter.write(2.1, "second")).to.equal("2.1 s");
        expect(timeWriter.write(2.1, "second", { decimalSeparator: "-" })).to.equal("2-1 s");

        expect(timeWriter.write(20)).to.equal("20 ns");
        expect(timeWriter.write(20, { defaultTimeUnit: "yottasecond" })).to.equal("20 Ys");

        expect(timeWriter.write(1, "year", "day")).to.equal("365.2425 days");
        expect(timeWriter.write(1, "year", "day", { hideTimeUnit: true })).to.equal("365.2425");

        expect(timeWriter.write(new Time(20))).to.equal("20 ns");
        expect(timeWriter.write(new Time(20), { numericNotation: "scientific" })).to.equal("2e+1 ns");

        expect(timeWriter.write(new Time(20), "shake")).to.equal("2 shakes");
        expect(timeWriter.write(new Time(20), "shake", { numericNotation: "roman" })).to.equal("II shakes");

        expect(timeWriter.write(new Time(20), "microsecond")).to.equal("0.02 µs");
        expect(timeWriter.write(new Time(20), "microsecond", { numericNotation: "roman-fractions" })).to.equal("Ɔ µs");

        expect(timeWriter.write(Infinity)).to.equal("infinite ns");
        expect(timeWriter.write(Infinity, { terms: { infinite: "inf" } })).to.equal("inf ns");

        expect(timeWriter.write(NaN)).to.equal("not-a-number ns");
        expect(timeWriter.write(NaN, { terms: { nan: "x" } })).to.equal("x ns");

        expect(timeWriter.write(45, "femtosecond", "attosecond")).to.equal("45000 as");
        expect(timeWriter.write(45, "femtosecond", "attosecond", { numericWriter: () => "test" })).to.equal("test as");

        expect(timeWriter.write(20, "second", "milisecond")).to.equal("20000 ms");
        expect(timeWriter.write(20, "second", "milisecond", { spaceTimeUnit: false })).to.equal("20000ms");

        expect(timeWriter.write(20)).to.equal("20 ns");
        expect(timeWriter.write(20, { verboseTimeUnit: true })).to.equal("20 nanoseconds");

    });

    it("should overwrite settings in the correct order", () => {
        const timeWriter = new TimeWriter();

        expect(timeWriter.write(1.5, "tropicalYear")).to.equal("1.5 tropical years");

        Locale.set("pt-br");

        expect(timeWriter.write(1.5, "tropicalYear")).to.equal("1,5 anos tropicais");

        timeWriter.settings.decimalSeparator = ".";

        expect(timeWriter.write(1.5, "tropicalYear")).to.equal("1.5 anos tropicais");

        expect(timeWriter.write(1.5, "tropicalYear", { decimalSeparator: "-" })).to.equal("1-5 anos tropicais");
    });
});
