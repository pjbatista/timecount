### Examples

#### Using a single StopWatch to categorize time segments

```javascript
import { TimeWriter } from "timecount";
import { StopWatch } from "timecount/utils";

const stopWatch = new StopWatch(true);
const timeWriter = new TimeWriter({ verboseTimeUnit: true });

doCategory1();

console.log("Category 1 - ", timeWriter.write(stopWatch.endLap(), "second"));
// Result: Category 1 - 1.454 seconds

doCategory2();

console.log("Category 2 - ", timeWriter.write(stopWatch.endLap(), "second"));
// Result: Category 2 - 3.092017 seconds

stopWatch.pause()

unimportantThing();

stopWatch.resume();

console.log("TOTAL - ", timeWriter.write(stopWatch.stop, "second"));
// Result: Category 1 - 4.589632 seconds
```
