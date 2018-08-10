```javascript
timeWriter.write(12345.0125);
// 12345.0125 ns

timeWriter.write(12345.0125, { numericNotation: "decimal" });
// 12345.0125 ns

timeWriter.write(12345.0125, { numericNotation: "scientific" });
// 1.23450125e+4 ns

timeWriter.write(12345.0125, { numericNotation: "roman" });
// X̅MMCCCXLV ns

timeWriter.write(12345.0125, { numericNotation: "roman-fractions" });
// X̅MMCCCXLVƧ ns

timeWriter.countdown(new Time(9.065e16), { numericNotation: "scientific" }, ["year", "day", "hour", "minute", "second"]);
// 2e+0 y, 3.18e+2 d, 1.6e+1 h, 5.4e+1 min, 5.6e+1 s

timeWriter.countdown(new Time(9.065e16), { numericNotation: "roman-fractions" }, ["year", "day", "hour", "minute", "second"]);
// II y, CCCXVIII d, XVI h, LIV min, LVS:·: s
```

---

[Back to top](_index_.timewritersettings.html#index)
