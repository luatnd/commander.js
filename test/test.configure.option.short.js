/**
 * Module dependencies.
 */

var util = require('util')
  , program = require('../')
  , should = require('should');

var info = [];

console.error = function () {
  info.push(util.format.apply(util, arguments));
};


// Invalid short syntax
process.on('exit', function (code) {
  code.should.equal(1);
  info.length.should.equal(3);
  info[1].should.equal('  error: Invalid short form format, example of short form: -u, but got -a2');
  process.exit(0)
});

program.configure({
  options: {
    a2: {
      short:   "-a2",
      long:    "--a2",
      desc:    "Test desc",
      type:    "required",
    },
  }
});
