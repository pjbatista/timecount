```javascript
import { Decimal } from "decimal.js";

const pi = Decimal.acos(-1);
const timeWriter = new TimeWriter({ significantDigits: 99 });

timeWriter.write(pi, "second");
// 3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117068 s

timeWriter.write(pi, "second", { significantDigits: 4 });
// 3.1416 s

timeWriter.write(pi, "second", { decimalPlaces: 10, significantDigits: 4 });
// 3.1416000000 s

```

---

[Back to top](_index_.timewritersettings.html#index)
