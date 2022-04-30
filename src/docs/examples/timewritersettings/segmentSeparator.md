```javascript
import { TimeSegments } from "timecount";

timeWriter.countdown(Time.from(2.10066102, "second"), "second", "millisecond", "microsecond");
// 2 s, 100 ms, 661.20 µs

timeWriter.countdown(Time.from(2.10066102, "second"), { segmentSeparator: "; " }, "second", "millisecond", "microsecond");
// 2 s; 100 ms; 661.20 µs

timeWriter.countdown(Time.from(2.10066102, "second"), TimeSegments.baseTen);
// 2 s, 100 ms, 661 µs, 20 ns

timeWriter.countdown(Time.from(2.10066102, "second"), { segmentSeparator: " + " }, TimeSegments.baseTen);
// 2 s + 100 ms + 661 µs + 20 ns

timeWriter.countdown(Time.from(2.10066102, "second"), { hideZeroSegments: false, segmentSeparator: " + " }, TimeSegments.baseTen);
// 0 Ys + 0 Zs + 0 Es + 0 Ps + 0 Ts + 0 Gs + 0 Ms + 0 Ks + 2 s + 100 ms + 661 µs + 20 ns + 0 ps + 0 fs + 0 as + 0 zs + 0 ys
```

---

[Back to top](_index_.timewritersettings.html#index)
