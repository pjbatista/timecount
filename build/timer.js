"use strict";
/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
const time_utils_1 = require("./time-utils");
class Timer {
    get ended() { return !isNaN(this._end); }
    get endTime() { return this._end; }
    get lastResumeTime() { return this._pauseEnd; }
    get options() { return this._options; }
    get paused() { return !isNaN(this._pauseStart) && isNaN(this._pauseEnd); }
    get result() { return this._result; }
    get totalPauseTime() { return this._totalPauseTime; }
    get started() { return !isNaN(this._start); }
    get startTime() { return this._start; }
    constructor(options) {
        this._end = NaN;
        this._result = new time_utils_1.TimeSpan(NaN);
        this._start = NaN;
        this._options = options || {};
        if (this._options.autoStart) {
            this.start();
        }
    }
    end() {
        this._end = this.paused ? this._pauseStart : time_utils_1.TimeUtil.getPreciseTime();
        this._result = new time_utils_1.TimeSpan(this._end - this._start - this._totalPauseTime, this._options);
        return this._result;
    }
    pause() {
        if (this.paused || this.ended || !this.started) {
            return;
        }
        this._pauseEnd = NaN;
        this._pauseStart = time_utils_1.TimeUtil.getPreciseTime();
    }
    resume() {
        if (!this.paused) {
            return 0;
        }
        this._pauseEnd = time_utils_1.TimeUtil.getPreciseTime();
        const pausedTime = this._pauseEnd - this._pauseStart;
        this._totalPauseTime += pausedTime;
        this._pauseStart = NaN;
        return pausedTime;
    }
    start() {
        this._end = NaN;
        this._pauseEnd = NaN;
        this._pauseStart = NaN;
        this._totalPauseTime = 0;
        this._start = time_utils_1.TimeUtil.getPreciseTime();
    }
}
exports.Timer = Timer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdGltZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztnRkFLZ0Y7O0FBRWhGLDZDQUFtRTtBQWdCbkU7SUFXSSxJQUFXLEtBQUssS0FBSyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUdoRCxJQUFXLE9BQU8sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFHMUMsSUFBVyxjQUFjLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBR3RELElBQVcsT0FBTyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBNkIsQ0FBQyxDQUFDLENBQUM7SUFHbkUsSUFBVyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUdqRixJQUFXLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFHNUMsSUFBVyxjQUFjLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO0lBRzVELElBQVcsT0FBTyxLQUFLLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBR3BELElBQVcsU0FBUyxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQVM5QyxZQUFtQixPQUFzQjtRQUVyQyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUkscUJBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFFOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNqQixDQUFDO0lBQ0wsQ0FBQztJQUtNLEdBQUc7UUFFTixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLHFCQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdkUsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHFCQUFRLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRTNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFLTSxLQUFLO1FBRVIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0MsTUFBTSxDQUFDO1FBQ1gsQ0FBQztRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcscUJBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBS00sTUFBTTtRQUVULEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDZixNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2IsQ0FBQztRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUUzQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDckQsSUFBSSxDQUFDLGVBQWUsSUFBSSxVQUFVLENBQUM7UUFFbkMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDdkIsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBS00sS0FBSztRQUVSLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDO1FBRXpCLElBQUksQ0FBQyxNQUFNLEdBQUcscUJBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0NBQ0o7QUE5R0Qsc0JBOEdDIn0=