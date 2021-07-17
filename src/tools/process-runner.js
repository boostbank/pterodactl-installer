const spawn = require("cross-spawn");
const colors = require('colors');

const sh = (command = "echo Hello World!", cwd = "", env = process.env, silent = false) => {
  return new Promise((resolve, reject) => {

    if(!silent){
      if(typeof cwd === "string" && cwd !== ""){
        console.msg(`Running in directory: ${cwd}`);
      }
      console.log(colors.grey(`> ${command}`));
    }
      const split = command.split(" ");

      if (split.length > 0) {
        const baseCommand = split[0];
  
        split.splice(0, 1);
  
        let logs = "";

        const child = spawn(baseCommand, split, { cwd, env, stdio: ["inherit", "pipe", "inherit"], shell: true });

        child.stdout.on("data", (data)=>{
          logs += data;
          if(!silent){
            process.stdout.write(data);
          } 
        });

        child.on("close", code => {
          if (code === 0) {
            resolve(logs);
          } else {
            reject(code);
          }
        });
  
        child.on("error", code => {
          reject(code);
        });
      }else{
        console.error("Command provided invalid.");
        process.exit(1);
      }
  });
};

module.exports = { sh };