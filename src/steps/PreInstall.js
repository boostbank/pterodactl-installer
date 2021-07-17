"use strict";
const colors = require('colors');
const Step = require("./Step");
const { sh } = require("./../tools/process-runner");
const fs = require('fs');

class PreInstall extends Step {
  constructor() {
    super("init");
  }

  run(args) {
    return new Promise(async resolve => {
      try {
          this.notifyStart();
          process.exit(1);
      } catch (e) {
        this.errorOut(e);
      }
    });
  }
}

module.exports = PreInstall;