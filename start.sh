#!/bin/bash

npm i cheerio -S
node ./switch.js
npm uni cheerio -S
rm -rf ./index.html ./musicList.js ./player.js ./switch.js ./start.sh
