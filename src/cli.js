#!/usr/bin/env node
const start = require('./controllers/startup-controller');
const appArgs = process.argv.slice(2);

let main = ()=>{
    start(process.argv, appArgs);
};
main();