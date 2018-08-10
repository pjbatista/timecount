/*! ****************************************************************************
Copyright (c) 2017-2018 Pedro José Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
import { expect } from "chai";
import Decimal from "decimal.js";
import { Time } from "../src/index";

const Test_Time: any = Time;

describe("Time", () => {

    it("should be created using `constructor`", () => {
        let time = new Time(10);
        expect(time.isApproximated).to.equal(false);
        expect(time.value).to.equal(10);

        time = new Time(1.062626e1);
        expect(time.isApproximated).to.equal(false);
        expect(time.value).to.equal(10.62626);

        time = new Time("10.62626");
        expect(time.isApproximated).to.equal(false);
        expect(time.value).to.equal(10.62626);

        time = new Time("1.062626e+1");
        expect(time.isApproximated).to.equal(false);
        expect(time.value).to.equal(10.62626);

        time = new Time(new Decimal(10.62626));
        expect(time.isApproximated).to.equal(false);
        expect(time.value).to.equal(10.62626);

        time = new Time(Infinity);
        expect(time.isApproximated).to.equal(false);
        expect(time.value).to.equal(Infinity);

        time = new Time(NaN);
        expect(time.isApproximated).to.equal(false);
        expect(time.value).to.be.NaN;

        time = new Time(1.062626e1, true);
        expect(time.isApproximated).to.equal(true);
        expect(time.value).to.equal(10.62626);

        time = new Time(Infinity, true);
        expect(time.isApproximated).to.equal(true);
        expect(time.value).to.equal(Infinity);

        time = new Time(NaN, true);
        expect(time.isApproximated).to.equal(true);
        expect(time.value).to.be.NaN;
    });

    it("should be created using (static) `from` in all time units", () => {
        let time = Time.from(1.1, "second");
        expect(time.value).to.equal(1100000000);

        time = Time.from("1", "attosecond");
        expect(time.value).to.equal(0.000000001);

        time = Time.from("1e+0", "milisecond");
        expect(time.value).to.equal(1000000);

        time = Time.from(new Decimal(0.3), "nanosecond");
        expect(time.value).to.equal(0.3);

        time = Time.from(Infinity, "planckTime");
        expect(time.value).to.equal(Infinity);

        time = Time.from(NaN, "planckTime");
        expect(time.value).to.be.NaN;

        //#region Time Units

        time = Time.from(0.9080706050403011, "anomalisticMonth");
        expect(time.value).to.equal(2161855603305783);
        expect(time.bigValue.comparedTo("2161855603305782.957520432")).to.equal(0);

        time = Time.from(0.9080706050403011, "anomalisticYear");
        expect(time.value).to.equal(28657284940165260);
        expect(time.bigValue.comparedTo("28657284940165260.53805692544")).to.equal(0);

        time = Time.from(0.9080706050403011, "attosecond");
        expect(time.value).to.equal(9.080706050403011e-10);
        expect(time.bigValue.comparedTo("0.0000000009080706050403011")).to.equal(0);

        time = Time.from(0.9080706050403011, "biennium");
        expect(time.value).to.equal(57311880991735480);
        expect(time.bigValue.comparedTo("57311880991735479.7564944")).to.equal(0);

        time = Time.from(0.9080706050403011, "century");
        expect(time.value).to.equal(2863691460055094000);
        expect(time.bigValue.comparedTo("2863691460055093548.96")).to.equal(0);

        time = Time.from(0.9080706050403011, "cosmicYear");
        expect(time.value).to.equal(6.801267217630848e+24);
        expect(time.bigValue.comparedTo("6801267217630847178780000")).to.equal(0);

        time = Time.from(0.9080706050403011, "day");
        expect(time.value).to.equal(78457300275482.02);
        expect(time.bigValue.comparedTo("78457300275482.01504")).to.equal(0);

        time = Time.from(0.9080706050403011, "decade");
        expect(time.value).to.equal(286559404958677400);
        expect(time.bigValue.comparedTo("286559404958677398.782472")).to.equal(0);

        time = Time.from(0.9080706050403011, "draconicMonth");
        expect(time.value).to.equal(2134997315702477.2);
        expect(time.bigValue.comparedTo("2134997315702477.1993117888")).to.equal(0);

        time = Time.from(0.9080706050403011, "draconicYear");
        expect(time.value).to.equal(27194875375061804);
        expect(time.bigValue.comparedTo("27194875375061803.172840498919")).to.equal(0);

        time = Time.from(0.9080706050403011, "eclipticYear");
        expect(time.value).to.equal(27194875375061804);
        expect(time.bigValue.comparedTo("27194875375061803.172840498919")).to.equal(0);

        time = Time.from(0.9080706050403011, "exasecond");
        expect(time.value).to.equal(9.08070605040301e+26);
        expect(time.bigValue.comparedTo("908070605040301100000000000")).to.equal(0);

        time = Time.from(0.9080706050403011, "exbisecond");
        expect(time.value).to.equal(1.0469341282523138e+27);
        expect(time.bigValue.comparedTo("1046934128252313825488051480.6644736")).to.equal(0);

        time = Time.from(0.9080706050403011, "femtosecond");
        expect(time.value).to.equal(9.080706050403011e-7);
        expect(time.bigValue.comparedTo("0.0000009080706050403011")).to.equal(0);

        time = Time.from(0.9080706050403011, "fortnight");
        expect(time.value).to.equal(1098402203856748.2);
        expect(time.bigValue.comparedTo("1098402203856748.21056")).to.equal(0);

        time = Time.from(0.9080706050403011, "galacticYear");
        expect(time.value).to.equal(6.801267217630848e+24);
        expect(time.bigValue.comparedTo("6801267217630847178780000")).to.equal(0);

        time = Time.from(0.9080706050403011, "gibisecond");
        expect(time.value).to.equal(975033387776756500);
        expect(time.bigValue.comparedTo("975033387776756496.6232064")).to.equal(0);

        time = Time.from(0.9080706050403011, "gigasecond");
        expect(time.value).to.equal(908070605040301000);
        expect(time.bigValue.comparedTo("908070605040301100")).to.equal(0);

        time = Time.from(0.9080706050403011, "gregorianYear");
        expect(time.value).to.equal(28655940495867740);
        expect(time.bigValue.comparedTo("28655940495867739.8782472")).to.equal(0);

        time = Time.from(0.9080706050403011, "hour");
        expect(time.value).to.equal(3269054178145.084);
        expect(time.bigValue.comparedTo("3269054178145.08396")).to.equal(0);

        time = Time.from(0.9080706050403011, "jiffy");
        expect(time.value).to.equal(2.7242118151209034e-15);
        expect(time.bigValue.comparedTo("0.0000000000000027242118151209033")).to.equal(0);

        time = Time.from(0.9080706050403011, "julianYear");
        expect(time.value).to.equal(28656528925619804);
        expect(time.bigValue.comparedTo("28656528925619805.99336")).to.equal(0);

        time = Time.from(0.9080706050403011, "kibisecond");
        expect(time.value).to.equal(929864299561.2683);
        expect(time.bigValue.comparedTo("929864299561.2683264")).to.equal(0);

        time = Time.from(0.9080706050403011, "kilosecond");
        expect(time.value).to.equal(908070605040.3011);
        expect(time.bigValue.comparedTo("908070605040.3011")).to.equal(0);

        time = Time.from(0.9080706050403011, "kiloyear");
        expect(time.value).to.equal(28636914600550937000);
        expect(time.bigValue.comparedTo("28636914600550935489.6")).to.equal(0);

        time = Time.from(0.9080706050403011, "leapYear");
        expect(time.value).to.equal(28715371900826416);
        expect(time.bigValue.comparedTo("28715371900826417.50464")).to.equal(0);

        time = Time.from(0.9080706050403011, "lustrum");
        expect(time.value).to.equal(143279702479338700);
        expect(time.bigValue.comparedTo("143279702479338699.391236")).to.equal(0);

        time = Time.from(0.9080706050403011, "mebisecond");
        expect(time.value).to.equal(952181042750738.8);
        expect(time.bigValue.comparedTo("952181042750738.7662336")).to.equal(0);

        time = Time.from(0.9080706050403011, "megasecond");
        expect(time.value).to.equal(908070605040301.1);
        expect(time.bigValue.comparedTo("908070605040301.1")).to.equal(0);

        time = Time.from(0.9080706050403011, "microsecond");
        expect(time.value).to.equal(908.0706050403011);
        expect(time.bigValue.comparedTo("908.0706050403011")).to.equal(0);

        time = Time.from(0.9080706050403011, "milisecond");
        expect(time.value).to.equal(908070.6050403011);
        expect(time.bigValue.comparedTo("908070.6050403011")).to.equal(0);

        time = Time.from(0.9080706050403011, "millenium");
        expect(time.value).to.equal(28655940495867740000);
        expect(time.bigValue.comparedTo("28655940495867739878.2472")).to.equal(0);

        time = Time.from(0.9080706050403011, "minute");
        expect(time.value).to.equal(54484236302.41807);
        expect(time.bigValue.comparedTo("54484236302.418066")).to.equal(0);

        time = Time.from(0.9080706050403011, "month");
        expect(time.value).to.equal(2386409550045911.5);
        expect(time.bigValue.comparedTo("2386409550045911.2908")).to.equal(0);

        time = Time.from(0.9080706050403011, "nanosecond");
        expect(time.value).to.equal(0.9080706050403011);
        expect(time.bigValue.comparedTo("0.9080706050403011")).to.equal(0);

        time = Time.from(0.9080706050403011, "nodicalMonth");
        expect(time.value).to.equal(2134997315702477.2);
        expect(time.bigValue.comparedTo("2134997315702477.1993117888")).to.equal(0);

        time = Time.from(0.9080706050403011, "nonLeapYear");
        expect(time.value).to.equal(28636914600550936);
        expect(time.bigValue.comparedTo("28636914600550935.4896")).to.equal(0);

        time = Time.from(0.9080706050403011, "novennium");
        expect(time.value).to.equal(257903464462809660);
        expect(time.bigValue.comparedTo("257903464462809658.9042248")).to.equal(0);

        time = Time.from(0.9080706050403011, "octennium");
        expect(time.value).to.equal(229247523966941920);
        expect(time.bigValue.comparedTo("229247523966941919.0259776")).to.equal(0);

        time = Time.from(0.9080706050403011, "pebisecond");
        expect(time.value).to.equal(1.0223966096214002e+24);
        expect(time.bigValue.comparedTo("1022396609621400220203175.2740864")).to.equal(0);

        time = Time.from(0.9080706050403011, "petasecond");
        expect(time.value).to.equal(9.08070605040301e+23);
        expect(time.bigValue.comparedTo("908070605040301100000000")).to.equal(0);

        time = Time.from(0.9080706050403011, "picosecond");
        expect(time.value).to.equal(0.0009080706050403011);
        expect(time.bigValue.comparedTo("0.0009080706050403011")).to.equal(0);

        time = Time.from(0.9080706050403011, "planckTime");
        expect(time.value).to.equal(4.895009080706046e-35);
        expect(time.bigValue.comparedTo("0.00000000000000000000000000000000004895009080706045497616")).to.equal(0);

        time = Time.from(0.9080706050403011, "quadrennium");
        expect(time.value).to.equal(114623761983470960);
        expect(time.bigValue.comparedTo("114623761983470959.5129888")).to.equal(0);

        time = Time.from(0.9080706050403011, "quindecennium");
        expect(time.value).to.equal(429839107438016100);
        expect(time.bigValue.comparedTo("429839107438016098.173708")).to.equal(0);

        time = Time.from(0.9080706050403011, "quinquennium");
        expect(time.value).to.equal(143279702479338700);
        expect(time.bigValue.comparedTo("143279702479338699.391236")).to.equal(0);

        time = Time.from(0.9080706050403011, "second");
        expect(time.value).to.equal(908070605.0403011);
        expect(time.bigValue.comparedTo("908070605.0403011")).to.equal(0);

        time = Time.from(0.9080706050403011, "septennium");
        expect(time.value).to.equal(200458402203856540);
        expect(time.bigValue.comparedTo("200458402203856548.4272")).to.equal(0);

        time = Time.from(0.9080706050403011, "shake");
        expect(time.value).to.equal(9.08070605040301);
        expect(time.bigValue.comparedTo("9.080706050403011")).to.equal(0);

        time = Time.from(0.9080706050403011, "siderealDay");
        expect(time.value).to.equal(78243077339046.95);
        expect(time.bigValue.comparedTo("78243077339046.957607499")).to.equal(0);

        time = Time.from(0.9080706050403011, "siderealHour");
        expect(time.value).to.equal(3260128222460.593);
        expect(time.bigValue.comparedTo("3260128222460.5925905141384337")).to.equal(0);

        time = Time.from(0.9080706050403011, "siderealMinute");
        expect(time.value).to.equal(54335470374.33716);
        expect(time.bigValue.comparedTo("54335470374.337156037868705221")).to.equal(0);

        time = Time.from(0.9080706050403011, "siderealMonth");
        expect(time.value).to.equal(2143583682644626);
        expect(time.bigValue.comparedTo("2143583682644625.9510377664")).to.equal(0);

        time = Time.from(0.9080706050403011, "siderealSecond");
        expect(time.value).to.equal(905591172.9056495);
        expect(time.bigValue.comparedTo("905591172.90564953631797976372")).to.equal(0);

        time = Time.from(0.9080706050403011, "siderealYear");
        expect(time.value).to.equal(28657027946740100);
        expect(time.bigValue.comparedTo("28657027946740099.840426494")).to.equal(0);

        time = Time.from(0.9080706050403011, "solarDay");
        expect(time.value).to.equal(78457300275482.02);
        expect(time.bigValue.comparedTo("78457300275482.01504")).to.equal(0);

        time = Time.from(0.9080706050403011, "solarYear");
        expect(time.value).to.equal(28655920518314428);
        expect(time.bigValue.comparedTo("28655920518314428.991623")).to.equal(0);

        time = Time.from(0.9080706050403011, "svedberg");
        expect(time.value).to.equal(0.0000908070605040301);
        expect(time.bigValue.comparedTo("0.00009080706050403011")).to.equal(0);

        time = Time.from(0.9080706050403011, "synodicMonth");
        expect(time.value).to.equal(2316891151515149);
        expect(time.bigValue.comparedTo("2316891151515149.193340224")).to.equal(0);

        time = Time.from(0.9080706050403011, "tebisecond");
        expect(time.value).to.equal(998434189083398600000);
        expect(time.bigValue.comparedTo("998434189083398652542.1633536")).to.equal(0);

        time = Time.from(0.9080706050403011, "terasecond");
        expect(time.value).to.equal(908070605040301100000);
        expect(time.bigValue.comparedTo("908070605040301100000")).to.equal(0);

        time = Time.from(0.9080706050403011, "timeUnit");
        expect(time.value).to.equal(929864.2995612683);
        expect(time.bigValue.comparedTo("929864.2995612683264")).to.equal(0);

        time = Time.from(0.9080706050403011, "tropicalYear");
        expect(time.value).to.equal(28655920518314428);
        expect(time.bigValue.comparedTo("28655920518314428.991623")).to.equal(0);

        time = Time.from(0.9080706050403011, "week");
        expect(time.value).to.equal(549201101928374.1);
        expect(time.bigValue.comparedTo("549201101928374.10528")).to.equal(0);

        time = Time.from(0.9080706050403011, "year");
        expect(time.value).to.equal(28655940495867740);
        expect(time.bigValue.comparedTo("28655940495867739.8782472")).to.equal(0);

        time = Time.from(0.9080706050403011, "yobisecond");
        expect(time.value).to.equal(1.0977900004662982e+33);
        expect(time.bigValue.comparedTo("1097790000466298221874959069389231.0695936")).to.equal(0);

        time = Time.from(0.9080706050403011, "yoctosecond");
        expect(time.value).to.equal(9.08070605040301e-16);
        expect(time.bigValue.comparedTo("0.0000000000000009080706050403011")).to.equal(0);

        time = Time.from(0.9080706050403011, "yottasecond");
        expect(time.value).to.equal(9.080706050403011e+32);
        expect(time.bigValue.comparedTo("908070605040301100000000000000000")).to.equal(0);

        time = Time.from(0.9080706050403011, "zebisecond");
        expect(time.value).to.equal(1.0720605473303693e+30);
        expect(time.bigValue.comparedTo("1072060547330369357299764716200.4209664")).to.equal(0);

        time = Time.from(0.9080706050403011, "zeptosecond");
        expect(time.value).to.equal(9.080706050403011e-13);
        expect(time.bigValue.comparedTo("0.0000000000009080706050403011")).to.equal(0);

        time = Time.from(0.9080706050403011, "zettasecond");
        expect(time.value).to.equal(9.080706050403011e+29);
        expect(time.bigValue.comparedTo("908070605040301100000000000000")).to.equal(0);

        //#endregion

    });

    it("should convert using `to` and `toBig` in all time units", () => {
        const time = new Time("1.010203040506070809");
        const expectedDecimal = "1.010203040506070809";
        const expectedNumber = 1.010203040506070809;

        // decimal.js use strings to create more precise numeric representations

        expect(time.value).to.equal(expectedNumber);
        expect(time.bigValue.comparedTo(expectedDecimal)).to.equal(0);

        //#region Time Units

        expect(time.to("anomalisticMonth")).to.equal(4.243279175552537e-16);
        expect(time.toBig("anomalisticMonth").comparedTo("4.243279175552537002022318421969296325800061117821705456052596543005568012327331568618397835351115299e-16")).to.equal(0);

        expect(time.to("anomalisticYear")).to.equal(3.2010558157244936e-17);
        expect(time.toBig("anomalisticYear").comparedTo("3.201055815724493533938528977619472688574712210304947959650106919398947056774542535931182773069238728e-17")).to.equal(0);

        expect(time.to("attosecond")).to.equal(1010203040.5060709);
        expect(time.toBig("attosecond").comparedTo("1010203040.506070809")).to.equal(0);

        expect(time.to("biennium")).to.equal(1.6006029994691358e-17);
        expect(time.toBig("biennium").comparedTo("1.600602999469135689974114103288555878273668508923168498656017222449113589930992067928486883017092399e-17")).to.equal(0);

        expect(time.to("century")).to.equal(3.2033328275814015e-19);
        expect(time.toBig("century").comparedTo("3.20333282758140160134449518011161846778285134449518011161846778285134449518011161846778285134449518e-19")).to.equal(0);

        expect(time.to("cosmicYear")).to.equal(1.3487717168763796e-25);
        expect(time.toBig("cosmicYear").comparedTo("1.348771716876379621618734812678576196961200566103233731207775908568987155865310155144329621618734813e-25")).to.equal(0);

        expect(time.to("day")).to.equal(1.1692164820672116e-14);
        expect(time.toBig("day").comparedTo("1.169216482067211584490740740740740740740740740740740740740740740740740740740740740740740740740740741e-14")).to.equal(0);

        expect(time.to("decade")).to.equal(3.2012059989382715e-18);
        expect(time.toBig("decade").comparedTo("3.201205998938271379948228206577111756547337017846336997312034444898227179861984135856973766034184797e-18")).to.equal(0);

        expect(time.to("draconicMonth")).to.equal(4.296659670057098e-16);
        expect(time.toBig("draconicMonth").comparedTo("4.296659670057097820356960000840580962305687447553859041051192224451885001446926199849702599570122323e-16")).to.equal(0);

        expect(time.to("draconicYear")).to.equal(3.3731931974474613e-17);
        expect(time.toBig("draconicYear").comparedTo("3.373193197447461290434930881933859689106621821792597614616463636739081031605564133591832560165821738e-17")).to.equal(0);

        expect(time.to("eclipticYear")).to.equal(3.3731931974474613e-17);
        expect(time.toBig("eclipticYear").comparedTo("3.373193197447461290434930881933859689106621821792597614616463636739081031605564133591832560165821738e-17")).to.equal(0);

        expect(time.to("exasecond")).to.equal(1.0102030405060708e-27);
        expect(time.toBig("exasecond").comparedTo("1.010203040506070809e-27")).to.equal(0);

        expect(time.to("exbisecond")).to.equal(8.762114649345151e-28);
        expect(time.toBig("exbisecond").comparedTo("8.76211464934515204573683977429254809976555407047271728515625e-28")).to.equal(0);

        expect(time.to("femtosecond")).to.equal(1010203.0405060708);
        expect(time.toBig("femtosecond").comparedTo("1010203.040506070809")).to.equal(0);

        expect(time.to("fortnight")).to.equal(8.351546300480082e-16);
        expect(time.toBig("fortnight").comparedTo("8.351546300480082746362433862433862433862433862433862433862433862433862433862433862433862433862433862e-16")).to.equal(0);

        expect(time.to("galacticYear")).to.equal(1.3487717168763796e-25);
        expect(time.toBig("galacticYear").comparedTo("1.348771716876379621618734812678576196961200566103233731207775908568987155865310155144329621618734813e-25")).to.equal(0);

        expect(time.to("gibisecond")).to.equal(9.408248965684983e-19);
        expect(time.toBig("gibisecond").comparedTo("9.40824896568498396314680576324462890625e-19")).to.equal(0);

        expect(time.to("gigasecond")).to.equal(1.0102030405060709e-18);
        expect(time.toBig("gigasecond").comparedTo("1.010203040506070809e-18")).to.equal(0);

        expect(time.to("gregorianYear")).to.equal(3.2012059989382715e-17);
        expect(time.toBig("gregorianYear").comparedTo("3.201205998938271379948228206577111756547337017846336997312034444898227179861984135856973766034184797e-17")).to.equal(0);

        expect(time.to("hour")).to.equal(2.8061195569613076e-13);
        expect(time.toBig("hour").comparedTo("2.806119556961307802777777777777777777777777777777777777777777777777777777777777777777777777777777778e-13")).to.equal(0);

        expect(time.to("jiffy")).to.equal(336734346835356.94);
        expect(time.toBig("jiffy").comparedTo("336734346835356.9363333333333333333333333333333333333333333333333333333333333333333333333333333333333")).to.equal(0);

        expect(time.to("julianYear")).to.equal(3.201140265755542e-17);
        expect(time.toBig("julianYear").comparedTo("3.201140265755541641316196415443506477045149187517428448297715922630364793266915101275128653636524958e-17")).to.equal(0);

        expect(time.to("kibisecond")).to.equal(9.865264067442097e-13);
        expect(time.toBig("kibisecond").comparedTo("9.865264067442097744140625e-13")).to.equal(0);

        expect(time.to("kilosecond")).to.equal(1.0102030405060709e-12);
        expect(time.toBig("kilosecond").comparedTo("1.010203040506070809e-12")).to.equal(0);

        expect(time.to("kiloyear")).to.equal(3.2033328275814014e-20);
        expect(time.toBig("kiloyear").comparedTo("3.20333282758140160134449518011161846778285134449518011161846778285134449518011161846778285134449518e-20")).to.equal(0);

        expect(time.to("leapYear")).to.equal(3.194580552096206e-17);
        expect(time.toBig("leapYear").comparedTo("3.194580552096206515002023881805302570329892734264318963772515685083991094920056668690548471969236997e-17")).to.equal(0);

        expect(time.to("lustrum")).to.equal(6.402411997876543e-18);
        expect(time.toBig("lustrum").comparedTo("6.402411997876542759896456413154223513094674035692673994624068889796454359723968271713947532068369594e-18")).to.equal(0);

        expect(time.to("mebisecond")).to.equal(9.634046940861423e-16);
        expect(time.toBig("mebisecond").comparedTo("9.6340469408614235782623291015625e-16")).to.equal(0);

        expect(time.to("megasecond")).to.equal(1.0102030405060708e-15);
        expect(time.toBig("megasecond").comparedTo("1.010203040506070809e-15")).to.equal(0);

        expect(time.to("microsecond")).to.equal(0.0010102030405060708);
        expect(time.toBig("microsecond").comparedTo("0.001010203040506070809")).to.equal(0);

        expect(time.to("milisecond")).to.equal(0.0000010102030405060707);
        expect(time.toBig("milisecond").comparedTo("0.000001010203040506070809")).to.equal(0);

        expect(time.to("millenium")).to.equal(3.2012059989382714e-20);
        expect(time.toBig("millenium").comparedTo("3.201205998938271379948228206577111756547337017846336997312034444898227179861984135856973766034184797e-20")).to.equal(0);

        expect(time.to("minute")).to.equal(1.6836717341767847e-11);
        expect(time.toBig("minute").comparedTo("1.683671734176784681666666666666666666666666666666666666666666666666666666666666666666666666666666667e-11")).to.equal(0);

        expect(time.to("month")).to.equal(3.843999393097682e-16);
        expect(time.toBig("month").comparedTo("3.843999393097681921613394216133942161339421613394216133942161339421613394216133942161339421613394216e-16")).to.equal(0);

        expect(time.to("nanosecond")).to.equal(1.010203040506071);
        expect(time.toBig("nanosecond").comparedTo("1.010203040506070809")).to.equal(0);

        expect(time.to("nodicalMonth")).to.equal(4.296659670057098e-16);
        expect(time.toBig("nodicalMonth").comparedTo("4.296659670057097820356960000840580962305687447553859041051192224451885001446926199849702599570122323e-16")).to.equal(0);

        expect(time.to("nonLeapYear")).to.equal(3.2033328275814013e-17);
        expect(time.toBig("nonLeapYear").comparedTo("3.20333282758140160134449518011161846778285134449518011161846778285134449518011161846778285134449518e-17")).to.equal(0);

        expect(time.to("novennium")).to.equal(3.556895554375857e-18);
        expect(time.toBig("novennium").comparedTo("3.556895554375857088831364673974568618385930019829263330346704938775807977624426817618859740037983108e-18")).to.equal(0);

        expect(time.to("octennium")).to.equal(4.0015074986728394e-18);
        expect(time.toBig("octennium").comparedTo("4.001507498672839224935285258221389695684171272307921246640043056122783974827480169821217207542730996e-18")).to.equal(0);

        expect(time.to("pebisecond")).to.equal(8.972405400929435e-25);
        expect(time.toBig("pebisecond").comparedTo("8.9724054009294356948345239288755692541599273681640625e-25")).to.equal(0);

        expect(time.to("petasecond")).to.equal(1.0102030405060708e-24);
        expect(time.toBig("petasecond").comparedTo("1.010203040506070809e-24")).to.equal(0);

        expect(time.to("picosecond")).to.equal(1010.2030405060708);
        expect(time.toBig("picosecond").comparedTo("1010.203040506070809")).to.equal(0);

        expect(time.to("planckTime")).to.equal(1.8740224401659027e+34);
        expect(time.toBig("planckTime").comparedTo("1.874022440165902631637529310498352675788786322756819328604078240479653319877712148645038734380101511e+34")).to.equal(0);

        expect(time.to("quadrennium")).to.equal(8.003014997345679e-18);
        expect(time.toBig("quadrennium").comparedTo("8.003014997345678449870570516442779391368342544615842493280086112245567949654960339642434415085461993e-18")).to.equal(0);

        expect(time.to("quindecennium")).to.equal(2.1341373326255142e-18);
        expect(time.toBig("quindecennium").comparedTo("2.134137332625514253298818804384741171031558011897557998208022963265484786574656090571315844022789865e-18")).to.equal(0);

        expect(time.to("quinquennium")).to.equal(6.402411997876543e-18);
        expect(time.toBig("quinquennium").comparedTo("6.402411997876542759896456413154223513094674035692673994624068889796454359723968271713947532068369594e-18")).to.equal(0);

        expect(time.to("second")).to.equal(1.0102030405060707e-9);
        expect(time.toBig("second").comparedTo("1.010203040506070809e-9")).to.equal(0);

        expect(time.to("septennium")).to.equal(4.576189753687716e-18);
        expect(time.toBig("septennium").comparedTo("4.576189753687716573349278828730883525404073349278828730883525404073349278828730883525404073349278829e-18")).to.equal(0);

        expect(time.to("shake")).to.equal(0.10102030405060708);
        expect(time.toBig("shake").comparedTo("0.1010203040506070809")).to.equal(0);

        expect(time.to("siderealDay")).to.equal(1.1724176980295048e-14);
        expect(time.toBig("siderealDay").comparedTo("1.17241769802950487726383462066389838272533256023477994138857614581666213848483747695820846016014328e-14")).to.equal(0);

        expect(time.to("siderealHour")).to.equal(2.8138024752705506e-13);
        expect(time.toBig("siderealHour").comparedTo("2.813802475270550454837947404729293797691847794709123780192448234638797443507183672693020288737668509e-13")).to.equal(0);

        expect(time.to("siderealMinute")).to.equal(1.6882814851625183e-11);
        expect(time.toBig("siderealMinute").comparedTo("1.688281485162518373331352539432579513856214255001383638390517467471906508012188778996131909500191946e-11")).to.equal(0);

        expect(time.to("siderealMonth")).to.equal(4.2794489136721986e-16);
        expect(time.toBig("siderealMonth").comparedTo("4.279448913672198484611625870246320101855966075050859796735413370712982815614939724528966178265671781e-16")).to.equal(0);

        expect(time.to("siderealSecond")).to.equal(1.0129688910974773e-9);
        expect(time.toBig("siderealSecond").comparedTo("1.012968891097477165921666383631831082612593613606483349155948652174160725027389218342257951564283008e-9")).to.equal(0);

        expect(time.to("siderealYear")).to.equal(3.201084522480119e-17);
        expect(time.toBig("siderealYear").comparedTo("3.201084522480118804202865184851392905846532090423702327129539294273842901626607857185532558319957818e-17")).to.equal(0);

        expect(time.to("solarDay")).to.equal(1.1692164820672116e-14);
        expect(time.toBig("solarDay").comparedTo("1.169216482067211584490740740740740740740740740740740740740740740740740740740740740740740740740740741e-14")).to.equal(0);

        expect(time.to("solarYear")).to.equal(3.201208230667783e-17);
        expect(time.toBig("solarYear").comparedTo("3.201208230667782984593241484517030015277151484634278429492349224084852360479932617019462919872116838e-17")).to.equal(0);

        expect(time.to("svedberg")).to.equal(10102.030405060708);
        expect(time.toBig("svedberg").comparedTo("10102.03040506070809")).to.equal(0);

        expect(time.to("synodicMonth")).to.equal(3.9593387268366087e-16);
        expect(time.toBig("synodicMonth").comparedTo("3.959338726836608753261839382676751372273982718741714495271822247908070749462390675234301845342596292e-16")).to.equal(0);

        expect(time.to("tebisecond")).to.equal(9.187743130551741e-22);
        expect(time.toBig("tebisecond").comparedTo("9.187743130551742151510552503168582916259765625e-22")).to.equal(0);

        expect(time.to("terasecond")).to.equal(1.0102030405060709e-21);
        expect(time.toBig("terasecond").comparedTo("1.010203040506070809e-21")).to.equal(0);

        expect(time.to("timeUnit")).to.equal(9.865264067442098e-7);
        expect(time.toBig("timeUnit").comparedTo("9.865264067442097744140625e-7")).to.equal(0);

        expect(time.to("tropicalYear")).to.equal(3.201208230667783e-17);
        expect(time.toBig("tropicalYear").comparedTo("3.201208230667782984593241484517030015277151484634278429492349224084852360479932617019462919872116838e-17")).to.equal(0);

        expect(time.to("week")).to.equal(1.6703092600960165e-15);
        expect(time.toBig("week").comparedTo("1.670309260096016549272486772486772486772486772486772486772486772486772486772486772486772486772486772e-15")).to.equal(0);

        expect(time.to("year")).to.equal(3.2012059989382715e-17);
        expect(time.toBig("year").comparedTo("3.201205998938271379948228206577111756547337017846336997312034444898227179861984135856973766034184797e-17")).to.equal(0);

        expect(time.to("yobisecond")).to.equal(8.356203698487426e-34);
        expect(time.toBig("yobisecond").comparedTo("8.3562036984874268014305494063306313512473622040488407947123050689697265625e-34")).to.equal(0);

        expect(time.to("yoctosecond")).to.equal(1010203040506070.8);
        expect(time.toBig("yoctosecond").comparedTo("1010203040506070.809")).to.equal(0);

        expect(time.to("yottasecond")).to.equal(1.0102030405060709e-33);
        expect(time.toBig("yottasecond").comparedTo("1.010203040506070809e-33")).to.equal(0);

        expect(time.to("zebisecond")).to.equal(8.556752587251124e-31);
        expect(time.toBig("zebisecond").comparedTo("8.556752587251125044664882592082566503677298896946012973785400390625e-31")).to.equal(0);

        expect(time.to("zeptosecond")).to.equal(1010203040506.0708);
        expect(time.toBig("zeptosecond").comparedTo("1010203040506.070809")).to.equal(0);

        expect(time.to("zettasecond")).to.equal(1.0102030405060709e-30);
        expect(time.toBig("zettasecond").comparedTo("1.010203040506070809e-30")).to.equal(0);

        //#endregion

    });

    it("should convert `from` and `to` using case variations and plurals", () => {

        // Single-word time units
        expect(Time.from(1, "SeCOnD").value).to.equal(1000000000);
        expect(Time.from(1, "seconds").value).to.equal(1000000000);

        // Multi-word time units
        expect(Time.from(1, "draconic month").value).to.equal(2351135808000000);
        expect(Time.from(1, "DraconicMonth").value).to.equal(2351135808000000);
        expect(Time.from(1, "draconic months").value).to.equal(2351135808000000);
        expect(Time.from(1, "DrAcOnIcMoNtHs").value).to.equal(2351135808000000);

    });

    it("should `add`", () => {
        const time = new Time(0.1);

        expect(time.add(new Time(1)).value).to.equal(1.1);
        expect(time.add(new Time(1)).bigValue.comparedTo("1.1")).to.equal(0);

        expect(time.add(new Decimal(1)).value).to.equal(1.1);
        expect(time.add(new Decimal(1)).bigValue.comparedTo("1.1")).to.equal(0);

        expect(time.add(0.1).value).to.equal(0.2);
        expect(time.add(0.1).bigValue.comparedTo("0.2")).to.equal(0);

        expect(time.add(-0.1).value).to.equal(0);
        expect(time.add(-0.1).bigValue.comparedTo("0")).to.equal(0);

        expect(time.add("1e-1").value).to.equal(0.2);
        expect(time.add("1e-1").bigValue.comparedTo("0.2")).to.equal(0);

        expect(time.add(1, "second").value).to.equal(1000000000.1);
        expect(time.add(1, "second").bigValue.comparedTo("1000000000.1")).to.equal(0);
    });

    it("should `divide`", () => {
        const time = new Time(10);

        expect(time.divide(new Time(3)).value).to.equal(3.3333333333333335);
        expect(time.divide(new Time(3)).bigValue.comparedTo("3.333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333")).to.equal(0);

        expect(time.divide(new Decimal(3)).value).to.equal(3.3333333333333335);
        expect(time.divide(new Decimal(3)).bigValue.comparedTo("3.333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333333")).to.equal(0);

        expect(time.divide(-10).value).to.equal(1);
        expect(time.divide(-10).bigValue.comparedTo("1")).to.equal(0);

        expect(time.divide(0).value).to.equal(Infinity);
        expect(time.divide(0).bigValue.isFinite()).to.equal(false);

        expect(time.divide("1e-1").value).to.equal(100);
        expect(time.divide("1e-1").bigValue.comparedTo("100")).to.equal(0);

        expect(time.divide(1, "second").value).to.equal(0.00000001);
        expect(time.divide(1, "second").bigValue.comparedTo("0.00000001")).to.equal(0);
    });

    it("should `multiply`", () => {
        const time = new Time(1.60364078);

        expect(time.multiply(new Time(10)).value).to.equal(16.0364078);
        expect(time.multiply(new Time(10)).bigValue.comparedTo("16.0364078")).to.equal(0);

        expect(time.multiply(new Decimal(10)).value).to.equal(16.0364078);
        expect(time.multiply(new Decimal(10)).bigValue.comparedTo("16.0364078")).to.equal(0);

        expect(time.multiply(2.60201009994e15).value).to.equal(4172689506235659.5);
        expect(time.multiply(2.60201009994e15).bigValue.comparedTo("4172689506235659.5532")).to.equal(0);

        expect(time.multiply(0).value).to.equal(0);
        expect(time.multiply(0).bigValue.comparedTo("0")).to.equal(0);

        expect(time.multiply("1e-1").value).to.equal(0.160364078);
        expect(time.multiply("1e-1").bigValue.comparedTo("0.160364078")).to.equal(0);

        expect(time.multiply(1, "second").value).to.equal(1603640780);
        expect(time.multiply(1, "second").bigValue.comparedTo("1603640780")).to.equal(0);
    });

    it("should `subtract`", () => {
        const time = new Time(0.3);

        expect(time.subtract(new Time(0.2)).value).to.equal(0.1);
        expect(time.subtract(new Time(0.2)).bigValue.comparedTo("0.1")).to.equal(0);

        expect(time.subtract(new Decimal(0.2)).value).to.equal(0.1);
        expect(time.subtract(new Decimal(0.2)).bigValue.comparedTo("0.1")).to.equal(0);

        expect(time.subtract(-0.3).value).to.equal(0.6);
        expect(time.subtract(-0.3).bigValue.comparedTo(0.6)).to.equal(0);

        expect(time.subtract(0.4).value).to.equal(0.1);
        expect(time.subtract(0.4).bigValue.comparedTo("0.1")).to.equal(0);

        expect(time.subtract("3e-1").value).to.equal(0);
        expect(time.subtract("3e-1").bigValue.comparedTo("0")).to.equal(0);

        expect(time.subtract(1, "second").value).to.equal(999999999.7);
        expect(time.subtract(1, "second").bigValue.comparedTo("999999999.7")).to.equal(0);
    });

    it("should throw when `constructor` parameters are invalid", () => {

        // Either decimal.js or timecount should throw errors with "invalid argument"
        expect(() => new Test_Time()).to.throw("Invalid argument");
        expect(() => new Test_Time("not-a-number")).to.throw("Invalid argument");
        expect(() => new Test_Time({ test: "is not a time" })).to.throw("Invalid argument");
    });

    it("should throw when (static) `from` parameters are invalid", () => {

        // If the first parameter is missing (the time value), it should error first
        expect(() => Test_Time.from()).to.throw("Invalid argument");
        expect(() => Test_Time.from("not-a-number")).to.throw("Invalid argument");
        expect(() => Test_Time.from({ test: "is not a time" })).to.throw("Invalid argument");

        // Next, error when the time unit is missing
        expect(() => Test_Time.from(1)).to.throw("Invalid time unit");
        expect(() => Test_Time.from(1, "invalid-time-unit")).to.throw("Invalid time unit");
        expect(() => Test_Time.from(1, { test: "is not a time unit" })).to.throw("Invalid time unit");
    });

    it("should throw when `to` or `toBig` parameters are invalid", () => {
        const time = new Test_Time(1.010203040506070809);

        expect(() => { time.to(); }).to.throw("Invalid time unit");
        expect(() => { time.to("invalid-time-unit"); }).to.throw("Invalid time unit");
        expect(() => { time.to({ test: "is not a time unit" }); }).to.throw("Invalid time unit");
    });

    it("should throw when `add`, `divide`, `multiply` or `subtract` parameters are invalid", () => {
        const time = new Test_Time(1);

        expect(() => time.add()).to.throw("Invalid argument");
        expect(() => time.add("not-a-number")).to.throw("Invalid argument");
        expect(() => time.add({ test: "is not a time" })).to.throw("Invalid argument");

        expect(() => time.add(1, "invalid-time-unit")).to.throw("Invalid time unit");
        expect(() => time.add(1, { test: "is not a time unit" })).to.throw("Invalid time unit");
    });
});
