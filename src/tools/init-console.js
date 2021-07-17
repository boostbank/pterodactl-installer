const colors = require('colors');

const initConsole = () => {
    console.success = (msg) => {
        console.log(colors.green(msg));
    };
    console.msg = (msg) => {
        console.log(colors.grey(msg));
    };
    console.title = (msg) =>{
        console.log(colors.cyan(msg));
    }
    console.printWarning = (msg)=>{
        console.log(colors.yellow(msg));
    }
    console.printError = (msg)=>{
        console.error(colors.red(msg));
    };
}

module.exports = initConsole;