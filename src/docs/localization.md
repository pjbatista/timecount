This module implements an interface for the internationalization of timecount. It allows users to easily change the language of [time writers](../classes/_index_.timewriter.html) based on [translation files](https://github.com/pjbatista/timecount/tree/master/src/locales).

Employ one of the following snippets to use it in your project:

- EcmaScript 6 or equivalent:
    ```javascript
    import { Locale } from "timecount/localization";
    ```
- Older EcmaScripts:
    ```javascript
    var localization = require("timecount").localization;
    // -or
    var timecount = require("timecount/localization");
    ```

### Currently supported languages

- 🇺🇸 English (US) — Native, hardcoded
- 🇧🇷 Portuguese (Brazil)
- 🇵🇹 Portuguese (Portugal)
- 🇪🇸 Spanish (Spain)
- 🇲🇽 Spanish (Mexico)

If you wish to contribute with a new translation, please see [Contributing: Translating](https://github.com/pjbatista/timecount/blob/master/CONTRIBUTING.md#translating).
