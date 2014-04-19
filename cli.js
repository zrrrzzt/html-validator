#!/usr/bin/env node
'use strict';

var fs = require('fs')
  , validator = require('./index')
  , pkg = require('./package.json')
  , query = process.argv[2]
  , argv = require('minimist')((process.argv.slice(2)))
  , opts = {format:'text'}
  ;

function printHelp() {
  console.log(pkg.description);
  console.log('');
  console.log('Usage:');
  console.log('  $ html-validate --url=<url>');
  console.log('');
  console.log('Or:');
  console.log('  $ html-validator --file=<file>');
  console.log('');
  console.log('Optional, specify format of returned data');
  console.log('Valid options: json, html, xhtml, xml, gnu and text (default)');
  console.log('  $ html-validate --url=<url> --format=<format>');
}

if (!query || process.argv.indexOf('-h') !== -1 || process.argv.indexOf('--help') !== -1) {
  printHelp();
  return;
}

if (process.argv.indexOf('-v') !== -1 || process.argv.indexOf('--version') !== -1) {
  console.log(pkg.version);
  return;
}

if(argv.format){
  opts.format = argv.format;
}

if(argv.url){
  opts.url = argv.url;
}

if(argv.file){
  fs.readFileSync(argv.file, function(err, data){
    if(err) throw err;
    opts.data = data;
  })
}

validator(opts, function(err, data){
  if(err) throw err;
  console.log(data);
});