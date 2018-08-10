```javascript
const timeWriter = new TimeWriter({ verbose: true });

timeWriter.write(Infinity, "month");
// infinite months

timeWriter.write(Infinity, "month", { termInfinite: "infinite number of" });
// infinite number of months

timeWriter.write(Infinity, "month", { termInfinite: "infinite number of", verbose: false });
// ∞ m

```

---

[Back to top](_index_.timewritersettings.html#index)
