#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('../');

const OptionTypeType = {
 required: "required",
 optional: "optional",
 toggle:   "toggle"
};

function list(val) {
  return val.split(',').map(Number);
}
function parseDomain (val){
  return val;
}


/**
 * NOTE: For required and optional issue:
 * Because configure() is a bridge to .option() and option() was run before parse()
 * So that configure() wont validate values, we still have an existing issue: https://github.com/tj/commander.js/issues/230
 *
 * TODO: Make "required" / optional work
 */
program
  //.version('0.0.1')
  //.option('-t, --template-engine [engine]', 'Add template [engine] support',              null, 'jade')
  //.option('-c, --cheese [type]',            'Add the specified type of cheese [marble]',  null, 'marble')
  //.option('-l, --list [items]',             'Specify list items defaulting to 1,2,3',     list, [1,2,3])
  //.option('-b, --booltrue', 'Specify list items defaulting to 1,2,3', undefined, true)
  //.option('-p, --boolfalse', 'Specify list items defaulting to 1,2,3', undefined, false)

  
  .configure({
    version: '0.1.x',
    usage:   'To show the example of configure(), make option declarative',
    options: {
      // NOTE: For anyone using `domain` keyword might raise an event error because it's special
      toDomain: {
        short:      "-d",
        long:       "--toDomain",
        desc:       "Which domain do you wanna change to",
        type:       OptionTypeType.required, // NOTE: because configure() is a bridge to .option(), so that we still have an existing issue: https://github.com/tj/commander.js/issues/230
        //defaultVal: '', // defaultVal will be ignored if type is required, so you don't need to specify
        parseFn:    parseDomain,
      },
      update: {
        // short: "No short format was defined",
        long: "--update",
        desc: "Do update to the newest source code for this domain",
        type: OptionTypeType.toggle,
      },
      reset:  {
        short:      "-r",
        long:       "--reset",
        desc:       "Do `git reset --hard` for this domain",
        type:       OptionTypeType.toggle,
        defaultVal: false, // default value will valuable when type is not required like this
      },

      //.option('-t, --template-engine [engine]', 'Add template [engine] support', 'jade')
      templateEngine: {
        short:      "-t",
        long:       "--template-engine",
        desc:       "Add template [engine] support",
        type:       OptionTypeType.optional,
        defaultVal: "jade",
      },

      //.option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
      cheese: {
        short:      "-c",
        long:       "--cheese",
        desc:       "Add the specified type of cheese [marble]",
        type:       OptionTypeType.optional,
        defaultVal: "marble", // default value will valuable when type is not required like this
      },

      //.option('-l, --list [items]', 'Specify list items defaulting to 1,2,3', list, [1,2,3])
      list: {
        short:      "-l",
        long:       "--list",
        desc:       "Specify list items defaulting to 1,2,3",
        type:       OptionTypeType.optional,
        defaultVal: [1,2,3],
        parseFn: list,
      },
    }
  })
 
  
  .parse(process.argv);


// Try: node examples/configure.js -c 2cheese --list 2,3
// Try: node examples/configure.js -d "http://example.co" --update -r -c 2cheese --list 2,3

console.log('  - %s toDomain', program.toDomain);
console.log('  - %s update', program.update);
console.log('  - %s reset', program.reset);

console.log('  - %s template engine', program.templateEngine);
console.log('  - %s cheese', program.cheese);

//console.log('  - %s booltrue', program.booltrue);
//console.log('  - %s boolfalse', program.boolfalse);

console.log('  - %j', program.list);

console.log('program._version: ', program._version);
console.log('program._usage: ', program._usage);
