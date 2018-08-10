```javascript
timeWriter.write(Time.from(1, "year"), "tropicalYear");
// ≈1.000000697152733 tropical years

timeWriter.write(Time.from(1, "year"), "tropicalYear", { symbolApproximately: "~" });
// ~1.000000697152733 tropical years

timeWriter.write(Time.from(1, "year"), "tropicalYear", { symbolApproximately: "~", verbose: true });
// approximately 1.000000697152733 tropical years
```

---

[Back to top](_index_.timewritersettings.html#index)
