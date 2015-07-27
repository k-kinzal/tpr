'use strict';

var assert = require('power-assert');
var path = require('path');
var scalajsc = require('../../src/libs/scalajsc');

describe('scalajsc:', function() {
  it('support version', function() {
    return scalajsc.version().then(function(version) {
      assert(version === '2.11.7');
    })
  });

  it('support options', function() {
    return scalajsc.help().then(function(result) {
      assert(result.usage === 'scalac <options> <source files>');
      assert(result.options.length === 37);
      assert(result.options[0].option  === '-Dproperty=value');
      assert(result.options[1].option  === '-J<flag>');
      assert(result.options[2].option  === '-P:<plugin>:<opt>');
      assert(result.options[3].option  === '-X');
      assert(result.options[4].option  === '-bootclasspath <path>');
      assert(result.options[5].option  === '-classpath <path>');
      assert(result.options[6].option  === '-d <directory|jar>');
      assert(result.options[7].option  === '-dependencyfile <file>');
      assert(result.options[8].option  === '-deprecation');
      assert(result.options[9].option  === '-encoding <encoding>');
      assert(result.options[10].option === '-explaintypes');
      assert(result.options[11].option === '-extdirs <path>');
      assert(result.options[12].option === '-feature');
      assert(result.options[13].option === '-g:<level>');
      assert(result.options[14].option === '-help');
      assert(result.options[15].option === '-javabootclasspath <path>');
      assert(result.options[16].option === '-javaextdirs <path>');
      assert(result.options[17].option === '-language:<_,feature,-feature>');
      assert(result.options[18].option === '-no-specialization');
      assert(result.options[19].option === '-nobootcp');
      assert(result.options[20].option === '-nowarn');
      assert(result.options[21].option === '-optimise');
      assert(result.options[22].option === '-print');
      assert(result.options[23].option === '-sourcepath <path>');
      assert(result.options[24].option === '-target:<target>');
      assert(result.options[25].option === '-toolcp <path>');
      assert(result.options[26].option === '-unchecked');
      assert(result.options[27].option === '-uniqid');
      assert(result.options[28].option === '-usejavacp');
      assert(result.options[29].option === '-usemanifestcp');
      assert(result.options[30].option === '-verbose');
      assert(result.options[31].option === '-version');
      assert(result.options[32].option === '@<file>');
      assert(result.options[33].option === '-P:scalajs:mapSourceURI:FROM_URI[->TO_URI]');
      assert(result.options[34].option === '-P:scalajs:fixClassOf');
      assert(result.options[35].option === '-P:scalajs:relSourceMap:<URI>');
      assert(result.options[36].option === '-P:scalajs:absSourceMap:<URI>');
    });
  });

  it("should be success in compile", function() {
    var TempDir = require('temporary').Dir;
    var dir = new TempDir();

    var config = {
      destination: dir.path
    };

    return scalajsc(path.resolve('test/assets/MyList.scala'), config).then(function(stdout) {
      assert(stdout === '');
    });
  });

  it("should be success in compile by multiple file", function() {
    var TempDir = require('temporary').Dir;
    var dir = new TempDir();

    var config = {
      destination: dir.path
    };

    return scalajsc(['test/assets/MyList.scala', 'test/assets/MyOption.scala'], config).then(function(stdout) {
      assert(stdout === '');
    });
  });

});
