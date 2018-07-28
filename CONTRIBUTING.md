This guide contains information to help the development of timecount by multiple individuals and the assessment of pull requests within its repository.

## Summary

- [Briefing](#briefing)
- [Setting up the environment](#setting-up-the-environment)
- [Translating](#translating)
- [Unit Tests](#unit-tests)

## Briefing

Timecount relies on the _strictness_ of TypeScript+tslint for its stability, which means that types and code style are heavily enforced. Both the `tsconfig.json` and `tslint.json` have been fine tuned to minimize potential deviations.

This doesn't mean you can't `tslint:disable` a certain rule for a line or a few, when it makes sense doing so. With that said, feel free to give your commentaries about the code-style and configuration of the project.

## Setting up the environment

1. Download or clone the repository:
    ```cmd
    git clone https://github.com/pjbatista/timecount.git
    ```
2. Enter the directory and install the package. Timecount will then be available for development and testing:
    ```cmd
    cd timecount
    npm install
    npm run test
    ```

## Translating

In order to create and submit a new translation of timecount, create a new localization file inside `src/locales`, naming it accordingly:

- If the **translation disregards regions**, name the file with its _two character language representation_ (e.g. `fr.ts` or `ru.ts`);
- If the **translation is region-bound**, name it with the its _language-region representation_ (e.g. `fr-fr.ts`, `fr-ca.ts` or `ru-ru.ts`).

The file **must** export a default object with the localized properties — when a configuration or time unit is omitted, timecount fallsback to English (US) for that specific thing.

One may use [example.ts](https://github.com/pjbatista/timecount/blob/master/src/locales/example.ts), located inside `src/locales` as a guide to localization features. Also, it's important to consult the [API Documentation](https://pjbatista.github.io/timecount) while translating since timecount localization contains ways to customize the writting of numbers and time units.

**defaultOptions:**

A configuration that is applied to all time units of the language, by default; it may be used to set whether to `pluralize` verbose names or to define a `customPlural` function.

**timeUnits:**

As one may infer from the name, contains time units translations; `readableName` should contain the verbose unit name translation and `customPlural` is used when adding an "s" to the end of the name yields the wrong output. If the time unit doesn't need pluralization, set `pluralize` to false.

**writerOptions:**

Contains the default [TimeWriter](https://pjbatista.github.io/timecount/classes/_index_.timewriter.html) settings for the language. May be used to change the `decimalSeparator` used in a country, to configure `terms` for _Infinity_ and _NaN_, and [other things](https://pjbatista.github.io/timecount/interfaces/_index_.timewritersettings.html).

## Unit Tests

Timecount uses mocha+chai for its tests, loaded via ts-node. All tests are located within the `tests` directory and each `.test.ts` file contains the assertions of a single class.

Before you submit a Pull Request with a fix, feature or translation, make sure that the existing tests don't break by running `npm run test`.
