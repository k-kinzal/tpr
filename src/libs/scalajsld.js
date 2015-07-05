/* @flow */
'use strict';
// import
import {execSync} from 'child_process';
import {spawn} from 'child-process-promise';
// initialize
var command = (() => {
  try {
    return execSync('which scalajsld').toString().replace(/[\n\r]/g, '');
  } catch (err) {
    return process.env.PWD + '/node_modules/.bin/scalajsld';
  }
})();
/**
 * Generate the Javascript code from Byte code.
 * @param {string} path of Byte code directory
 * @param {ScalajsldOption} option of scalajsld
 * @return {Promise[string]} standard output
 * @see {@link https://github.com/scala-js/scala-js/blob/master/cli/src/main/scala/org/scalajs/cli/Scalajsld.scala}
 */
export default function scalajsld(
  path/*: string*/,
  option/*: ScalajsldOption*/)/*: Promise<string>*/ {

  var args = []
    .concat(['-o', option.output])
    .concat(option.jsoutput               ? ['-jo', option.jsoutput]           : [])
    .concat(option.fastOpt                ? ['-f']                             : [])
    .concat(option.noOpt                  ? ['-n']                             : [])
    .concat(option.fullOpt                ? ['-u']                             : [])
    .concat(option.prettyPrint            ? ['-p']                             : [])
    .concat(option.compliantAsInstanceOfs ? ['--compliantAsInstanceOfs']       : [])
    .concat(option.outputMode             ? ['-m', option.outputMode]          : [])
    .concat(option.bypassLinkingErrors    ? ['-b', option.bypassLinkingErrors] : [])
    .concat(option.checkIR                ? ['-c', option.checkIR]             : [])
    .concat(option.relativizeSourceMap    ? ['-r', option.relativizeSourceMap] : [])
    .concat(option.noStdlib               ? ['--noStdlib']                     : [])
    .concat(option.debug                  ? ['-d']                             : [])
    .concat(option.quiet                  ? ['-q']                             : [])
    .concat(option.reallyQuiet            ? ['-qq']                            : [])
    .concat(path);
  var options = { capture: [ 'stdout', 'stderr' ]};

  return spawn(command, args, options).then((result) => {
    if (result.stderr) {
      throw new Error(result.stderr);
    }
    return result.stdout;
  }).fail((err) => {
    throw new Error(err.stderr);
  });
}
/**
 * Get the help of scalajsc
 * @return {Promise[ScalajsldHelp]} version string
 */
scalajsld.help = () => {
  var args = ['--help'];
  var options = { capture: [ 'stdout', 'stderr' ]};
  return spawn(command, args, options).then((result) => {
    var lines = result.stdout.split('\n');

    return {
      usage: lines[1].match(/Usage: (.+)/)[1],
      options: lines.map((line, index) => {
        var m = line.trim().match(/^(-.+)$/);

        return m && {option: m[1], destination: lines[index+1].trim()};
      }).filter((v) => v !== null),
      _raw: result.stdout
    };
  }).fail((err) => {
    throw new Error(err.stderr);
  });
};
/**
 * Get the version of scalajsc
 * @return {Promise[string]} version string
 */
scalajsld.version = () => {
  var args = ['--version'];
  var options = { capture: [ 'stdout', 'stderr' ]};
  return spawn(command, args, options).then((result) => {
    return result.stdout.match(/scalajsld ([0-9.]+)/)[1];
  }).fail((err) => {
    throw new Error(err.stderr);
  });
};
