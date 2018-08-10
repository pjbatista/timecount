### Examples

1. Using a single StopWatch to perform consecutive countings
    ```javascript
    import { StopWatch } from "timecount/utils";

    const stopwatch = new StopWatch();

    while (thereAreThingsToDo) {
        stopwatch.start();

        doTheThings();

        stopwatch.stop().to("second");
        // 1.2021 s
    }
    ```
2. Using a TimeWriter to write StopWatch results
    ```javascript
    import { TimeWriter } from "timecount";

    const stopwatch = new StopWatch();
    const timeWriter = new TimeWriter({ verbose: true });

    stopwatch.start();

    doSomething();

    const time = timer.stop();

    timeWriter.write(time, "milisecond");
    // 10156.663207 miliseconds

    timeWriter.write(time, "second");
    // 10.156663207 seconds

    timeWriter.write(time, "minute");
    // 0.169277720116666668 minute
    ```
3. Pausing and resuming the stopwatch
    ```javascript
    const stopwatch = new StopWatch(true);

    thingsYouWantMeasured(); // Let's say this takes 5 seconds

    stopwatch.pause();

    thingsYouDontWantMeasured(); // And this another 5 seconds

    stopwatch.stop().to("second");
    // 5 s (paused time is not counted)

    ```
4. Creating time categories according to the stopwatch laps
    ```javascript
    import { TimeWriter } from "timecount";
    import { StopWatch } from "timecount/utils";

    const stopWatch = new StopWatch(true);
    const timeWriter = new TimeWriter({ verbose: true });

    doCategory1();

    "Category 1: " + timeWriter.write(stopWatch.endLap(), "second");
    // Category 1: 1.454 seconds

    doCategory2();

    console.log("Category 2 - ", timeWriter.write(stopWatch.endLap(), "second"));
    // Category 2: 3.092017 seconds

    stopWatch.pause()

    unimportantThing();

    console.log("TOTAL - ", timeWriter.write(stopWatch.stop(), "second"));
    // Result: Category 1 - 4.589632 seconds
    ```
