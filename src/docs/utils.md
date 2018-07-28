This module contains utilities such as timers and stopwatches.

These objects are capable of counting between arbitrary start and stop points in time. The results are all based on the [[Time]] class of the main module.

The exported function [[getProcessTime]] is equivalent to NodeJS v10.7 [`process.hrtime.bigint`](https://nodejs.org/api/process.html#process_process_hrtime_bigint) and is used by all objects of this module.