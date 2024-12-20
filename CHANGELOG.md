#### 4.0.1 (2024-11-29)

* Fix unnecessary newlines
  * if prefix is empty also avoid newline
  * last object does not need to append newline

#### 4.0.0 (2024-11-28)

* Undo 'Replace ansicolor by chalk'

#### 3.0.1 (2024-11-28)

* Add Dependabot PR

#### 3.0.0 (2024-11-28)

* Replace ansicolor by chalk

#### 2.0.0 (2024-11-03)

* Upgrade dependencies
* Remove default export

#### 1.0.9 (2023-11-24)

* Improve initialization process

#### 1.0.8 (2023-11-14)

* Upgrade dependencies

#### 1.0.7 (2023-07-25)

##### Bug Fixes

*  proper handling of null and undefined values ([5475c376](https://github.com/maks-io/cheese-log/commit/5475c376d6b14d156753bd43bb9b79ea4ece3996))

#### 1.0.6 (2023-07-09)

##### Bug Fixes

*  add missing default config prop spreading ([8dc16918](https://github.com/maks-io/cheese-log/commit/8dc16918ef28e5102a897bd459f4bbfc22355496))

#### 1.0.5 (2023-07-09)

##### New Features

*  add printConfig functionality, to see the current logger configuration ([c04c3cda](https://github.com/maks-io/cheese-log/commit/c04c3cda404dd65f12a57d8e2dacbd322be52786))

##### Bug Fixes

*  handle circular object references properly ([4770a228](https://github.com/maks-io/cheese-log/commit/4770a2281acbf20a96512576333415faf496a049))
*  don't fall back to default config when overriding config - instead use global config ([3ab6af7c](https://github.com/maks-io/cheese-log/commit/3ab6af7cefea38412f55120c9113937a3dec0e5b))
*  correctly display numbers + booleans in all scenarios ([ef7187ca](https://github.com/maks-io/cheese-log/commit/ef7187ca8f8b24749ce51e5804a3172673452e6d))

##### Code Style Changes

*  adjust default table formatting options to have proper header- and row-separators ([92472642](https://github.com/maks-io/cheese-log/commit/92472642aba7d831694ba75dbe2c8b15d188c915))

