/* @flow */
'use strict';
// import
import {execSync} from 'child_process';
import {spawn} from 'child-process-promise';
// initialize
var command = (() => {
  try {
    return execSync('which scalajsc').toString().replace(/[\n\r]/g, '');
  } catch (err) {
    return process.env.PWD + '/node_modules/.bin/scalajsc';
  }
})();
/**
 * Generate the byte code from Scala.
 * @param {string|string[]} files array of Scala file
 * @param {ScalajscOption} option of scalajsc
 * @return {Promise<string>} standard output
 * @see {@link http://www.scala-lang.org/files/archive/nightly/docs-2.10.2/manual/html/scalac.html}
 */
export default function scalajsc(
  files/*: string | Array<string> */,
  option/*: ScalajscOption */)/*: Promise<string>*/ {

  var args =[]
    .concat(option.definitions        ? definitionToArguments(option.definitions)        : [])
    .concat(option.flags              ? flagToArguments(option.flags)                    : [])
    .concat(option.plugins            ? pluginToArguments(option.plugins)                : [])
    .concat(option.advancedOptions    ? advancedOptionToArguments(option.advancedOptions): [])
    .concat(option.bootclasspath      ? ['-bootclasspath', option.bootclasspath]         : [])
    .concat(option.classpath          ? ['-classpath', option.classpath]                 : [])
    .concat(option.destination        ? ['-d', option.destination]                       : [])
    .concat(option.dependencyfile     ? ['-dependencyfile', option.dependencyfile]       : [])
    .concat(option.deprecation        ? ['-deprecation']                                 : [])
    .concat(option.encoding           ? ['-encoding', option.encoding]                   : [])
    .concat(option.explaintypes       ? ['-explaintypes']                                : [])
    .concat(option.extdirs            ? ['-extdirs', option.extdirs]                     : [])
    .concat(option.feature            ? ['-feature']                                     : [])
    .concat(option.generatedDebbuging ? ['-g', option.generatedDebbuging]                : [])
    .concat(option.javabootclasspath  ? ['-javabootclasspath', option.javabootclasspath] : [])
    .concat(option.javaextdirs        ? ['-javaextdirs', option.javaextdirs]             : [])
    .concat(option.language           ? ['-language', option.language]                   : [])
    .concat(option.noSpecialization   ? ['-no-specialization']                           : [])
    .concat(option.nobootcp           ? ['-nobootcp']                                    : [])
    .concat(option.nowarn             ? ['-nowarn']                                      : [])
    .concat(option.optimise           ? ['-optimise']                                    : [])
    .concat(option.sourcepath         ? ['-sourcepath', option.sourcepath]               : [])
    .concat(option.target             ? ['-target', option.target]                       : [])
    .concat(option.toolcp             ? ['-toolcp', option.toolcp]                       : [])
    .concat(option.unchecked          ? ['-unchecked']                                   : [])
    .concat(option.uniqid             ? ['-uniqid']                                      : [])
    .concat(option.usejavacp          ? ['-usejavacp']                                   : [])
    .concat(option.usemanifestcp      ? ['-usemanifestcp']                               : [])
    .concat(option.verbose            ? ['-verbose']                                     : [])
    .concat(files);
  var options = { capture: [ 'stdout', 'stderr' ]};

  return spawn(command, args, options).then((result) => {
    if (result.stderr) {
      throw new Error(result.stderr);
    }
    return result.stdout;
  });
}
/**
 * Print program
 * @param {string|string[]} files array of Scala file
 * @return {Promise<string>} print string
 */
scalajsc.print = function(
  files/*: string | Array<string> */)/*: Promise<string>*/ {
  var args = ['-print'].concat(files);
  var options = { capture: [ 'stdout', 'stderr' ]};
  return spawn(command, args, options).then((result) => {
    return result.stdout;
  }).fail((err) => {
    throw new Error(err.stderr);
  });
};
/**
 * Get the help of scalajsc
 * @return {Promise[ScalajscHelp]} version string
 */
scalajsc.help = function()/*: Promise<ScalajscHelp>*/ {
  var args = ['-help'];
  var options = { capture: [ 'stdout', 'stderr' ]};
  return spawn(command, args, options).then((result) => {
    var lines = result.stderr.replace(/[\n\r]$/, '').split('\n');

    return {
      usage: lines[0].match(/Usage: (.+)/)[1],
      options: lines.splice(2).map((line) => {
        var m = line.trim().match(/^(\-.+?|@.+?)\s{2,}(.+?)$/);

        return m && {option: m[1], description: m[2]};
      }),
      _raw: result.stderr
    };
  }).fail((err) => {
    throw new Error(err.stderr);
  });
};
/**
 * Get the version of scalajsc
 * @return {Promise<string>} version string
 */
scalajsc.version = function()/*: Promise<string>*/ {
  var args = ['-version'];
  var options = { capture: [ 'stdout', 'stderr' ]};
  return spawn(command, args, options).then((result) => {
    return result.stderr.match(/^Scala compiler version ([0-9.]+)/)[1];
  }).fail((err) => {
    throw new Error(err.stderr);
  });
};

// {property: value} to -Dproperty=value
function definitionToArguments(
  definitions/*: {[key: string]: string}*/)/*: Array<string> */ {
  
  return Object.keys(definitions).map(function(property) {
    return ['-D', property + '=' + definitions[property]];
  }).reduce((acc, value) => {
    return acc.concat(value);
  }, []);
};
// [flag] to -Jflag
function flagToArguments(
  flags/*: Array<string>*/)/*: Array<string> */ {
  
  return flags.map(function(flag) {
    return ['-J', flag];
  }).reduce((acc, value) => {
    return acc.concat(value);
  }, []);
}

// {plugin: opt} to -P:plugin:opt
function pluginToArguments(
  plugins/*: {[key: string]: string}*/)/*: Array<string> */ {
  
  return Object.keys(plugins).map(function(plugin) {
    return ['-P' + ':' + plugin + ':' + plugins[plugin]];
  }).reduce((acc, value) => {
    return acc.concat(value);
  }, []);
}

// [option] to -Xoption
function advancedOptionToArguments(
  options/*: Array<string>*/)/*: Array<string> */ {
  
  return options.map(function(option) {
    return ['-X', option];
  }).reduce((acc, value) => {
    return acc.concat(value);
  }, []);
}
