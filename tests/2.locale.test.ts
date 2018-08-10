/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { expect } from "chai";
import { TimeUnitDatabase, TimeWriterSettings } from "../src";
import { Locale } from "../src/localization";

// const Test_Locale: any = Locale;

describe("Locale", () => {

    it("should have no configurations loaded by default", () => {
        expect(Locale.get()).to.equal("en-us");
        expect(Locale.settings).to.deep.equal({});
    });

    it("should check if a translation `isAvailable`", () => {
        expect(Locale.isAvailable("en")).to.equal(true);
        expect(Locale.isAvailable("en-us")).to.equal(true);
        expect(Locale.isAvailable("es")).to.equal(true);
        expect(Locale.isAvailable("es-es")).to.equal(true);
        expect(Locale.isAvailable("es-mx")).to.equal(true);
        expect(Locale.isAvailable("pt")).to.equal(true);
        expect(Locale.isAvailable("pt-br")).to.equal(true);
        expect(Locale.isAvailable("pt-pt")).to.equal(true);

        expect(Locale.isAvailable("not-a-language")).to.equal(false);
        expect(Locale.isAvailable("fr")).to.equal(false);
        expect(Locale.isAvailable("ru-ru")).to.equal(false);
    });

    it("should `listAvailable` translations", () => {
        expect(Locale.listAvailable()).to.deep.equal([
            "en", "en-us",
            "es", "es-es", "es-mx",
            "pt", "pt-br", "pt-pt",
        ]);
    });

    it("should `set` to available translations", () => {

        Locale.set("pt-br");

        expect(Locale.settings.timeUnits).to.not.be.undefined;
        expect(Locale.settings.writerOptions).to.not.be.undefined;

        const localeTimeUnits = Locale.settings.timeUnits as TimeUnitDatabase;
        const localeWriterOptions = Locale.settings.writerOptions as TimeWriterSettings;

        expect(localeTimeUnits.anomalisticMonth.readableName).to.equal("mês anomalístico");
        expect(localeTimeUnits.anomalisticMonth.customPlural).to.equal("meses anomalísticos");
        expect(localeTimeUnits.nanosecond.readableName).to.equal("nanossegundo");
        expect(localeTimeUnits.zettasecond.readableName).to.equal("zettassegundo");

        expect(localeWriterOptions.decimalSeparator).to.equal(",");
        expect(localeWriterOptions.termApproximately).to.equal("aproximadamente");
        expect(localeWriterOptions.termInfinite).to.equal("infinitos");
        expect(localeWriterOptions.termNaN).to.equal("número inválido de");

        // Returning to the default language so it doesn't break other tests
        Locale.set();
        expect(Locale.settings).to.deep.equal({});
    });

    it("should throw when `set` locale identifier is invalid", () => {
        expect(() => Locale.set("fr")).to.throw("Invalid locale identifier");
        expect(() => Locale.set("fr-fr")).to.throw("Invalid locale identifier");
        expect(() => Locale.set("not-a-language")).to.throw("Invalid locale identifier");
    });
});
