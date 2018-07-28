### Examples

#### 1. Writing multiple time values

```javascript
import { Time, TimeWriter } from "timecount";

const timeWriter = new TimeWriter();

// Writes the value of 90 minutes using hours:
console.log(timerWriter.write(90, "minute", "hour"));
// Result: 1.5 h

// Writes the value of 90 minutes:
console.log(timerWriter.write(90, "minute"));
// Result: 90 min

// Writes the value of a trillion nanoseconds in minutes:
console.log(timerWriter.write(new Time(1000000000000), "minute");
// Result: 16.666666666666668 min

// By default, timecount will use nanoseconds for input and output:
console.log(timerWriter.write(1000000000000));
// Result: 1000000000000 ns
```

#### 2. Customizing the time output

There are three places where the output of a time writer ([[TimeWriterSettings]]) can be configured, each one overriding the previous:

1. [[Locale]], which is used for translations;
2. The object itself ([[TimeWriter.settings]]);
3. Parameter `options` of the [write](#write) method.

```typescript
const timecount = require("timecount");

const tw = new TimeWriter({ verboseTimeUnit: true });

tw.write(10, "second");
// Result: 10 seconds

tw.write(10, "second", { spaceTimeUnit: false, verboseTimeUnit: false });
// Result: 10s

tw.write(10, "day");
// Result: 10 days

Locale.set("es");

tw.write(10, "day");
// Result: 10 días

tw.settings.verboseTimeUnit = false;

tw.write(10, "second");
// Result: 10 s
```