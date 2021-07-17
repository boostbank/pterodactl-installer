const Flag = require("./../models/Flag");
const Flags = require('./../models/Flags');

/**
 * Parses and returns the arguments we accept.
 * @param {Array} args
 * @returns {Flags}
 */
const parseFlags = args => {
  let flags = [];
  if (Array.isArray(args)) {
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      let split = arg.replace("-", "").split("=");
      if (split.length >= 2) {
        flags.push(new Flag(split[0], split[1]));
      }
    }
  }
  return new Flags(flags);
};

module.exports = parseFlags;