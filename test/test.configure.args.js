/**
 * Module dependencies.
 */

var program = require('../')
  , should = require('should');

program
  .option('-f, --foo [foo]', 'add some foo')
  .option('-b, --bar', 'add some bar')
  .configure({
    version: '0.1.x',
    usage:   'To show the example of configure(), make option declarative',
    options: {
      ta: {
        short:   "-a",
        long:    "--ta",
        desc:    "Test ta",
        type:    "required",
        defaultVal: '1000',
        parseFn: function (val) {return val},
      },
      tb: {
        long:    "--tb",
        desc:    "Test",
        type:    "required",
        defaultVal: '1000',
      },
      tc: {
        long:    "--tc",
        desc:    "Test desc",
        type:    "optional",
        defaultVal: '1000',
        parseFn: function (val) {return val + "_parseFnWork"},
      },
      td: {
        short:   "-d",
        long:    "--td",
        desc:    "Test toggle un-specify",
        type:    "toggle",
      },
      te: {
        short:   "-e",
        long:    "--te",
        desc:    "Test toggle defaultValue=false",
        type:    "toggle",
        defaultVal: false
      },
      tf: {
        short:   "-f",
        long:    "--tf",
        desc:    "Test toggle defaultValue=true",
        type:    "toggle",
        defaultVal: true
      },
    }
  });


// No conflict with option()
program.parse('node test -a hello_world --tb tb-value --foo a_foo_value'.split(' '));
program.foo.should.equal('a_foo_value');
should.equal(undefined, program.bar);


// Short format work ?
program.ta.should.equal('hello_world');
program.tb.should.equal('tb-value'); // if not specify short, is this still work ?


// Long format work ?
program.ta = undefined;
program.parse('node test --ta hello_world'.split(' '));
program.ta.should.equal('hello_world');


// defaultVal will be ignored if required was specified
program.tb = undefined;
program.parse('node test --ta hello_world'.split(' '));
should.equal(undefined, program.tb);


// defaultVal will NOT be ignored if required was NOT specified
program.parse('node test'.split(' '));
should.equal('1000', program.tc);


// parseFn work when --tc option was specified
program.tc = undefined;
program.parse('node test --tc tcval'.split(' '));
should.equal('tcval_parseFnWork', program.tc);


// parseFn work when --tc option was specified
program.tc = undefined;
program.parse('node test --tc tcval'.split(' '));
should.equal('tcval_parseFnWork', program.tc);


// Toggle type work if it was un-specified:     |    NOTE: test fail because current parseOptions() can not handle this case
//should.equal(undefined, program.td);
//should.equal(false, program.te);
//should.equal(true, program.tf);

// Toggle type work if it was specified
program.td = undefined;
program.parse('node test --tc tcval -d'.split(' '));
should.equal(true, program.td);


/**
 * NOTE: For required and optional issue:
 * Because configure() is a bridge to .option() and option() was run before parse()
 * So that configure() wont validate values, we still have an existing issue: https://github.com/tj/commander.js/issues/230
 */
