class Arguments {
    constructor(args) {
      this.args = args;
    }
  
    getArgument(name) {
      let argument = "";
  
      for (let i = 0; i < this.args.length; i++) {
        const arg = this.args[i];
        if (arg.name === name) {
          i = this.args.length;
          argument = arg.value;
        }
      }
  
      return argument;
    }
  
    getAllByName(name){
      let args = [];
  
      for (let i = 0; i < this.args.length; i++) {
        const arg = this.args[i];
        if (arg.name === name) {
          args.push(arg);
        }
      }
  
      return args;
    }
  
    hasArgument(name){
      let has = false;
  
      for (let i = 0; i < this.args.length; i++) {
        const arg = this.args[i];
        if (arg.name === name) {
          has = true;
          i = this.args.length;
        }
      }
  
      return has;
    }

    addArgument(arg){
        if(typeof arg === "object" && typeof arg.name === "string" && typeof arg.value === "string"){
            if(arg.name.length > 0 && arg.value.length > 0){
                if(!this.hasArgument(arg.name)){
                    this.args.push(arg);
                }
            }
        }
    }
  }
  
  module.exports = Arguments;