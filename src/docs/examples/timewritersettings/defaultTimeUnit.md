```javascript
let timeWriter = new TimeWriter();

timeWriter.write(100);
// 100 ns

timeWriter = new TimeWriter({ defaultTimeUnit: "microsecond" });

timeWriter.write(100);
// 100 µs

timeWriter.write(100, { defaultTimeUnit: "second" });
// 100 s

```

---

[Back to top](_index_.timewritersettings.html#index)
