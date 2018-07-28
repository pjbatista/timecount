### Examples

#### 1. Using a single BasicTimer to perform consecutive countings

```javascript
const timecount = require("timecount");
const timer = new timecount.utils.BasicTimer();

while (thereAreThingsToDo) {
    timer.start();

    doTheThings();

    const time = timer.stop().to("second");
    process.stdout.write(`Did thing in ${time} seconds`);
}
```

#### 2. Using a TimeWriter to write BasicTimer results

```javascript
import { TimeWriter } from "timecount";
import { BasicTimer } from "timecount/utils";

const timer = new BasicTimer();
const writer = new TimeWriter({ verboseTimeUnit: true });

timer.start();

doSomething();

const time = timer.end();

console.log(writer.write(time, "milisecond"));
// Result: 10156.663207 miliseconds

console.log(writer.write(time, "second"));
// Result: 10.156663207 seconds

console.log(writer.write(time, "microsecond"));
// Result: 10156663.207 microseconds

console.log(writer.write(time));
// Result: 10156663.207 nanoseconds

console.log(writer.write(time, "minute"));
// Result: 0.169277720116666668 minute

```
