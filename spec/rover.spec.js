const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it ("constructor sets position and default values for mode and generatorWatts", function(){
    const newRover = new Rover(100)
    expect(newRover.position).toBe(100); 
    expect(newRover.mode).toBe('NORMAL'); 
    expect(newRover.generatorWatts).toBe(110); 
  }) 

  it ("response returned by receiveMessage contains the name of the message", function(){
    const newRover = new Rover(100)
    const commands = [new Command("MOVE", 100)]
        const newMessage = new Message("Roven", commands)
        const response = newRover.receiveMessage(newMessage) 
    expect(response.message).toBe("Roven")
    
  }) 

  it ("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
     const newRover = new Rover(100)
    const commands = [new Command("MOVE", 100), new Command ("MOVE", 105)]
        const newMessage = new Message("Roven", commands)
        const response = newRover.receiveMessage(newMessage) 
    expect(response.results.length).toBe(commands.length)
  }) 
  
  it ("responds correctly to the status check command", function(){
    const newRover = new Rover(100)
    const commands = [new Command("STATUS_CHECK")]
        const newMessage = new Message("Roven", commands)
        const response = newRover.receiveMessage(newMessage) 
    expect(response.results.length).toBe(commands.length)
    const roverStatus = response.results[0].roverStatus; 
    expect(roverStatus.mode).toBe("NORMAL")
    expect(roverStatus.generatorWatts).toBe(110)
    expect(roverStatus.position).toBe(100)

    
  }) 
  it ("responds correctly to the mode change command", function(){
    const newRover = new Rover(100)
    const commands = [new Command("MODE_CHANGE", "LOW_POWER")]
        const newMessage = new Message("Roven", commands)
        const response = newRover.receiveMessage(newMessage) 
    expect(response.results.length).toBe(commands.length)
    expect (response.results[0].completed).toBe (true)
    expect(newRover.mode) .toBe("LOW_POWER")
        

    
  }) 
  it ("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    const newRover = new Rover(100)
    const commands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 100)]
        const newMessage = new Message("Roven", commands)
        const response = newRover.receiveMessage(newMessage) 
    expect(response.results.length).toBe(commands.length)
    expect (response.results[1].completed).toBe (false)
    expect(newRover.position) .toBe(100) 
  }) 
  it ("responds with the position for the move command", function(){
    const newRover = new Rover(100)
    const commands = [new Command("MODE_CHANGE", "NORMAL"), new Command("MOVE", 200)]
        const newMessage = new Message("Roven", commands)
        const response = newRover.receiveMessage(newMessage) 
    expect(response.results.length).toBe(commands.length)
    expect (response.results[1].completed).toBe (true)
    expect(newRover.position) .toBe(200) 

    
  }) 
 


});
