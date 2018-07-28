### Examples

#### Using a Timer to count important operation bits

```javascript
import timecount = require("timecount");

const timer = new timecount.utils.Timer();

notImportant();

timer.start();

importantStuff();

timer.pause();

thisIsAlsoNotImportant();

timer.resume();

moreImportantStuff();

console.log(`Total time: ${timer.stop().to("nanosecond")} nanoseconds`);
```
