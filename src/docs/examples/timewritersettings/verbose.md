```javascript
import { TimeSegments } from "timecount";

const timeWriter = new TimeWriter({ verbose: true });

timeWriter.countdown(Time.from(1.4e+3, "month"));
// 116 years, 7 months, 2 days, 6 hours, 52 minutes, 48 seconds

timeWriter.countdown(Time.from(1.4e+3, "month"), { verbose: false });
// 116 y, 7 m, 2 d, 6 h, 52 m, 48 s

timeWriter.write(new Time(Infinity, true), "biennium");
// approximately infinite biennia

timeWriter.write(new Time(Infinity, true), "biennium", { verbose: false });
// ≈∞ biennia
```

---

[Back to top](_index_.timewritersettings.html#index)
