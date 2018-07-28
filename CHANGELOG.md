This document contains the details for each version of timelog, chronologically, including eventual deprecations and changes in project.

Versions are listed from most recent to oldest and dates are formatted according to [ISO 8601](https://www.iso.org/iso-8601-date-and-time-format.html).

## Summary

- [Versions 1.0.*](#version-1.0.)
  - [1.0.0](#1.0.0)
- [Versions 0.1.*](#version-0.1.)
  - [0.1.3](#0.1.3)
  - [0.1.2](#0.1.2)
  - [0.1.1](#0.1.1)
  - [0.1.0](#0.1.0)
- [Versions 0.0.*](#version-0.0.)
  - [0.0.3](#0.0.3)
  - [0.0.2](#0.0.2)
  - [0.0.1](#0.0.1)

---

## Versions 1.0.*

### 1.0.0

> Publish date: 2018-07-28

This version is a **major code overhaul**, with improved logic, naming and organization. Its a refocus of the project towards a better time-handling implementation.

This version is **not** backwards-compatible.

#### Project changes

- Changed building architecture to take advantage of `gulp`;
- Improved markdown files using suggestions from `markdown-lint`;
- Improved semantics of inline doc-comments;
- Added `.gitattributes`, `.node-version`, `AUTHORS.md`, `CONTRIBUTING.md`;
- Renamed `CHANGES.md` to `CHANGELOG.md` and `API.md` to `src/typedoc.md`;
- Restructured main codebase within `index.ts` (no more unnecessary re-exporting);
- Reorganized module by category:
  - `index` (main module) - time operations;
  - `localization` - internationalization;
  - `utils` - timers and stopwatch;
- Restructured tests to a class per test file;
- Updated `tsconfig.json` (now it has only necessary fields);
- Removed a few entries from `tslint.json` to better match tslint recommendations;
- Updates dependencies in `package.json`;

---

## Versions 0.1.*

### 0.1.3

> Publish date: 2017-10-19

Fixed links on documentation.

### 0.1.2

> Publish date: 2017-10-19

- Added `getTimeIncludingPaused` to `Timer`;
- Fixed examples on README and added a few to the documentation.

### 0.1.1

> Publish date: 2017-10-18

Added `SimpleTimer` to index exports.

### 0.1.0

> Publish date: 2017-10-18

- Added from* (nanosecond conversion) methods to `TimeUtil`;
- Added `SimpleTimer` class as a basic version and precursor of `Timer`;
- Added `elapsedTime` to all timer objects;
- Deprecated `TimeTransformer` in favor of `TimeWriter`;
- Changed `typedoc` theme to "minimal";
- Created API and CHANGES file and updated README accordingly.

---

## Versions 0.0.*

### 0.0.4

> Publish date: 2017-10-15

Last version had an error while publishing.

- Added comments to the build;
- Added linter to the build/package tasks.
- Moved packaging to "prepare" task.

### 0.0.3

> Publish date: 2017-10-15

- ~~Added comments to the build;~~
- ~~Added linter to the build/package tasks.~~

### 0.0.2

> Publish date: 2017-10-14

Minor updates to the README and package.

### 0.0.1

> Publish date: 2017-10-14

First version of this module; contains a fully functional `Timer` and `StopWatch`.
