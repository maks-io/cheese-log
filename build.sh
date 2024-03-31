#!/bin/bash

MEASURE_SRC="$(du -sh ./src)"

echo "~~~~~~~~~~ (1/4) Clearing build folders... ~~~~~~~~~~"
yarn clear-build-folders
echo "    ...done!"

echo "~~~~~~~~~~ (2/4) Transpiling... ~~~~~~~~~~"
yarn transpile
echo "...done!"

echo "~~~~~~~~~~ (3/4) Fixing paths... ~~~~~~~~~~"
yarn fix-paths
echo "...done!"

MEASURE_TRANSPILED="$(du -sh ./build)"

echo "~~~~~~~~~~ (4/4) Webpacking... ~~~~~~~~~~"
npx webpack --config webpack.config.js
echo "...done!"

rm -rf ./build
mv ./dist ./build

MEASURE_BUNDLED="$(du -sh ./build)"

echo "~~~~~~~~~~~~ SIZES ~~~~~~~~~~~~"
printf 'SOURCE:\t\t%s\n' "$MEASURE_SRC"
printf 'TRANSPILED:\t%s\n' "$MEASURE_TRANSPILED"
printf 'BUNDLED:\t%s\n' "$MEASURE_BUNDLED"
echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~"

exit
