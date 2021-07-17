const colors = require('colors');
const PreInstall = require("./../steps/PreInstall");
const allowed = [new PreInstall()];

const runner = (arguments) =>{
    return new Promise(async resolve=>{
        console.msg("Finding action...");
        let found = false;
        if(arguments){
            const action = arguments.getArgument("action");
            for (let i = 0; i < allowed.length; i++) {
                const step = allowed[i];
                if(step.name === action){
                    found = true;
                    i = allowed.length;
                    console.msg(`Found & running action: ${step.name}.`);
                    console.printWarning("-----------------------------------------------------");
                    await step.run(arguments);
                    console.printWarning("-----------------------------------------------------");
                }
            }
            if(found){
                console.log(colors.grey("Step complete!"));
                resolve();
            }else{
                console.printError("No valid action! Exiting.");
                process.exit(1);
            }
        }
    });
}

module.exports = runner;