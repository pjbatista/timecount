```javascript
timeWriter.write(Time.from(Infinity, "year"));
// ∞ y

timeWriter.write(Time.from(Infinity, "year"), { symbolInfinite: "<INF>" });
// <INF> y

timeWriter.write(Time.from(Infinity, "year").approximate(), { symbolInfinite: "<INF>" });
// ≈<INF> y

timeWriter.write(Time.from(Infinity, "year"), { symbolInfinite: "<INF>", verbose: true });
// infinite years
```

---

[Back to top](_index_.timewritersettings.html#index)
