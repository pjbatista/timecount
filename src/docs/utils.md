This module contains runtime time counting utilities, i.e. objects that are able to measure the duration of operations during execution.

Such objects are capable of counting between arbitrary **start** and **stop** points in time. The results are all based on [time objects](../classes/_index.time.html).

Employ one of the following snippets to use it in your project:

- EcmaScript 6 or equivalent:
    ```javascript
    import { BasicTimer, StopWatch, Timer } from "timecount/utils";
    ```
- Older EcmaScripts:
    ```javascript
    var localization = require("timecount").utils;
    // -or
    var timecount = require("timecount/utils");
    ```

> 💡 The exported function [`getProcessTime`](#getprocesstime) is equivalent to Node's [`process.hrtime.bigint`](https://nodejs.org/api/process.html#process_process_hrtime_bigint), except it returns the big decimal from [decimal.js](https://mikemcl.github.io/decimal.js) instead of the library used by Node.
