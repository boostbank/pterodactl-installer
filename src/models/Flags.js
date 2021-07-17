class Flags {
    constructor(args) {
      this.args = args;
    }
  
    getFlag(name) {
      let flag = "";
  
      for (let i = 0; i < this.args.length; i++) {
        const arg = this.args[i];
        if (arg.name === name) {
          i = this.args.length;
          flag = arg.value;
        }
      }
  
      return flag;
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
  
    hasFlag(name){
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

    addFlag(arg){
        if(typeof arg === "object" && typeof arg.name === "string" && typeof arg.value === "string"){
            if(arg.name.length > 0 && arg.value.length > 0){
                if(!this.hasFlag(arg.name)){
                    this.args.push(arg);
                }
            }
        }
    }
  }
  
  module.exports = Flags;