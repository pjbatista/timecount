```javascript
const timeWriter = new TimeWriter();

timeWriter.write(Math.PI, "second");
// 3.1415926536 s

timeWriter.write(Math.PI, "second", { decimalPlaces: 4 });
// 3.1416 s

timeWriter.write(Math.PI, "second", { decimalPlaces: 4, roundindMode: RoundingMode.RoundDown });
// 3.1415 s

timeWriter.write(Math.PI, "second", { decimalPlaces: 4, roundindMode: 2 });
// 3.1416 s

```

---

[Back to top](_index_.timewritersettings.html#index)
