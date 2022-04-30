**Measures, converts and writes time using different units. Includes timers and stopwatches with nanosecond precision.**

## Coming soon (version 2)

- 🏗 Built from scratch
- 👀 Simpler codebase
- 📚 Improved documentation
- ⏳ **101 units of time**
- ⚡ Much faster than v1

## Features

- Encapsulated [time objects](#time-object)
- **71 time units** available for conversion (from the [Planck time](https://pjbatista.github.io/timecount/interfaces/_index_.timeunitdatabase.html#plancktime) to the [yobisecond](https://pjbatista.github.io/timecount/interfaces/_index_.timeunitdatabase.html#yobisecond))
- [Write](#writing-time) and [countdown](#countdown) times using symbols or verbose
- [Internationalization](#translations)
- [Timers](#timers) and [stopwatches](#stopwatches) with **nanosecond precision** (and the minimum possible overhead)

## Summary

- [Installation](#installation)
- [Upgrading](#upgrading)
- [Usage](#usage)
    - [Time object](#time-object)
    - [Writing time](#writing-time)
    - [Countdown](#writing-time)
    - [Translations](#translations)
    - [Timers](#timers)
    - [StopWatches](#stopwatches)
- [Links](#links)
- [License](#links)

## Installation

This module can be installed with the node package manager of your choice:

1. **Using [NPM](https://www.npmjs.com/):**

    ```bash
    # As a dependency:
    npm install timecount --save

    # As a development dependency:
    npm install timecount --save-dev
    ```

2. **Using [Yarn](https://yarnpkg.com/):**

    ```bash
    # As a dependency:
    yarn add timecount

    # As a development dependency:
    yarn add timecount -D
    ```

Or download a release ready to be used on browsers:

- Latest Release: [timecount-1.1.1](https://github.com/pjbatista/timecount/releases/download/v1.1.1/timecount-v1.1.1.zip)
- All releases: [https://github.com/pjbatista/timecount/releases](https://github.com/pjbatista/timecount/releases)

---

[Back to top](#features) | [Skip to usage](#usage)

## Upgrading

Old versions of timecount (<= 0.1.3) are now **obsolete**.

The code is much less cluttered now, which means less overhead, which means more precise timers and stopwatches. Here is a simple example on how to upgrade:

1. EcmaScript 6

    ```javascript
    // --- OLD ---
    import { Timer } from "timecount";

    const timer = new Timer({ autoStart: true });

    // Do your stuff...
    const time = timer.end();
    console.log(time.toSeconds());

    // --- NEW ---
    import { Timer } from "timecount/utils";

    const timer = new Timer(true);

    // Do your stuff...
    const time = timer.stop();
    console.log(time.to("second"));
    ```

2. Older EcmaScripts:

    ```javascript
    // --- OLD ---
    var timecount = require("timecount");
    var timer = new timecount.Timer({ autoStart: true });

    // Do your stuff...
    var time = timer.end();
    console.log(time.toSeconds());

    // --- NEW ---
    var timecount = require("timecount");
    var timer = new timecount.utils.Timer(true);

    // Do your stuff...
    var time = timer.stop();
    console.log(time.to("second"));
    ```

Please consult the [Full Upgrading Documentation](https://github.com/pjbatista/timecount/blob/master/UPGRADING.md) for more information.

---

[Back to top](#features)

## Usage

Navigate: <code>[Time object](#time-object) | [Writing time](#writing-time) | [Countdown](#countdown) | [Translations](#translations) | [Timers](#timers) | [Stopwatches](#stopwatches)</code>

---

Time in timecount is internally based on nanoseconds, in order to better accomodate the precision on most orders of magnitude.

> 💡 A [Planck time](https://pjbatista.github.io/timecount/interfaces/_index_.timeunitdatabase.html#plancktime) (smallest unit available) fits ~5x10³⁵ times inside a nanosecond and a nanosecond fits ~10³³ times inside a [yobisecond](https://pjbatista.github.io/timecount/interfaces/_index_.timeunitdatabase.html#yobisecond) (largest unit available).

After installing, it will be readily available to be imported:

- EcmaScript 6:

    ```javascript
    import { Time, TimeWriter } from "timecount";
    import { Locale } from "timecount/localization";
    import { BasicTimer, StopWatch, Timer } from "timecount/utils";
    ```

- Older EcmaScripts:

    ```javascript
    var timecount = require("timecount");

    // Sub-modules can be accessed directly through the main module
    timecount.Locale.set("pt");
    var stopwatch = new timecount.utils.StopWatch();
    ```

> ⚠ From now on, unless stated otherwise, examples on this document will assume the use of EcmaScript 6 or equivalent.

### Time object

<code>[**Usage**](#usage) | &#xbb;Time object&#xab; | [Writing time](#writing-time) | [Countdown](#countdown) | [Translations](#translations) | [Timers](#timers) | [Stopwatches](#stopwatches)</code>

---

[Time](https://pjbatista.github.io/timecount/classes/_index_.timewriter.html) objects are nanosecond-based encapsulations of time values used throughout most of timecount.

More examples, including all time units available can be found at [API Documentation: Time](https://pjbatista.github.io/timecount/classes/_index_.time.html#examples).

```javascript
let time = new Time(1);
// Represents 1 nanosecond

time.value;    // 1 (number)
time.bigValue; // 1 (big decimal*)
```

Time constructors are versatile and accept numbers, strings (with numeric values), other time objects and [*big decimals](https://mikemcl.github.io/decimal.js):

```javascript
time = new Time(50);                              // 50 ns
time = new Time("5.425e+4");                      // 54250 ns
time = new Time(time.subtract(1, "microsecond")); // 53250 ns
time = new Time(new Decimal(150));                // 150 ns

// Times are always absolute (no negatives):

time = new Time(-50);        // 50 ns
time = new Time("-1.5e+10"); // 15009000000 ns

```

To convert `to` or `from` any of the [available time units](https://pjbatista.github.io/timecount/interfaces/_index_.timeunitdatabase.html):

```javascript
const time = Time.from(1, "second");
// 1 second = 1000000000 nanoseconds

time.to("minute");      // 0.01666666666666666667
time.to("second");      // 1
time.to("microsecond"); // 1000000
time.to({ factor: 2 }); // 500000000
time.value;             // 1000000000

Time.from(time.to("second"), "second"); // 1000000000
```

Basic arithmetics (including conversions):

```javascript
let time = new Time(10);          // 10 ns
time.add(10);                     // 20 ns
time.add(10, "second");           // 1000000000010 ns
time.add(Time.from(1, "second")); // 1000000000010 ns

time = new Time(0.3);       // 0.3 ns
time.subtract(0.1);         // 0.2 ns
time.subtract("0.1");       // 0.2 ns
time.subtract(1, "second"); // 999999999.7 ns
time.subtract(new Time(1)); // 0.7 ns
```

---

[Back to usage](#usage) | [Back to top](#features)

### Writing time

<code>[**Usage**](#usage) | [Time object](#time-object) | &#xbb;Writing time&#xab; | [Countdown](#countdown) | [Translations](#translations) | [Timers](#timers) | [Stopwatches](#stopwatches)</code>

[Time writers](https://pjbatista.github.io/timecount/classes/_index_.timewriter.html) are able to synthesize strings describing time values using SI symbols, human-readable names, [translations](#internationalization), different numeric notations and [much more](https://pjbatista.github.io/timecount/interfaces/_index_.timewritersettings.html).

More examples, including all syntaxes of `countdown` and `write` are available at [API Documentation: TimeWriter](https://pjbatista.github.io/timecount/classes/_index_.timewriter.html#examples) and all possible configurations at [API Documentation: TimeWriterSettings](https://pjbatista.github.io/timecount/interfaces/_index_.timewritersettings.html).

---

First, there are many "overloads" to the [write method](https://pjbatista.github.io/timecount/classes/_index_.timewriter.html#write):

```javascript
const timeWriter = new TimeWriter();
const time = new Time(1000000000);

timeWriter.write(time);               // "1000000000 ns"
timeWriter.write(time, "second");     // "1 s"
timeWriter.write(time, "millisecond"); // "1000 ms"
```

It can also convert/write time values directly:

```javascript
timeWriter.write(1);                           // "1 ns"
timeWriter.write("1");                         // "1 ns"
timeWriter.write("1e+0");                      // "1 ns"
timeWriter.write(1, "second");                 // "1 s"
timeWriter.write(1e0, "second", "nanosecond"); // "1000000000 ns"
timeWriter.write(1, "second", "minute");       // "0.01666666666666666667 min"
timeWriter.write("100", "svedberg");           // "100 Sv"
timeWriter.write("1e2", "year", "year");       // "100 y"
```

And there also many ways to configure it:

```javascript
let timeWriter = new TimeWriter({ verbose: true });

timeWriter.write(10, "second", "millisecond");
// "10000 milliseconds"

timeWriter.write("10", "second", "kibisecond", { numericNotation: "scientific" });
// "1.024e+7 kibiseconds"

timeWriter.write(10, "second", "nanosecond", { thousandsSeparator: "," });
// "1,000,000,000 ns"

timeWriter = new TimeWriter({
    decimalDigits: 4,
    termApproximately: "more or less",
    termInfinite: "eternal",
    termNaN: "inexistent",
    verbose: true
});

timeWriter.write(1, "second", "siderealSecond");
// "more or less 1.0027 sidereal seconds"

timeWriter.write(1, "second", "siderealSecond", { hideTimeUnit: true });
// "more or less 1.0027"

timeWriter.write(Infinity);
// "eternal nanoseconds"

timeWriter.write(NaN);
// "inexistent nanosecond"

// Method options override instance options:

timeWriter.write(1998, "year", { numericNotation: "roman" });
// "MCMXCVIII years"

timeWriter.write(1998.5, "year", { numericNotation: "roman-fractions" });
// "MCMXCVIIIS years"

```

**[There are many configurations available!](https://pjbatista.github.io/timecount/interfaces/_index_.timewritersettings.html)**. Oh, and in case it isn't clear by now, time units with no symbol will always be verbose:

```javascript
timeWriter.write(new Time(1000000000), "shake");           // "100000000 shakes"
timeWriter.write(new Time(1000000000), "siderealSecond");  // "≈1.0027379155283682 sidereal seconds"
```

---

[Back to usage](#usage) | [Back to top](#features)

### Countdown

<code>[**Usage**](#usage) | [Time object](#time-object) | [Writing time](#writing-time) | &#xbb;Countdown&#xab; | [Translations](#translations) | [Timers](#timers) | [Stopwatches](#stopwatches)</code>

---

The [countdown](https://pjbatista.github.io/timecount/classes/_index_.timewriter.html#countdown) method of time writers expands upon their [writing abilities](#writing-time), creating an interface to represent a time segmenting its remaining fractions in various orders of magnitude (time units).

This helps the expression of a more comprehensible information, i.e. help a human user understand a time length using common time unit divisions:

```javascript
const time = Time.from(5623098, "second");

// What does 5623098 seconds reaaaally mean?

timeWriter.countdown(time, { verbose: true });
// 2 months, 4 days, 5 hours, 58 minutes, 18 seconds

```

By default, the segments are: `"year", "month", "day", "hour", "minute", "second", "millisecond"` or the constant [TimeSegments.common](https://pjbatista.github.io/timecount/modules/_index_.html#timesegments).

```javascript
// There are a few constants aimed at common operations
import { TimeSegments } from "timecount";

const time = Time.from(5623098, "second");

timeWriter.countdown(time);
// 2 m, 4 d, 5 h, 58 min, 18 s

timeWriter.countdown(time, TimeSegments.common);
// 2 m, 4 d, 5 h, 58 min, 18 s

timeWriter.countdown(time, { hideZeroSegments: false }, TimeSegments.common);
// 0 y, 2 m, 4 d, 5 h, 58 min, 18 s

timeWriter.countdown(time, TimeSegments.baseTen);
// 5 Ms, 623 Ks, 98 s

timeWriter.countdown(time, TimeSegments.binary);
// 5 Mis, 371 Kis, 314 s

timeWriter.countdown(Time.from(10, "planckTime").add(10, "yobisecond"), TimeSegments.extremes);
// 10 Yis, 10 tₚ

timeWriter.countdown(Time.from(10, "planckTime").add(10, "yobisecond"), { hideZeroSegments: false }, TimeSegments.extremes);
// 10 Yis, 0 ns, 10 tₚ
```

Also, [there are some configurations specific to countdowns](https://pjbatista.github.io/timecount/interfaces/_index_.timewritersettings.html).

---

[Back to usage](#usage) | [Back to top](#features)

### Translations

<code>[**Usage**](#usage) | [Time object](#time-object) | [Writing time](#writing-time) | [Countdown](#countdown) | &#xbb;Translations&#xab; | [Timers](#timers) | [Stopwatches](#stopwatches)</code>

---

For now, timecount is available in:

- 🇺🇸 English (US)
- 🇧🇷 Portuguese (Brazil)
- 🇵🇹 Portuguese (Portugal)
- 🇲🇽 Spanish (Mexico)
- 🇪🇸 Spanish (Spain)

To translate the output of time writers, import the [Locale](https://pjbatista.github.io/timecount/classes/_localization_.locale.html) class from `"localization"`. It is a static class able to load settings from translation files.

```javascript
import { TimeWriter } from "timecount";
import { Locale } from "timecount/localization";

const timeWriter = new TimeWriter({ verbose: true });

timeWriter.write(10.5, "biennium");
// "10.5 biennia"

timeWriter.write(Infinity, "tropicalYear");
// "approximately infinite tropical years"

// Changing the language to Portuguese, without setting the region
// Timecount will choose the most populated region variation (in this case Brazilian Portuguese)
Locale.set("pt");

timeWriter.write(10.5, "biennium");
// "10,5 biênios"

timeWriter.write(Infinity, "tropicalYear");
// "aproximadamente infinitos anos tropicais"

// Changing the language to a regionalized Portuguese
// In this case, Portuguese (Portugal)
Locale.set("pt-pt");

timeWriter.write(10.5, "biennium");
// "10,5 biénios"

timeWriter.write(Infinity, "tropicalYear");
// "cerca de infinitos anos tropicais"
```

---

[Back to usage](#usage) | [Back to top](#features)

**Timecount needs your help!** Please contribute with a translation: see [Contributing: Translating](https://github.com/pjbatista/timecount/blob/master/CONTRIBUTING.md#translating).

### Timers

<code>[**Usage**](#usage) | [Time object](#time-object) | [Writing time](#writing-time) | [Countdown](#countdown) | [Translations](#translations) | &#xbb;Timers&#xab; | [Stopwatches](#stopwatches)</code>

---

These objects were the main focus of previous versions of timecount, however now they are part of the `"timecount/utils"` module.

There are the [basic timers](https://pjbatista.github.io/timecount/classes/_utils_.basictimer.html) — capable of counting time during runtime...

```javascript
const timer = new BasicTimer();

timer.start();

// [...] Operation that costs 100 milliseconds

const totalTime = timer.stop();

totalTime.to("millisecond");
// 101.0200193704
```

...and [timers](https://pjbatista.github.io/timecount/classes/_utils_.timer.html) which do everything a _basic timer_ does plus pausing.

```javascript
// True can be passed to any type of timer to auto-start
const timer = new Timer(true);

// [...] Operation that costs ~1.5 seconds (total 1.5 s)

timer.pause();

// [...] Another operation that costs ~2 seconds (not counted)

timer.resume();

// [...] Another operation that costs ~2.5 seconds (total 4 s)

const totalTime = timer.stop();

totalTime.value;
// 4006232032

totalTime.to("second");
// 4.006232032
```

For more examples, consult the [API Documentation: timer examples](https://pjbatista.github.io/timecount/classes/_utils_.timer.html#examples).

---

[Back to usage](#usage) | [Back to top](#features)

### StopWatches

<code>[**Usage**](#usage) | [Time object](#time-object) | [Writing time](#writing-time) | [Countdown](#countdown) | [Translations](#translations) | [Timers](#timers) | &#xbb;Stopwatches&#xab;</code>

---

[Stopwatches](https://pjbatista.github.io/timecount/classes/_utils_.stopwatch.html) do everything a _timer_ do plus segment time (creating what is called a "lap").

```javascript
import { StopWatch } from "timecount/utils";

// Stopwatches can also be auto-started
const stopwatch = new StopWatch(true);

for (const iterationObject of iterator) {

    // [...] Do something that takes ~1.2 ms

    const iterationTime = stopwatch.endLap();

    iterationTime.to("millisecond");
    // 1.234058872109
}

// Considering a total of 8 "laps":
const totalProcessingTime = stopwatch.stop();

totalProcessingTime.to("millisecond");
// 10.09183728197809584
```

For more examples, consult the [API Documentation: stopwatch examples](https://pjbatista.github.io/timecount/classes/_utils_.stopwatch.html#examples).

---

[Back to usage](#usage) | [Back to top](#features)

## Links

- [Contributing / Translating](https://github.com/pjbatista/timecount/blob/master/CONTRIBUTING.md)
- [List of Contributors](https://github.com/pjbatista/timecount/blob/master/AUTHORS.md)
- [Project Changelog](https://github.com/pjbatista/timecount/blob/master/CHANGELOG.md)
- [API Documentation](https://pjbatista.github.io/timecount)

---

[Back to top](#features)

## License

Copyright &copy; 2017-2018 Pedro José Batista

MIT License (see [LICENSE](https://github.com/pjbatista/timecount/blob/master/LICENSE) for more information).
