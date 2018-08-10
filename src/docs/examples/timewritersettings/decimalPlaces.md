```javascript
const timeWriter = new TimeWriter();

timeWriter.write(Math.PI, "second");
// 3.1415926536 s

timeWriter.write(Math.PI, "second", { decimalPlaces: 4 });
// 3.1416 s

timeWriter.write(1, "year", { decimalPlaces: 4 });
// 1.0000 y

timeWriter.countdown(Time.from("2", "siderealMonth"), ["minute", "second", "milisecond"])
// ≈78686 min, 22 s, 848 ms

timeWriter.countdown(Time.from("2", "siderealMonth"), { decimalPlaces: 4 }, ["minute", "second", "milisecond"])
// ≈78686.0000 min, 22.0000 s, 848.0000 ms
```

---

[Back to top](_index_.timewritersettings.html#index)
