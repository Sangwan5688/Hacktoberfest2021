#! /bin/bash
#cd ~/dev/games/bubbles/
open . 
sh build.sh
open index.html
subl .
#coffee --join bubbles.js -c src/constants.coffee src/init.coffee src/globals.coffee src/main.coffee 
