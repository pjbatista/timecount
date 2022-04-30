/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { expect } from "chai";
import Decimal from "decimal.js";
import { RoundingMode, Time, TimeSegments, TimeWriter } from "../src";
import { Locale } from "../src/localization";

// const Test_TimeWriter: any = TimeWriter;

describe("TimeWriter", () => {

    it("should be created using `constructor`", () => {
        let timeWriter = new TimeWriter();
        expect(timeWriter.settings).to.deep.equal({});

        timeWriter = new TimeWriter({});
        expect(timeWriter.settings).to.deep.equal({});

        timeWriter = new TimeWriter({ verbose: true });
        expect(timeWriter.settings).to.deep.equal({ verbose: true });
    });

    it("should `write` using parameters from all overloads", () => {
        const timeWriter = new TimeWriter();

        // Time object, no conversion
        let result = timeWriter.write(new Time(10));
        expect(result).to.equal("10 ns");

        // Time object with special number `Infinity`, no conversion
        result = timeWriter.write(new Time(Infinity));
        expect(result).to.equal("∞ ns");

        // Time object, converted "to"
        result = timeWriter.write(new Time(10), "second");
        expect(result).to.equal("0.00000001 s");

        // Time object with special number `NaN`, no conversion
        result = timeWriter.write(new Time(NaN));
        expect(result).to.equal("NaN ns");

        // Time object, converted "to" approximated time unit
        result = timeWriter.write(new Time(10), "siderealSecond");
        expect(result).to.equal("≈0.000000010027379155 sidereal second");

        // Time object, converted "to" approximated time unit, verbose
        result = timeWriter.write(new Time(10), "siderealSecond", { verbose: true });
        expect(result).to.equal("approximately 0.000000010027379155 sidereal second");

        // Time value, no conversion
        result = timeWriter.write(10);
        expect(result).to.equal("10 ns");

        // Time value with special number `NaN`, no conversion
        result = timeWriter.write(NaN);
        expect(result).to.equal("NaN ns");

        // Time value with special number `Infinity`, no conversion
        result = timeWriter.write(Infinity);
        expect(result).to.equal("∞ ns");

        // Time value, no conversion but with default time unit
        result = timeWriter.write(0.01, { defaultTimeUnit: "second" });
        expect(result).to.equal("0.01 s");

        // Time value, converted "from" and "to"
        result = timeWriter.write(10, "minute");
        expect(result).to.equal("10 min");

        // Time value with forced approximation, converted "from" and "to"
        result = timeWriter.write(Time.from(10, "minute").approximate(), "minute");
        expect(result).to.equal("≈10 min");

        // Time value, converted "from" and "to" different time units
        result = timeWriter.write(10, "minute", "siderealMinute");
        expect(result).to.equal("≈10.0273791553 sidereal minutes");

        // Time value, converted "from" and "to" different time units, verbose
        result = timeWriter.write(10, "minute", "siderealMinute", { verbose: true });
        expect(result).to.equal("approximately 10.0273791553 sidereal minutes");

        // Time value with special number `Infinity`, converted "from" and "to" different time units, verbose
        result = timeWriter.write(Infinity, "minute", "hour", { verbose: true });
        expect(result).to.equal("infinite hours");

        // Time value with special number `NaN`, converted "from" and "to" different time units, verbose
        result = timeWriter.write(NaN, "minute", "hour", { verbose: true });
        expect(result).to.equal("invalid number of hours");

        // Large time value, no conversion
        result = timeWriter.write(1.0102030405060708090647551230010854);
        expect(result).to.equal("1.0102030405 ns");

        // Large time value (using a string representation), no conversion
        result = timeWriter.write(1.0102030405060708090647551230010854);
        expect(result).to.equal("1.0102030405 ns");

        // Time object, no conversion, plural
        result = timeWriter.write(new Time(10), "nanoseconds");
        expect(result).to.equal("10 ns");

        // Time object, no conversion, case variation
        result = timeWriter.write(new Time(10), "NaNoSeCoNd");
        expect(result).to.equal("10 ns");
    });

    // Countdown depends on `write`, so we test it later
    it("should `countdown` using parameters from all overloads", () => {
        const timeWriter = new TimeWriter();

        // Default segments (`timeSegments`.common)
        let result = timeWriter.countdown(Time.from(1000, "day"));
        expect(result).to.equal("2 y, 8 m, 26 d, 4 h, 21 min, 36 s");

        // Custom segments as args
        result = timeWriter.countdown(Time.from(1000, "day"), "siderealYear", "siderealMonth", "siderealDay");
        expect(result).to.equal("≈2 sidereal years, 9 sidereal months, 23.6569329984 sidereal days");

        // Custom segments as array
        result = timeWriter.countdown(Time.from(1, "yobisecond"), ["millenium", "year", "day"]);
        expect(result).to.equal("38309334171900 millennia, 669 y, 165.570462963 d");

        // Options, default segments
        result = timeWriter.countdown(Time.from(1000, "day"), { significantDigits: 5 });
        expect(result).to.equal("2 y, 8 m, 26 d, 4 h, 21 min, 36 s");

        // Options, segments as args
        result = timeWriter.countdown(Time.from(1000, "day"), { decimalPlaces: 2 }, "megasecond", "kilosecond", "second");
        expect(result).to.equal("86.00 Ms, 400.00 Ks");

        // Options, segment sandwich
        result = timeWriter.countdown(Time.from(1e9, "day"), { decimalPlaces: 0, segmentSeparator: " + " }, TimeSegments.sidereal, "microsecond", ["nanosecond", "femtosecond"]);
        expect(result).to.equal("≈2737803 sidereal years + 1 sidereal month + 13 sidereal days + 9 sidereal hours + 31 sidereal minutes + 48 sidereal seconds + 461929 µs + 163 ns + 700400 fs");
    });

    it("should `countdown` using all objects in `timeSegments`", () => {
        const timeWriter = new TimeWriter();

        // Base Ten

        let result = timeWriter.countdown(Time.from("1.66666666666666666666666666666e+68", "planckTime"), TimeSegments.baseTen);
        expect(result).to.equal("8 Ys, 984 Zs, 266 Es, 666 Ps, 666 Ts, 666 Gs, 666 Ms, 666 Ks, 666 s, 666 ms, 630 µs, 729 ns, 600 ps");

        result = timeWriter.countdown(Time.from(1, "galacticYear"), TimeSegments.baseTen);
        expect(result).to.equal("≈7 Ps, 489 Ts, 800 Gs");

        result = timeWriter.countdown(Time.from(1, "galacticYear"), { hideZeroSegments: false }, TimeSegments.baseTen);
        expect(result).to.equal("≈0 Ys, 0 Zs, 0 Es, 7 Ps, 489 Ts, 800 Gs, 0 Ms, 0 Ks, 0 s, 0 ms, 0 µs, 0 ns, 0 ps, 0 fs, 0 as, 0 zs, 0 ys");

        // Binary

        result = timeWriter.countdown(Time.from(10 / 3, "yottasecond"), TimeSegments.binary);
        expect(result).to.equal("2 Yis, 775 Zis, 453 Eis, 812 Pis, 341 Tis, 779 Gis, 212 Mis, 285 Kis, 768 s");

        result = timeWriter.countdown(Time.from(1, "galacticYear"), TimeSegments.binary);
        expect(result).to.equal("≈6 Pis, 667 Tis, 955 Gis, 839 Mis, 20 Kis");

        result = timeWriter.countdown(Time.from(1, "galacticYear"), { hideZeroSegments: false }, TimeSegments.binary);
        expect(result).to.equal("≈0 Yis, 0 Zis, 0 Eis, 6 Pis, 667 Tis, 955 Gis, 839 Mis, 20 Kis, 0 s");

        // Common

        result = timeWriter.countdown(Time.from(1.75, "biennium"), TimeSegments.common);
        expect(result).to.equal("3 y, 6 m, 2 h, 54 min, 36 s");

        result = timeWriter.countdown(Time.from(1, "galacticYear"), TimeSegments.common);
        expect(result).to.equal("≈237342313 y, 8 m, 18 h, 20 min, 24 s");

        result = timeWriter.countdown(Time.from(1, "galacticYear"), { significantDigits: 10, hideZeroSegments: false }, TimeSegments.common);
        expect(result).to.equal("≈237342313 y, 8 m, 0 d, 18 h, 20 min, 24 s");

        // Extremes

        const extremeTime = Time.from(10, "planckTime").add("10", "yobisecond");

        result = timeWriter.countdown(extremeTime, TimeSegments.extremes);
        expect(result).to.equal("10 Yis, 10 tₚ");
    });

    it("should `countdown` and `write` overriding configurations in the correct order", () => {

        const timeWriter = new TimeWriter();

        expect(timeWriter.write(1)).to.equal("1 ns");
        expect(timeWriter.write(2.5, "anomalisticMonth")).to.equal("≈2.5 anomalistic months");
        expect(timeWriter.write(2.5, "anomalisticMonth", { verbose: true })).to.equal("approximately 2.5 anomalistic months");
        expect(timeWriter.write(Infinity)).to.equal("∞ ns");
        expect(timeWriter.write(Infinity, { verbose: true })).to.equal("infinite nanoseconds");
        expect(timeWriter.write(NaN)).to.equal("NaN ns");
        expect(timeWriter.write(NaN, { verbose: true })).to.equal("invalid number of nanoseconds");

        Locale.set("pt-br");

        expect(timeWriter.write(1)).to.equal("1 ns");
        expect(timeWriter.write(2.5, "anomalisticMonth")).to.equal("≈2,5 meses anomalísticos");
        expect(timeWriter.write(2.5, "anomalisticMonth", { verbose: true })).to.equal("aproximadamente 2,5 meses anomalísticos");
        expect(timeWriter.write(Infinity)).to.equal("∞ ns");
        expect(timeWriter.write(Infinity, { verbose: true })).to.equal("infinitos nanossegundos");
        expect(timeWriter.write(NaN)).to.equal("NaN ns");
        expect(timeWriter.write(NaN, { verbose: true })).to.equal("número inválido de nanossegundos");

        timeWriter.settings = {
            decimalPlaces: 4,
            defaultTimeUnit: "second",
            hideZeroSegments: false,
            segmentSeparator: "; ",
            thousandsSeparator: ".",
            verbose: true,
        };

        expect(timeWriter.write(1)).to.equal("1,0000 segundo");
        expect(timeWriter.write(1, { verbose: false })).to.equal("1,0000 s");
        expect(timeWriter.write(2500.5, "anomalisticMonth")).to.equal("aproximadamente 2.500,5000 meses anomalísticos");
        expect(timeWriter.write(Infinity)).to.equal("infinitos segundos");
        expect(timeWriter.write(Infinity, { verbose: false })).to.equal("∞ s");
        expect(timeWriter.write(NaN)).to.equal("número inválido de segundos");
        expect(timeWriter.write(NaN, { verbose: false })).to.equal("NaN s");
        expect(timeWriter.countdown(Time.from(1e9, "second"), "millenium", "year", "month")).to.equal("0,0000 milênio; 31,0000 anos; 8,2704 meses");

        // Returning to the default language so it doesn't break other tests
        Locale.set();
    });

});

describe("TimeWriter :: configurations", () => {
    const timeWriter = new TimeWriter();
    let result: string;

    // Testing it first because of `decimalPlaces`
    it("should use the `significantDigits` from the instance", () => {

        timeWriter.settings.significantDigits = 27;

        result = timeWriter.write(1.010203040506, "second", "minute");
        expect(result).to.equal("0.01683671734176666666666666667 min");

        result = timeWriter.write(1, "planckTime", "nanosecond");
        expect(result).to.equal("0.0000000000000000000000000000000000539056 ns");
    });

    it("should use the `decimalPlaces` from the instance", () => {
        timeWriter.settings.decimalPlaces = 5;

        result = timeWriter.write(1.000666000666);
        expect(result).to.equal("1.00067 ns");

        result = timeWriter.write(1.000666000666, "siderealMinute");
        expect(result).to.equal("≈1.00067 sidereal minutes");

        result = timeWriter.write(1, "siderealMinute", "minute");
        expect(result).to.equal("≈0.99727 min");

        result = timeWriter.write(1, "planckTime", "nanosecond");
        expect(result).to.equal("0.00000 ns");
    });

    it("should use the `decimalSeparator` from the instance", () => {

        timeWriter.settings.decimalSeparator = "/";

        result = timeWriter.write(1.000666000666);
        expect(result).to.equal("1/00067 ns");

        result = timeWriter.write(1.000666000666, "siderealMinute");
        expect(result).to.equal("≈1/00067 sidereal minutes");

        result = timeWriter.write(1, "siderealMinute", "minute");
        expect(result).to.equal("≈0/99727 min");

        delete timeWriter.settings.decimalSeparator;
    });

    it("should use the `defaultTimeUnit` from the instance", () => {

        timeWriter.settings.defaultTimeUnit = "millisecond";

        result = timeWriter.write(1.000666000666);
        expect(result).to.equal("1.00067 ms");

        result = timeWriter.write(1.000666000666, "siderealMinute");
        expect(result).to.equal("≈1.00067 sidereal minutes");

        result = timeWriter.write(1, "siderealMinute", "minute");
        expect(result).to.equal("≈0.99727 min");
    });

    it("should use the `hideTimeUnit` from the instance", () => {

        timeWriter.settings.hideTimeUnit = true;

        result = timeWriter.write(1.000666000666);
        expect(result).to.equal("1.00067");

        result = timeWriter.write(1.000666000666, "siderealMinute");
        expect(result).to.equal("≈1.00067");

        result = timeWriter.write(1, "siderealMinute", "minute");
        expect(result).to.equal("≈0.99727");

        // Changing it back to the default, so it won't affect the rest of tests
        delete timeWriter.settings.hideTimeUnit;
    });

    it("should use the `hideZeroSegments` from the instance", () => {

        timeWriter.settings.hideZeroSegments = false;

        result = timeWriter.countdown(Time.from(1, "galacticYear"));
        expect(result).to.equal("≈237342313.00000 y, 8.00000 m, 0.00000 d, 18.00000 h, 20.00000 min, 24.00000 s");

        delete timeWriter.settings.hideZeroSegments;
    });

    it("should use the `numericNotation` (roman) from the instance", () => {

        timeWriter.settings.numericNotation = "roman";

        result = timeWriter.write(1.000666000666);
        expect(result).to.equal("I ms");

        result = timeWriter.write(1.000666000666, "siderealMinute");
        expect(result).to.equal("≈I sidereal minutes");

        result = timeWriter.write(1, "siderealMinute", "minute");
        expect(result).to.equal("≈nulla min");

        result = timeWriter.write(100, "siderealMinute", "minute");
        expect(result).to.equal("≈XCIX min");
    });

    it("should use the `numericNotation` (roman-fractions) from the instance", () => {

        timeWriter.settings.numericNotation = "roman";

        result = timeWriter.write(1.000666000666);
        expect(result).to.equal("I ms");

        result = timeWriter.write(1.000666000666, "siderealMinute");
        expect(result).to.equal("≈I sidereal minutes");

        result = timeWriter.write(1, "siderealMinute", "minute");
        expect(result).to.equal("≈nulla min");

        result = timeWriter.write(100, "siderealMinute", "minute");
        expect(result).to.equal("≈XCIX min");
    });

    it("should use the `numericNotation` (scientific) from the instance", () => {

        timeWriter.settings.numericNotation = "scientific";

        result = timeWriter.write(1.000666000666);
        expect(result).to.equal("1.00067e+0 ms");

        result = timeWriter.write(1.000666000666, "siderealMinute");
        expect(result).to.equal("≈1.00067e+0 sidereal minutes");

        result = timeWriter.write(1, "siderealMinute", "minute");
        expect(result).to.equal("≈9.97270e-1 min");

        delete timeWriter.settings.numericNotation;
    });

    it("should use the `numericWriter` from the instance", () => {

        timeWriter.settings.numericWriter = (v, value) => (new Decimal(value || v)).add(1).toString();

        result = timeWriter.write(1.000666000666);
        expect(result).to.equal("2.000666000666 ms");

        result = timeWriter.write(1.000666000666, "siderealMinute");
        expect(result).to.equal("≈2.000666000666 sidereal minutes");

        result = timeWriter.write(1, "siderealMinute", "minute");
        expect(result).to.equal("≈1.997269560185166666666666666666666666666666666666666666666666666666666666666666666666666666666666667 min");

        delete timeWriter.settings.numericWriter;
    });

    it("should use the `roundingMode` from the instance", () => {

        timeWriter.settings.roundingMode = RoundingMode.RoundDown;

        result = timeWriter.write(1.000666000666);
        expect(result).to.equal("1.00066 ms");

        result = timeWriter.write(1.000666000666, "siderealMinute");
        expect(result).to.equal("≈1.00066 sidereal minutes");

        result = timeWriter.write(1, "siderealMinute", "minute");
        expect(result).to.equal("≈0.99726 min");

        delete timeWriter.settings.roundingMode;
    });

    it("should use the `segmentSeparator` from the instance", () => {

        timeWriter.settings.segmentSeparator = "; ";

        result = timeWriter.countdown(Time.from(1, "galacticYear"));
        expect(result).to.equal("≈237342313.00000 y; 8.00000 m; 18.00000 h; 20.00000 min; 24.00000 s");
    });

    it("should use the `symbolApproximately` from the instance", () => {

        timeWriter.settings.symbolApproximately = "~";

        result = timeWriter.write(1.000666000666);
        expect(result).to.equal("1.00067 ms");

        result = timeWriter.write(1.000666000666, "siderealMinute");
        expect(result).to.equal("~1.00067 sidereal minutes");

        result = timeWriter.write(1, "siderealMinute", "minute");
        expect(result).to.equal("~0.99727 min");
    });

    it("should use the `symbolInfinite` from the instance", () => {

        timeWriter.settings.symbolInfinite = "ℵ₀";

        result = timeWriter.write(Infinity);
        expect(result).to.equal("ℵ₀ ms");

        result = timeWriter.write(Infinity, "siderealMinute");
        expect(result).to.equal("~ℵ₀ sidereal minutes");

        result = timeWriter.write(Infinity, "siderealMinute", { verbose: true });
        expect(result).to.equal("approximately infinite sidereal minutes");
    });

    it("should use the `symbolNaN` from the instance", () => {

        timeWriter.settings.symbolNaN = "🚫";

        result = timeWriter.write(NaN);
        expect(result).to.equal("🚫 ms");

        result = timeWriter.write(NaN, "siderealMinute");
        expect(result).to.equal("~🚫 sidereal minutes");

        result = timeWriter.write(NaN, "siderealMinute", { verbose: true });
        expect(result).to.equal("approximately invalid number of sidereal minutes");
    });

    it("should use the `verbose` from the instance", () => {

        timeWriter.settings.verbose = true;

        result = timeWriter.write(1.000666000666);
        expect(result).to.equal("1.00067 milliseconds");

        result = timeWriter.write(1.000666000666, "siderealMinute");
        expect(result).to.equal("approximately 1.00067 sidereal minutes");

        result = timeWriter.write(1, "siderealMinute", "minute");
        expect(result).to.equal("approximately 0.99727 minute");

        result = timeWriter.write(Infinity);
        expect(result).to.equal("infinite milliseconds");

        result = timeWriter.write(NaN);
        expect(result).to.equal("invalid number of milliseconds");
    });

    it("should use the `termApproximately` from the instance", () => {

        timeWriter.settings.termApproximately = "more or less";

        result = timeWriter.write(1.000666000666);
        expect(result).to.equal("1.00067 milliseconds");

        result = timeWriter.write(1.000666000666, "siderealMinute");
        expect(result).to.equal("more or less 1.00067 sidereal minutes");

        result = timeWriter.write(1, "siderealMinute", "minute");
        expect(result).to.equal("more or less 0.99727 minute");

        result = timeWriter.write(Time.from(Infinity, "second").approximate());
        expect(result).to.equal("more or less infinite milliseconds");

        result = timeWriter.write(Time.from(NaN, "second").approximate());
        expect(result).to.equal("more or less invalid number of milliseconds");
    });

    it("should use the `termInfinite` from the instance", () => {

        timeWriter.settings.termInfinite = "endless";

        result = timeWriter.write(Infinity, "minute");
        expect(result).to.equal("endless minutes");

        result = timeWriter.write(Time.from(Infinity, "second").approximate());
        expect(result).to.equal("more or less endless milliseconds");

        result = timeWriter.write(Time.from(NaN, "second").approximate());
        expect(result).to.equal("more or less invalid number of milliseconds");
    });

    it("should use the `termNaN` from the instance", () => {

        timeWriter.settings.termNaN = "not-a-number";

        result = timeWriter.write(NaN, "minute");
        expect(result).to.equal("not-a-number minutes");

        result = timeWriter.write(Time.from(Infinity, "second").approximate());
        expect(result).to.equal("more or less endless milliseconds");

        result = timeWriter.write(Time.from(NaN, "second").approximate());
        expect(result).to.equal("more or less not-a-number milliseconds");
    });

    it("should use the `thousandsSeparator` from the instance", () => {

        timeWriter.settings.thousandsSeparator = ",";

        result = timeWriter.write(1.000666000666);
        expect(result).to.equal("1.00067 milliseconds");

        result = timeWriter.write(1000);
        expect(result).to.equal("1,000.00000 milliseconds");

        result = timeWriter.write(1e10, "draconicMonth");
        expect(result).to.equal("more or less 10,000,000,000.00000 draconic months");
    });

    it("should use the `timeUnitSeparator` from the instance", () => {

        timeWriter.settings.timeUnitSeparator = "&";

        result = timeWriter.write(1.000666000666);
        expect(result).to.equal("1.00067&milliseconds");

        result = timeWriter.write(1000);
        expect(result).to.equal("1,000.00000&milliseconds");

        result = timeWriter.write(1e10, "draconicMonth");
        expect(result).to.equal("more or less 10,000,000,000.00000&draconic months");

        timeWriter.settings = {};
    });

    it("should use the `decimalPlaces` from the method", () => {
        result = timeWriter.write(10.555555, "minute", { decimalPlaces: 0 });
        expect(result).to.equal("11 min");

        result = timeWriter.write(10, "cosmicYear", { decimalPlaces: 2 });
        expect(result).to.equal("≈10.00 cosmic years");
    });

    it("should use the `decimalSeparator` from the method", () => {
        result = timeWriter.write(10.555555, "minute", { decimalSeparator: "," });
        expect(result).to.equal("10,555555 min");

        result = timeWriter.write(10, "cosmicYear", { decimalSeparator: "," });
        expect(result).to.equal("≈10 cosmic years");
    });

    it("should use the `defaultTimeUnit` from the method", () => {
        result = timeWriter.write("10.555555", "second", "minute", { defaultTimeUnit: "attosecond" });
        expect(result).to.equal("0.17592591667 min");

        result = timeWriter.write(10, "cosmicYear", { defaultTimeUnit: "year" });
        expect(result).to.equal("≈10 cosmic years");

        result = timeWriter.write(new Time(10), { defaultTimeUnit: "year" });
        expect(result).to.equal("0.00000000000000031688738507 y");

        result = timeWriter.write(10, { defaultTimeUnit: "cosmicYear" });
        expect(result).to.equal("≈10 cosmic years");

        result = timeWriter.write(new Decimal(10.6), { defaultTimeUnit: "eclipticYear" });
        expect(result).to.equal("≈10.6 ecliptic years");

        result = timeWriter.write(Time.from(10.6, "second").approximate(), { defaultTimeUnit: "millisecond" });
        expect(result).to.equal("≈10600 ms");
    });

    it("should use the `hideTimeUnit` from the method", () => {
        result = timeWriter.write(10.555555, "minute", { hideTimeUnit: true });
        expect(result).to.equal("10.555555");

        result = timeWriter.write(10, "cosmicYear", { hideTimeUnit: true });
        expect(result).to.equal("≈10");
    });

    it("should use the `hideZeroSegments` from the method", () => {
        result = timeWriter.countdown(Time.from(1, "year"), { hideZeroSegments: false }, TimeSegments.binary);
        expect(result).to.equal("0 Yis, 0 Zis, 0 Eis, 0 Pis, 0 Tis, 0 Gis, 30 Mis, 97 Kis, 344 s");

        result = timeWriter.countdown(new Time(Infinity, true), { hideZeroSegments: false }, TimeSegments.binary);
        expect(result).to.equal("≈∞ Yis");
    });

    it("should use the `numericNotation` (roman) from the method", () => {

        result = timeWriter.write(10.555555, "minute", { numericNotation: "roman" });
        expect(result).to.equal("X min");

        result = timeWriter.write(10, "cosmicYear", { numericNotation: "roman" });
        expect(result).to.equal("≈X cosmic years");
    });

    it("should use the `numericNotation` (roman-fractions) from the method", () => {

        result = timeWriter.write(10.555555, "minute", { numericNotation: "roman-fractions" });
        expect(result).to.equal("XS• min");

        result = timeWriter.write(10, "cosmicYear", { numericNotation: "roman-fractions" });
        expect(result).to.equal("≈X cosmic years");
    });

    it("should use the `numericNotation` (roman-scientific) from the method", () => {

        result = timeWriter.write("1.5e-15", "minute", { numericNotation: "scientific" });
        expect(result).to.equal("1.5e-15 min");

        result = timeWriter.write(10.555555, "minute", { numericNotation: "scientific" });
        expect(result).to.equal("1.0555555e+1 min");

        result = timeWriter.write(10, "cosmicYear", { numericNotation: "scientific" });
        expect(result).to.equal("≈1e+1 cosmic years");
    });

    it("should use the `numericWriter` from the method", () => {
        const testNumericWriter = (v: number, v1?: Decimal) => (new Decimal(v1 || v)).isInteger() ? `i${v}` : `f${v1}`;

        result = timeWriter.write("10", "minute", { numericWriter: testNumericWriter });
        expect(result).to.equal("i10 min");

        result = timeWriter.write("11.000000000000000000000005", "minute", { numericWriter: testNumericWriter });
        expect(result).to.equal("f11.000000000000000000000005 min");

        result = timeWriter.write("11.2", "anomalisticYear", { numericWriter: testNumericWriter });
        expect(result).to.equal("≈f11.2 anomalistic years");
    });

    it("should use the `roundingMode` from the method", () => {
        timeWriter.settings.decimalPlaces = 10;

        // Testing the value of pi
        const pi = Decimal.acos(-1);

        result = timeWriter.write(pi, "minute", { roundingMode: RoundingMode.RoundUp });
        expect(result).to.equal("3.1415926536 min");

        result = timeWriter.write(pi, "minute", { roundingMode: RoundingMode.RoundDown });
        expect(result).to.equal("3.1415926535 min");

        result = timeWriter.write(pi, "minute", { roundingMode: RoundingMode.RoundCeil });
        expect(result).to.equal("3.1415926536 min");

        result = timeWriter.write(pi, "minute", { roundingMode: RoundingMode.RoundFloor });
        expect(result).to.equal("3.1415926535 min");

        result = timeWriter.write(pi, "minute", { roundingMode: RoundingMode.RoundHalfUp });
        expect(result).to.equal("3.1415926536 min");

        result = timeWriter.write(pi, "minute", { roundingMode: RoundingMode.RoundHalfDown });
        expect(result).to.equal("3.1415926536 min");

        result = timeWriter.write(pi, "minute", { roundingMode: RoundingMode.RoundHalfEven });
        expect(result).to.equal("3.1415926536 min");

        result = timeWriter.write(pi, "minute", { roundingMode: RoundingMode.RoundHalfCeil });
        expect(result).to.equal("3.1415926536 min");

        result = timeWriter.write(pi, "minute", { roundingMode: RoundingMode.RoundHalfFloor });
        expect(result).to.equal("3.1415926536 min");

        delete timeWriter.settings.decimalPlaces;
    });

    it("should use the `symbolApproximately` from the method", () => {
        result = timeWriter.write("1e10", "anomalisticYear", { symbolApproximately: "+/-" });
        expect(result).to.equal("+/-10000000000 anomalistic years");

        result = timeWriter.write(1, "cosmicYear", { symbolApproximately: "" });
        expect(result).to.equal("1 cosmic year");
    });

    it("should use the `symbolInfinite` from the method", () => {
        result = timeWriter.write(Infinity, "second", { symbolInfinite: "Ω" });
        expect(result).to.equal("Ω s");

        result = timeWriter.write(-Infinity, "cosmicYear", { symbolInfinite: "Ω" });
        expect(result).to.equal("≈Ω cosmic years");

        result = timeWriter.write((new Time(Infinity)).approximate(), "year", { symbolInfinite: "Ω" });
        expect(result).to.equal("≈Ω y");
    });

    it("should use the `symbolNaN` from the method", () => {
        result = timeWriter.write(NaN, "cosmicYear", { symbolNaN: "invalid" });
        expect(result).to.equal("≈invalid cosmic years");
    });

    it("should use the `verbose` from the method", () => {
        result = timeWriter.write(11.2, "year");
        expect(result).to.equal("11.2 y");

        result = timeWriter.write(11.2, "year", { verbose: true });
        expect(result).to.equal("11.2 years");

        result = timeWriter.write(11.2, "cosmicYear");
        expect(result).to.equal("≈11.2 cosmic years");

        result = timeWriter.write(11.2, "cosmicYear", { verbose: true });
        expect(result).to.equal("approximately 11.2 cosmic years");
    });

    it("should use the `termApproximately` from the method", () => {
        result = timeWriter.write("11.2", "year", { termApproximately: "app." });
        expect(result).to.equal("11.2 y");

        result = timeWriter.write("11.2", "year", { termApproximately: "app.", verbose: true });
        expect(result).to.equal("11.2 years");

        result = timeWriter.write(new Time(1, true), { termApproximately: "app." });
        expect(result).to.equal("≈1 ns");

        result = timeWriter.write(new Time(1, true), { termApproximately: "app.", verbose: true });
        expect(result).to.equal("app. 1 nanosecond");

        result = timeWriter.write("11.2", "anomalisticYear", { termApproximately: "app." });
        expect(result).to.equal("≈11.2 anomalistic years");

        result = timeWriter.write("11.2", "anomalisticYear", { termApproximately: "app.", verbose: true });
        expect(result).to.equal("app. 11.2 anomalistic years");
    });

    it("should use the `termInfinite` from the method", () => {
        result = timeWriter.write(Infinity, "year", { termInfinite: "inf." });
        expect(result).to.equal("∞ y");

        result = timeWriter.write(Infinity, "year", { termInfinite: "inf.", verbose: true });
        expect(result).to.equal("inf. years");

        result = timeWriter.write(new Time(Infinity, true), "year", { termInfinite: "inf.", verbose: true });
        expect(result).to.equal("approximately inf. years");
    });

    it("should use the `termNaN` from the method", () => {
        result = timeWriter.write(NaN, "year", { termNaN: "nan." });
        expect(result).to.equal("NaN y");

        result = timeWriter.write(NaN, "year", { termNaN: "nan.", verbose: true });
        expect(result).to.equal("nan. years");

        result = timeWriter.write(new Time(NaN, true), "year", { termNaN: "nan.", verbose: true });
        expect(result).to.equal("approximately nan. years");
    });

    it("should use the `thousandsSeparator` from the method", () => {
        result = timeWriter.write(1111111222, "year");
        expect(result).to.equal("1111111222 y");

        result = timeWriter.write(1111111222, "year", { thousandsSeparator: "9" });
        expect(result).to.equal("1911191119222 y");

        // Testing with a decimal separator
        result = timeWriter.write(1555.5555555555, "year", { decimalSeparator: ",", thousandsSeparator: "." });
        expect(result).to.equal("1.555,5555555555 y");
    });
});
