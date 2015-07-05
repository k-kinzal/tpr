'use strict';

var assert = require('power-assert');
var processor = require('../../src/processors/scalajs');

describe('scalajs processor:', function() {
  it('should be success in compile', function() {
    var tmp = require('temporary');
    var file = new tmp.File();

    var option = {
      output: file.path + '.js',
    };

    return processor(option)('test/assets/MyList.scala').then(function(stdout) {
      assert(stdout === ('Fast optimizing ' + option.output + '\n'));
    });
  });

});
