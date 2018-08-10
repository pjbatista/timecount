This is the main module of timecount. Employ one of the following snippets to use it in your project:

- EcmaScript 6 or equivalent:
    ```javascript
    import { Time, TimeWriter } from "timecount";
    ```
- Older EcmaScripts:
    ```javascript
    var timecount = require("timecount");
    ```

> 💡 Importing from `"/index"` is unnecessary but nobody is going to stop you from doing it: `var timecount = require("timecount/index");`

---

This module contains the [time encapsulation](../classes/_index_.time.html) used throughout the project and the implementation for outputting synthetic time value strings ([time writers](../classes/_index_.timewriter.html)). It relies on [big.js](https://www.npmjs.com/package/big.js) for the precision of its floating-point operations, specially considering how [JS handles these things](https://jsfiddle.net/pjbatista/mxs01vto).

It also exports both other modules, [localization](_localization_.html) and [utils](_utils_.html), as properties of itself, so they can be easily accessed when importing timecount as a whole:

```javascript
var timecount = require("timecount");

// Accessing sub-modules directly:
timecount.Locale.set("es-mx");
var timer = new timecount.utils.Timer();
```