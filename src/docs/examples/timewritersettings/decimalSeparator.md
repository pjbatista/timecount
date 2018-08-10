```javascript
timeWriter.write(3.5, "megasecond");
// 3.5 Ms

timeWriter.write(3.5, "megasecond", { decimalSeparator: "," });
// 3,5 Ms

timeWriter.countdown(Time.from(500, "day"), ["year", "month", "day", "hour"]);
// 1 y, 4 m, 13 d, 2.18 h

timeWriter.countdown(Time.from(500, "day"), { decimalSeparator: "point" }, ["year", "month", "day", "hour"]);
// 1 y, 4 m, 13 d, 2point18 h
```

---

[Back to top](_index_.timewritersettings.html#index)
