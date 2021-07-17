const Argument = require("./../models/Argument");
const Arguments = require('./../models/Arguments');

/**
 * Parses and returns the arguments we accept.
 * @param {Array} args
 * @returns Argument
 */
const parse = args => {
  let arguments = [];
    console.msg("Parsing args..");
  if (Array.isArray(args)) {
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      let split = arg.replace("-", "").split("=");
      if (split.length >= 2) {
        arguments.push(new Argument(split[0], split[1]));
      }
    }
  }
  console.msg(`Found ${arguments.length} valid arguments.`);
  return new Arguments(arguments);
};

module.exports = parse;