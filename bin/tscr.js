#! /usr/bin/env node
var fs = require('fs-extra');
var path = require('path');
var process = require('process');
fs.copySync(path.resolve('node_modules', 'tscr', 'template'), './');