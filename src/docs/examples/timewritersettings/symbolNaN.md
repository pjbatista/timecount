```javascript
timeWriter.write(Time.from(NaN, "cosmicYear"));
// ≈NaN cosmic years

timeWriter.write(Time.from(NaN, "cosmicYear"), { symbolNaN: "ɳɑɲ" });
// ≈ɳɑɲ cosmic years

timeWriter.write(NaN, "second", { symbolNaN: "ɳɑɲ" });
// ɳɑɲ s

timeWriter.write(Time.from(NaN, "cosmicYear"), { symbolNaN: "ɳɑɲ", verbose: true });
// invalid number of cosmic years
```

---

[Back to top](_index_.timewritersettings.html#index)
