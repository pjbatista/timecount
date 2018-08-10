```javascript
timeWriter.write(100);
// 100 ns

timeWriter.countdown(Time.from(5.123456789, "second"), TimeSegments.baseTen);
// 5 s, 123 ms, 456 µs, 789 ns

timeWriter.write(100, { hideTimeUnit: true });
// 100

timeWriter.countdown(Time.from(5.123456789, "second"), { hideTimeUnit: true }, TimeSegments.baseTen);
// 5, 123, 456, 789
```

---

[Back to top](_index_.timewritersettings.html#index)
