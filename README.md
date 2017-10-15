# timecount

> Timer and stopwatch with nanosecond precision and easy usage.

## About

This module contains a nanosecond-precise timer and stopwatch that can easily be integrated into any project with:

`npm install timecount --save`

## Usage

For the full documentation, download [timecount-docs.zip](https://github.com/pjbatista/timecount/blob/master/timecount-docs.zip).

### Timer

```javascript
var timecount = require("timecount");

var timer = new timecount.Timer();
timer.start();

// Later...

var result = timer.end();

// Printing nanoseconds
console.log(result.toNanoSeconds()); // 3150411554.00 ns

// Changing decimal separator and printing microseconds
timer.options.decimalSeparator = ",";
console.log(result.toMicroSeconds()); // 3150415,54 μs

// Changing unit separation and printing miliseconds
timer.options.separateUnitFromNumber = false;
console.log(result.toMiliSeconds()); // 3150,42ms

// Resetting options to default and printing seconds
timer.options.reset();
console.log(result.toSeconds()); // 3.15 s

// Changing units to be verbose and printing minutes
timer.options.verboseUnit = true;
console.log(result.toMinutes()); // 0.05 minutes

// Changing number precision to 8 and printing hours
timer.options.precision = 8;
console.log(result.toHours()); // 0.00087498 hours

// Resetting again and printing using toString (selects best unit)
console.log(result.toString()); // 3.15 s
```

### StopWatch

```javascript
var timecount = require("timecount");

var stopwatch = new timecount.StopWatch();
stopwatch.start();

// Later...

// Getting a lap result
var lap1 = stopwatch.endLap();
console.log(lap1.toString()); // 1.10 s

// Getting the next lap's result in a different format
stopwatch.options.precision = 5;
var lap2 = stopwatch.endLap();
console.log(lap2.toString()); // 2.60212 s

// Getting the final result in the default format
stopwatch.options.reset();
var finalResult = stopwatch.end();
console.log(finalResult.toString()); // 2.60212 s
```

## Changelog

### Version 0.0.1 (2017-10-14)

First version of this module; contains a fully functional Timer and StopWatch.

## Credits

- Pedro Batista

## License

Copyright (c) 2017 Pedro Batista
MIT License (see [License](https://github.com/pjbatista/timecount/blob/master/LICENSE)).
