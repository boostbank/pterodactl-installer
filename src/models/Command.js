const colors = require("colors");
class Command {
  constructor(cmd, usage) {
    this.cmd = cmd;
    this.usage = usage;
  }

  runCommand(args) {}

  isCommand(key) {
    return key === this.cmd;
  }

  errorOut() {
    console.error(
      colors.bgRed(`\nCommand: ${colors.yellow(this.cmd)} failed with error!`)
    );
    process.exit(1);
  }

  unknownError(e){
    console.printError("Unknown error occured!");
    console.printError(e);
    this.errorOut();
  }

  invalidCommand(message) {
    console.error(
      colors.bgRed(`\nCommand: ${colors.yellow(this.cmd)} was invalid!\n`)
    );
    if (typeof message === "string" && message.length > 0) {
      console.error(colors.red(message));
    }
    process.exit(1);
  }

  static isValidCommand(value) {
    return (
      typeof value === "object" &&
      value !== null &&
      typeof value.cmd === "string" &&
      typeof value.usage === "string" &&
      typeof value.runCommand === "function" &&
      typeof value.isCommand === "function"
    );
  }
}

module.exports = Command;
