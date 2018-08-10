```javascript
function myWriter(value: number) {
    switch (value) {
        case 3: return "three";
        case 4: return "four";
        case 5: return "five";
    }

    return value.toString();
}

timeWriter.countdown(Time.from(11045, "second"));
// 3 h, 4 min, 5 s

timeWriter.countdown(Time.from(11045, "second"), { numericWriter: myWriter });
// three h, four min, five s

timeWriter.countdown(Time.from(11045, "second"), { numericWriter: myWriter, verbose: true });
// three hours, four minutes, five seconds
```

---

[Back to top](_index_.timewritersettings.html#index)
