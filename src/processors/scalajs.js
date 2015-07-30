/* @flow */
'use strict';
// import
import {Dir, File} from 'temporary';
import fs from 'fs';
import path from 'path';
import scalajsc from '../libs/scalajsc';
import scalajsld from '../libs/scalajsld';
/**
 * Generate the Javascript code from Scala.
 * @param {ScalajsOption} option of scalajs
 * @return {Function} generate code processor
 */
module.exports = function scalajs(
  option/*: ScalajsOption*/)/*: (x:Array<string>|string) => Promise<string>*/ {

  return function(files/*: Array<string>|string*/)/*: Promise<string>*/ {

    return Promise.resolve(files).then((files) => {
      var dir = new Dir();
      var directoryPath = dir.path;
      var scalajscOption = {
        destination: directoryPath
      };

      return scalajsc(files, scalajscOption).then(() => {
        return directoryPath;
      });

    }).then((directoryPath) => {
      if (option.output) {
        try {
          fs.mkdirSync(path.dirname(option.output));
        } catch (e) {
          if ( e.code != 'EEXIST' ) throw e;
        }
      }

      return directoryPath;

    }).then((directoryPath) => {
      var scalajsldOption = {
        output:                 option.output,
        jsoutput:               option.jsoutput,
        fastOpt:                option.fastOpt,
        noOpt:                  option.noOpt,
        fullOpt:                option.fullOpt,
        prettyPrint:            option.prettyPrint,
        compliantAsInstanceOfs: option.compliantAsInstanceOfs,
        outputMode:             option.outputMode,
        bypassLinkingErrors:    option.bypassLinkingErrors,
        checkIR:                option.checkIR,
        relativizeSourceMap:    option.relativizeSourceMap,
        noStdlib:               option.noStdlib,
        debug:                  option.debug,
        quiet:                  option.quiet,
        reallyQuiet:            option.reallyQuiet
      };

      return scalajsld(directoryPath, scalajsldOption);
    });
  };

}
