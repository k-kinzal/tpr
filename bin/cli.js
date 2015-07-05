#!/usr/bin/env node
'use strict';
// import
var Transpiler = require('../dest/transpiler');
var fs = require('fs');
var glob = require('glob');
var program = require('commander');
var packages = require('../package.json');
// parse arguments
program
.version(packages.version)
.usage('[options] <file ...>')
.option('-o, --output <directory>', 'Output file of linker (required)')
.option('-jo, --jsoutput <file>', 'Concatenate all JavaScript libary dependencies to this file')
.option('-f, --fastOpt', 'Optimize code (this is the default)', false)
.option('-n, --noOpt', 'Don\'t optimize code', false)
.option('-u, --fullOpt', 'Fully optimize code (uses Google Closure Compiler)', false)
.option('-p, --prettyPrint', 'Pretty print full opted code (meaningful with -u)', false)
.option('-s, --sourceMap', 'Produce a source map for the produced code', false)
.option('--compliantAsInstanceOfs', 'Use compliant asInstanceOfs', false)
.option('-m, --outputMode <value>', 'Output mode (ECMAScript51Isolated, ECMAScript6, ECMAScript6StrongMode, ECMAScript51Global)', /^(ECMAScript51Isolated|ECMAScript6|ECMAScript6StrongMode|ECMAScript51Global)$/)
.option('-b, --bypassLinkingErrors', 'Only warn if there are linking errors', false)
.option('-c, --checkIR', 'Check IR before optimizing', false)
.option('-r, --relativizeSourceMap <path>', 'Relativize source map with respect to given path (meaningful with -s)')
.option('--noStdlib', 'Don\'t automatcially include Scala.js standard library', false)
.parse(process.argv);
// glob file list
var files = program.args.map(function(path) {
  if (fs.lstatSync(path).isDirectory()) {
    return glob.sync(path + '/**/*.scala');
  }
  return path;
}).reduce(function(acc, value) {
  return acc.concat(value);
}, []);
// transpile
var transpiler = new Transpiler(program);
transpiler.transpile(files).then(function() {
  console.log('Build success');
}).catch(function(err) {
  console.log(err);
});