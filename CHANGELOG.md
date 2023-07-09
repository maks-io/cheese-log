#### 1.0.5 (2023-07-09)

##### New Features

*  add printConfig functionality, to see the current logger configuration ([c04c3cda](https://github.com/maks-io/cheese-log/commit/c04c3cda404dd65f12a57d8e2dacbd322be52786))

##### Bug Fixes

*  handle circular object references properly ([4770a228](https://github.com/maks-io/cheese-log/commit/4770a2281acbf20a96512576333415faf496a049))
*  don't fall back to default config when overriding config - instead use global config ([3ab6af7c](https://github.com/maks-io/cheese-log/commit/3ab6af7cefea38412f55120c9113937a3dec0e5b))
*  correctly display numbers + booleans in all scenarios ([ef7187ca](https://github.com/maks-io/cheese-log/commit/ef7187ca8f8b24749ce51e5804a3172673452e6d))

##### Code Style Changes

*  adjust default table formatting options to have proper header- and row-separators ([92472642](https://github.com/maks-io/cheese-log/commit/92472642aba7d831694ba75dbe2c8b15d188c915))
