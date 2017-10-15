"use strict";
/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
const time_utils_1 = require("./time-utils");
const timer_1 = require("./timer");
class StopWatch extends timer_1.Timer {
    get lapCount() { return this._lapIndex; }
    get lapResults() { return this._lapResults; }
    constructor(options) {
        super(options);
    }
    end() {
        this.endLap();
        return super.end();
    }
    endLap() {
        if (!this.started) {
            return new time_utils_1.TimeSpan(NaN, this.options);
        }
        const index = this._lapIndex;
        const startTime = index === 0 ? this.startTime : this._lapEndTimes[index - 1];
        const endTime = time_utils_1.TimeUtil.getPreciseTime() - this._lapTotalPauseTime;
        const result = new time_utils_1.TimeSpan(endTime - startTime, this.options);
        this._lapEndTimes[index] = endTime;
        this._lapResults[index] = result;
        this._startLap();
        return result;
    }
    resume() {
        const pausedTime = super.resume();
        this._lapTotalPauseTime += pausedTime;
        return pausedTime;
    }
    start() {
        this._lapEndTimes = [];
        this._lapIndex = 0;
        this._lapResults = [];
        this._lapTotalPauseTime = 0;
        super.start();
    }
    _startLap() {
        this._lapIndex += 1;
        this._lapTotalPauseTime = 0;
    }
}
exports.StopWatch = StopWatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcHdhdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3N0b3B3YXRjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O2dGQUtnRjs7QUFFaEYsNkNBQWdEO0FBQ2hELG1DQUE0QztBQU01QyxlQUF1QixTQUFRLGFBQUs7SUFRaEMsSUFBVyxRQUFRLEtBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBR2hELElBQVcsVUFBVSxLQUFLLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQVNwRCxZQUFtQixPQUFzQjtRQUNyQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkIsQ0FBQztJQU1NLEdBQUc7UUFFTixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFLTSxNQUFNO1FBRVQsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLENBQUMsSUFBSSxxQkFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDN0IsTUFBTSxTQUFTLEdBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDOUUsTUFBTSxPQUFPLEdBQUcscUJBQVEsQ0FBQyxjQUFjLEVBQUUsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7UUFFcEUsTUFBTSxNQUFNLEdBQUcsSUFBSSxxQkFBUSxDQUFDLE9BQU8sR0FBRyxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRS9ELElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDO1FBQ25DLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUVqQixNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFLTSxNQUFNO1FBRVQsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxVQUFVLENBQUM7UUFFdEMsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBS00sS0FBSztRQUNSLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLENBQUM7UUFFNUIsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFHTyxTQUFTO1FBQ2IsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0o7QUFwRkQsOEJBb0ZDIn0=