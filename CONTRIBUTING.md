# Contributing to timecount

This guide was designed in order to help developers understand and hopefully contribute to timecount. It details how to install the module for development, create a new translation and test.

## Summary

- [General Notes](#general-notes)
- [Environment Setup](#environment-setup)
- [Translating](#translating)
- [Testing](#testing)
- [Pull Requests](#pull-requests)

## General Notes

This [NodeJS](https://nodejs.org) module is written using [TypeScript](https://www.typescriptlang.org) and transpiled to the [Standard ECMA-262 (ES6)](https://www.ecma-international.org/ecma-262/6.0) specifications. The documentation is generated with the help of [TypeDoc](http://typedoc.org). The tests are performed via [Mocha](https://mochajs.org/) and [Chai](http://www.chaijs.com/). The build tool is [Gulp](https://gulpjs.com).

In order to take maximum advantage of TypeScript, timecount is written using all available configurations aimed at increasing its strictness. Alied with [tslint](https://palantir.github.io/tslint), this provides most of the **code styles** that should be followed while adding/updating code.

This doesn't mean one should not `tslint:disable` a certain rule for a certain line, when it makes sense doing so.

> 🧔 _I know that enforcing a 4-space indentation may not be very popular, but it's the way I've been coding since forever. It's too much of an ingrained habit for me to lose it. If you're the opposite of me, please replace the indentation with your desired of spacing and change it back before submitting a Pull Request. Sorry in advance._

---

[Back to top](#summary)

## Environment Setup

1. Download or clone the repository:
    ```bash
    git clone https://github.com/pjbatista/timecount.git
    ```
2. Enter the directory and install the package, making timecount available for development and testing:
    ```bash
    cd timecount
    npm install
    npm run test
    ```

---

[Back to top](#summary)

## Translating

Timecount internationalization is done through a series of abstractions that override default linguistic properties. Each language is stored in a file inside [`src/locales`](https://github.com/pjbatista/timecount/tree/master/src/locales).

### Step 1: Create a translation file

There are two types of translation file accepted by timecount:

<details>
<summary><strong>Region-independent translations (e.g. en, pt, ru)</strong></summary>
Represents the language as a whole, disregarding regionalizations.
<br />
<strong>Pattern</strong>: <code>[a-z][a-z].ts</code>
</details>

<br />

<details>
<summary><strong>Regionalized translations (e.g. en-gb, pt-ao, ru-ru)</strong></summary>
Represents the language with its regional particularities.
<br />
<strong>Pattern</strong>: <code>[a-z][a-z]\-[a-z][a-z].ts</code>
</details>

<br />

In order to add a language to timecount, create a new file on [`src/locales`](https://github.com/pjbatista/timecount/tree/master/src/locales) choosing one pattern from above.

> 👉 **This file MUST export a `default` [LocaleSettings](https://pjbatista.github.io/timecount/interfaces/_localization_.localesettings.html) object.**

```typescript
// Translation file example:
export default {
    timeUnits: {
        minute: { readableName: "meenoot", customPlural: "meenooties" },
        year: { readableName: "yier" },
        ...
    },
    writerOptions: {
        decimalSeparator: ",",
        termInfinite: "in-feenat",
        ...
    }
}
```

A complete translation example is available at [`src/locales/example.ts`](https://github.com/pjbatista/timecount/blob/master/src/locales/example.ts).

> 💡 Don't forget to consult the [API Documentation](https://pjbatista.github.io/timecount) while translating since timecount localization contains ways to customize the writting of numeric values and time units.

### Step 2: Testing

After creating the translation file

---

[Back to top](#summary)

## Testing

The union of mocha and chai allows a concise and clean unit testing. There are a few **rules** when comes to unit testing:

- Test files must be located within [`tests`](https://github.com/pjbatista/timecount/tree/master/tests)
- Each class should have its own test file
- The preferred assertion style is [expect](http://www.chaijs.com/guide/styles/#expect)
- Understable name for test tasks

All tests are located within the `tests` directory and each `.test.ts` file contains the assertions of a single class (when configurations are involved, separate assertion groups might be created).

Before you submit a Pull Request with a fix, feature or translation, make sure that the existing tests don't break by running `npm run test`.

---

[Back to top](#summary)
