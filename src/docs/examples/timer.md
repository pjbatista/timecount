### Examples

1. Using a single Timer to perform consecutive countings
    ```javascript
    import { Timer } from "timecount/utils";

    const timer = new Timer();

    while (thereAreThingsToDo) {
        timer.start();

        doTheThings();

        timer.stop().to("second");
        // 0.960041 s
    }
    ```
2. Using a TimeWriter to write Timer results
    ```javascript
    import { TimeWriter } from "timecount";

    const timer = new Timer();
    const timeWriter = new TimeWriter({ verbose: true });

    timer.start();

    timeWriter.write(timer.elapsedTime, "millisecond");
    // 0.54021 milliseconds

    doSomething();

    const time = timer.stop();

    timeWriter.write(time, "millisecond");
    // 10156.663207 milliseconds

    timeWriter.write(time, "second");
    // 10.156663207 seconds

    timeWriter.write(time, "minute");
    // 0.169277720116666668 minute
    ```
3. Pausing and resuming the timer
    ```javascript
    const timer = new Timer(true);

    thingsYouWantMeasured(); // Let's say this takes 5 seconds

    timer.pause();

    thingsYouDontWantMeasured(); // And this another 5 seconds

    timer.stop().to("second");
    // 5 s (paused time is not counted)

    ```