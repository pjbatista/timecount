import { Time, TimeWriter } from "./src";
import { Locale } from "./src/localization";
import { BasicTimer, StopWatch, Timer } from "./src/utils";

function w(... strings: string[]) {
    for (const str of strings) {
        process.stdout.write(str);
    }

    process.stdout.write("\n");
}

const timeWriter = new TimeWriter({ defaultTimeUnit: "second", verboseTimeUnit: true });
const stopwatch = new StopWatch(true);
const tw = (... args: any[]) => timeWriter.write.apply(timeWriter, args);

w(tw(NaN, "synodicMonth"));
w(tw(Infinity, "day"));
Locale.set("pt-br");

w(Locale.currentIdentifier);
w(tw(15, "septennium"));
w(tw(1954, "year"));
w("anno ", tw(1954, "year", { hideTimeUnit: true, numericNotation: "roman" }));
w(tw(1954, "year", "galacticYear", { numericNotation: "scientific" }));
w(tw(1954, "year", "anomalistcYear"));
w(tw(1954, "year", "draconicYear"));
w(tw(4.2, "jiffy"));
w(tw(0.44589667228038488867628132803821e-67 * 5, "yobisecond", "planckTime"));
stopwatch.endLap();

setTimeout(() => {
    w(tw(5.3905600000000000125837232640002e-44 / 2, "second", "planckTime"));
    w(tw(17, "month"));
    w(tw(17, "month", "anomalistcMonth"));
    w(tw(17, "month", "draconicMonth"));
    w(tw(17, "month", "siderealMonth"));
    w(tw(17, "month", "synodicMonth"));
    w(tw(NaN, "synodicMonth"));
    w(tw(Infinity, "day"));
    w(tw(new Time(1000000000000), "minute"));
    w(tw((1 / 36) + 7000, "second", { numericNotation: "roman-fractions" }));
    w(tw((1 / 36) + 7000, "second", { numericNotation: "roman" }));

    stopwatch.stop((laps, error) => {
        timeWriter.settings.defaultTimeUnit = "milisecond";
        w("Volta 1: ", tw(laps[0]), ", Volta 2: ", tw(laps[1]), ", Erro: ",
            new Time(error).to("milisecond").toString());
    });

    w("Fim");
}, 500);
