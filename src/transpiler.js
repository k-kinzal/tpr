/* @flow */
'use strict';
// import

// processor name
var ScalaJS = 'ScalaJS';
/**
 * Scala.js transpiler.
 */
export default class Transpiler {/*::
  convertTo: {
    ScalaJS: (x:Array<string>|string) => Promise<string>
  };*/

  /**
   * constructor.
   * @param {ScalajsOption} option of scalajs
   */
  constructor(option/*: ScalajsOption*/) {
    this.convertTo = {
      ScalaJS: require('./processors/scalajs')(option)
    };
  }
  /**
   * Transpile from Scala.
   * @param {string|string[]} files array of Scala file
   * @return {Promise<string>} outputed file path
   */
  transpile(files/*: string | Array<string> */)/*: Promise<string>*/ {
    var convertTo = this.convertTo;

    return Promise.resolve(files)
                  .then(convertTo[ScalaJS]);
  }

}
