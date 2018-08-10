```javascript
const timeWriter = new TimeWriter({ verbose: true });

timeWriter.write(NaN, "day");
// invalid number of days

timeWriter.write(NaN, "day", { termNaN: "not a number of" });
// not a number of days

timeWriter.write(NaN, "day", { termNaN: "not a number of", verbose: false });
// NaN d

```

---

[Back to top](_index_.timewritersettings.html#index)
