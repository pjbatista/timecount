### Examples

1. Using a single BasicTimer to perform consecutive countings
    ```javascript
    import { BasicTimer } from "timecount/utils";

    const timer = new BasicTimer();

    while (thereAreThingsToDo) {
        timer.start();

        doTheThings();

        timer.stop().to("second");
        // 0.8956 s
    }
    ```
2. Using a TimeWriter to write BasicTimer results
    ```javascript
    import { TimeWriter } from "timecount";
    import { BasicTimer } from "timecount/utils";

    const timer = new BasicTimer();
    const writer = new TimeWriter({ verbose: true });

    timer.start();

    timeWriter.write(timer.elapsedTime, "milisecond");
    // 0.54021 miliseconds

    doSomething();

    const time = timer.stop();

    timeWriter.write(time, "milisecond");
    // 10156.663207 miliseconds

    timeWriter.write(time, "second");
    // 10.156663207 seconds

    timeWriter.write(time, "minute");
    // 0.169277720116666668 minute
    ```
