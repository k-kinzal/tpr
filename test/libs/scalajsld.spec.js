'use strict';

var assert = require('power-assert');
var scalajsc = require('../../src/libs/scalajsc');
var scalajsld = require('../../src/libs/scalajsld');

describe('scalajsld:', function() {
  it('support version', function() {
    return scalajsld.version().then(function(version) {
      assert(version === '0.6.4');
    })
  });

  it('support options', function() {
    return scalajsld.help().then(function(result) {
      assert(result.usage === 'scalajsld [options] <value> ...');
      assert(result.options.length === 16);
      assert(result.options[0].option  === '-o <file> | --output <file>');
      assert(result.options[1].option  === '-jo <file> | --jsoutput <file>');
      assert(result.options[2].option  === '-f | --fastOpt');
      assert(result.options[3].option  === '-n | --noOpt');
      assert(result.options[4].option  === '-u | --fullOpt');
      assert(result.options[5].option  === '-p | --prettyPrint');
      assert(result.options[6].option  === '-s | --sourceMap');
      assert(result.options[7].option  === '--compliantAsInstanceOfs');
      assert(result.options[8].option  === '-m <value> | --outputMode <value>');
      assert(result.options[9].option  === '-b | --bypassLinkingErrors');
      assert(result.options[10].option === '-c | --checkIR');
      assert(result.options[11].option === '-r <path> | --relativizeSourceMap <path>');
      assert(result.options[12].option === '--noStdlib');
      assert(result.options[13].option === '-d | --debug');
      assert(result.options[14].option === '-q | --quiet');
      assert(result.options[15].option === '-qq | --really-quiet');
      assert(result.options[16].option === '-v | --version');
      assert(result.options[17].option === '-h | --help');
    });
  });

  it('execute success', function() {
    var tmp = require('temporary');
    var dir = new tmp.Dir();
    var file = new tmp.File();

    var config = {
      destination: dir.path
    };

    return scalajsc('test/assets/MyList.scala', config).then(function() {
      var config = {
        output: file.path + '.js'
      };

      return scalajsld(dir.path, config).then(function(stdout) {
        assert(stdout === ('Fast optimizing ' + config.output + '\n'));
      });
    });
  });

});
