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


// Invalid long syntax
process.on('exit', function (code) {
  code.should.equal(1);
  info.length.should.equal(3);
  info[1].should.equal('  error: Invalid long form format, example of long form: --update, but got ---a2-very-long');
  process.exit(0)
});

program.configure({
  options: {
    a2: {
      short:   "-a",
      long:    "---a2-very-long",  // const longPattern = /^--[a-zA-Z0-9][a-zA-Z0-9_\-]+$/;
      desc:    "Test desc",
      type:    "required",
    },
  }
});
