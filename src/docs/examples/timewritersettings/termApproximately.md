```javascript
const timeWriter = new TimeWriter({ verbose: true });

timeWriter.write(Time.from(1, "year"), "draconicMonth");
// approximately 13.422003056 draconic months

timeWriter.write(Time.from(1, "year"), "draconicMonth", { termApproximately: "more or less" });
// more or less 13.422003056 draconic months

timeWriter.write(Time.from(1, "year"), "draconicMonth", { termApproximately: "more or less", verbose: false });
// ≈13.422003056 draconic months

```

---

[Back to top](_index_.timewritersettings.html#index)
