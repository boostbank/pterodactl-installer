const colors = require('colors');

class Step{
    constructor(name = ""){
        this.name = name;
        this.success = true;
    }

    notifyStart(){
        console.log(colors.green(`Starting Step: ${this.name}\n`));
    }

    notifyEnd(){
        console.log(colors.green(`\nFinished Step: ${this.name}`));
    }

    errorOut(e){
        console.error(colors.bgRed(`\nStep: ${colors.yellow(this.name)} failed with error!`));
        process.exit(1);
    }

    run(args){}

}

module.exports = Step;