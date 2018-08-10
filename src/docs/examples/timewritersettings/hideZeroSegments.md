```javascript
import { TimeSegments } from "timecount";

timeWriter.countdown(Time.from(5.123456789, "second"), TimeSegments.baseTen);
// 5 s, 123 ms, 456 µs, 789 ns

timeWriter.countdown(Time.from(5.123456789, "second"), { hideZeroSegments: false }, TimeSegments.baseTen);
// 0 Ys, 0 Zs, 0 Es, 0 Ps, 0 Ts, 0 Gs, 0 Ms, 0 Ks, 5 s, 123 ms, 456 µs, 789 ns, 0 ps, 0 fs, 0 as, 0 zs, 0 ys
```

---

[Back to top](_index_.timewritersettings.html#index)
