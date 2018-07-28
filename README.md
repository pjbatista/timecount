This document contains information about the installation, configuration and usage of timecount, a NodeJS module capable of counting, measuring and converting time (from the [Planck time](https://pjbatista.github.io/timecount/interfaces/_index_.timeunitdatabase.html#planckTime) to the [yobisecond](https://pjbatista.github.io/timecount/interfaces/_index_.timeunitdatabase.html#yobisecond)). It also packages [timers and stopwatches](#timers-and-stopwatches) with nanosecond precision*.

<small>* Since we're talking nanoseconds, there is an obvious overhead between the time obtained by NodeJS `process` and the time it takes for objects to proccess data.</small>

## Summary

- [Installation](#installation)
- [Upgrading (from version pre-1.0.0)](#upgrading-from-versions-pre-1.0.0)
- [Usage](#usage)
  - [Measuring and converting time](#measuring-and-converting-time)
  - [Translations / Localization](#translations-/-localization)
  - [Timer and stopwatches](#timers-and-stopwatches)
- [Links](#links)
- [License](#links)

## Installation

This module can be installed with the node package manager of your choice:

`npm install timecount --save`

-or-

`yarn add timecount`

Make sure to install a **version >= 1.0.0** for a more concise experience (timecount now has **61 time units available** for conversion, instead of 10 of the previous versions).

## Upgrading (from versions pre-1.0.0)

The old versions of timecount (<= 0.1.3) are now **obsolete**.

If you had timecount installed before version 1.0.0, you may want to refer to the [API Documentation: Upgrading](https://pjbatista.github.io/timecount/index.html#upgrading).

## Usage

> Time in `timecount` is internally based on nanoseconds. This is done in order to better accomodate all time unit conversions: a [Planck time](https://pjbatista.github.io/timecount/interfaces/_index_.timeunitdatabase.html#planckTime) (smallest time unit available) fits ~5x10³⁵ times inside a nanosecond, and a nanosecond fits ~10³³ times inside a [yobisecond](https://pjbatista.github.io/timecount/interfaces/_index_.timeunitdatabase.html#yobisecond) (largest time unit available).

The main module of timecount, which can be obtained by requiring/importing `"timecount"`, contains [time](https://pjbatista.github.io/timecount/classes/_index_.time.html) and [time unit](https://pjbatista.github.io/timecount/classes/_index_.timeunit.html)-related operations, such as converting, parsing and writing.

### Measuring and converting time

Timecount packages an object called [time writers](https://pjbatista.github.io/timecount/classes/_index_.timewriter.html), which can be use in many different ways:

```javascript
import { Time, TimeWriter } from "timecount";

const timeWriter = new TimeWriter();

console.log(timeWriter.write(120, "second", "minute"));
// Result: 2 min

console.log(timeWriter.write(120, "second"));
// Result: 120 s

console.log(new Time(1));
// Result: 1 ns

console.log(new Time(200000000), "second", { verboseTimeUnit: true });
// Result: 0.2 second

console.log(timeWriter.write(1954, "year", {
  customPlural: "anno",
  numericNotation: "roman"
}));
// Result: MCMLIV anno
```

For more examples, consult the [API Documentation: time writer examples](https://pjbatista.github.io/timecount/classes/_index_.timewriter.html#examples).

### Translations / Localization

For now, timecount is available in 🇺🇸 English (US), 🇧🇷 Portuguese (Brazil), 🇵🇹 Portuguese (Portugal), 🇪🇸 Spanish (Spain) and 🇲🇽 Spanish (Mexico).

To localize the output of time writers, import and `set` the [Locale](https://pjbatista.github.io/timecount/classes/_localization_.locale.html):

```javascript
import { TimeWriter } from "timecount";
import { Locale } from "timecount/localization";

const timeWriter = new TimeWriter({ verboseTimeUnit: true });

timeWriter.write(10.5, "day");
// Result: 10.5 days

// Changing the language to Portuguese (Brazil)
Locale.set("pt-br");

timeWriter.write(10.5, "day");
// Result: 10,5 dias
```

If you wish to contribute with a new translation, please see [Contributing: Translating](https://github.com/pjbatista/timecount/blob/master/CONTRIBUTING.md#translating).

### Timers and stopwatches

These objects were the main focus of previous versions of timecount, however now they are part of the `"timecount/utils"` module.

[Basic timers](https://pjbatista.github.io/timecount/classes/_utils_.basictimer.html) can measure the time passed between its start and stop, [timers](https://pjbatista.github.io/timecount/classes/_utils_.timer.html) are able to pause and resume the time counting and [stopwatches](https://pjbatista.github.io/timecount/classes/_utils_.stopwatch.html) can split time during the count, creating "laps".

- **Example 1: Timer**

```javascript
import { Timer } from "timecount/utils";

// True can be passed to the timer to auto-start it
const timer = new Timer(true);

// [...] Operation that costs ~1.5 seconds (total 1.5 s)

timer.pause();

// [...] Another operation that costs ~2 seconds (not counted)

timer.resume();

// [...] Another operation that costs ~2.5 seconds (total 4 s)

const endTime = timer.stop();

console.log(endTime.nanoseconds);
// Result: 4006232032

console.log(endTime.to("second"));
// Result 4.006232032
```

For more examples, consult the [API Documentation: timer examples](https://pjbatista.github.io/timecount/classes/_utils_.timer.html#examples).

- **Example 2: StopWatch**

```javascript
import { TimeWriter } from "timecount";
import { StopWatch } from "timecount/utils";

// Stopwatches can also be auto-started
const stopwatch = new StopWatch(true);
const timeWriter = new TimeWriter({ defaultTimeUnit: "milisecond" });

for (const iterationObject of iterator) {
  // [...] Do something here that takes ~1.2 ms
  const iterationTime = stopwatch.endLap();

  console.log(timeWriter.write(iterationTime));
  // Result: 1.2 miliseconds
}

// Considering a total of 8 laps:
const totalProcessingTime = stopwatch.stop();
console.log(timeWriter.write(totalProcessingTime));
// Result: 9.6 miliseconds
```

For more examples, consult the [API Documentation: stopwatch examples](https://pjbatista.github.io/timecount/classes/_utils_.stopwatch.html#examples).

## Links

- [Contributing / Translating](https://github.com/pjbatista/timecount/blob/master/CONTRIBUTING.md)
- [List of Contributors](https://github.com/pjbatista/timecount/blob/master/AUTHORS.md)
- [Project Changelog](https://github.com/pjbatista/timecount/blob/master/CHANGELOG.md)
- [API Documentation](https://pjbatista.github.io/timecount)

## License

Copyright (c) 2017-2018 Pedro José Batista

MIT License (see [LICENSE](https://github.com/pjbatista/timecount/blob/master/LICENSE) for more information).
