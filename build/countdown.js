"use strict";
/*! ****************************************************************************
Copyright (c) 2017 Pedro Batista
MIT License

See the LICENSE file for more information.
***************************************************************************** */
Object.defineProperty(exports, "__esModule", { value: true });
const timer_1 = require("./timer");
/**
 * Represents a time counting object, that is able to determine temporal differences and "tick" at a
 * specified interval, exporting the result time spans.
 *
 * Countdown objects also have nanosecond precision, but due to the small scale of this time
 * measuring unit, it may take longer
 */
class CountDown extends timer_1.SimpleTimer {
    /**
     * Initializes a new instance of the {@link CountDown} class, using the specified interval as
     * nanosecond timer for the ticks and the options to configure the maximum ticks and/or time
     * span output.
     *
     * Use {@link TimeUtil.fromHours}, {@link TimeUtil.fromMicroSeconds},
     * {@link TimeUtil.fromMiliSeconds}, {@link TimeUtil.fromMinutes}, or
     * {@link TimeUtil.fromSeconds} to convert a time value to nanosecond.
     *
     * @param interval
     *   A numeric value with the countdown object `tick` interval, in nanoseconds.
     * @param options
     */
    constructor(interval, options) {
        options = options || {};
        super(options);
        if (interval <= 0) {
            throw new RangeError("The interval must be positive and greater than zero");
        }
        this._interval = interval;
        this._maxTicks = options.maxTicks ? options.maxTicks : 0;
        this._tickCallback = options.callback ? options.callback : () => { return; };
        this._ticks = 0;
    }
}
exports.CountDown = CountDown;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY291bnRkb3duLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvdW50ZG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O2dGQUtnRjs7QUFHaEYsbUNBQW9DO0FBMkJwQzs7Ozs7O0dBTUc7QUFDSCxlQUF1QixTQUFRLG1CQUFXO0lBT3RDOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILFlBQW1CLFFBQWdCLEVBQUUsT0FBMEI7UUFFM0QsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDeEIsS0FBSyxDQUFDLE9BQTRCLENBQUMsQ0FBQztRQUVwQyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoQixNQUFNLElBQUksVUFBVSxDQUFDLHFEQUFxRCxDQUFDLENBQUM7UUFDaEYsQ0FBQztRQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQWxDRCw4QkFrQ0MifQ==