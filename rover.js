class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL'
      this.generatorWatts = 110 
    }

    receiveMessage(message){
      return {
         message: message.name,
         results: message.commands.map(command => {   
            if (command.commandType === "MOVE"){
               if(this.mode === "LOW_POWER") {
                  return {
                     completed: false 
                  }
               }
               else { 
                  this.position = command.value;
                  return {
                     completed: true

                  }

               }
   
            }
            else if (command.commandType === "STATUS_CHECK"){
               return {
                  completed: true,
                  roverStatus: {
                     mode: this.mode,
                     position: this.position,
                     generatorWatts: this.generatorWatts, 
                      
                  }
      
               }
            }
            else if (command.commandType === "MODE_CHANGE") {
               this.mode = command.value;
               return {
                  completed: true

               }
            }
            else {
               throw new Error ("unknown command type")
               
            }
         }),
      }
    }

} 

module.exports = Rover;