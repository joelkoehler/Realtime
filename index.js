const express = require('express'); // First, import express
const { readFile } = require('fs').promises;
const app = express() // then create a node.js express APP

// Set up home page using HTTP GET requests
app.get('/', async (request, response) => {
    response.send(await readFile('./home.html', 'utf8'));
});

// Next, tell express app to start listening to incoming requests
app.listen(process.env.PORT || 3000, () => console.log('App available on http://localhost:3000'))


// global (eg. global.val) is kinda like session?
// process is a global gives access to currently runnig node process (check platform or grab env var from server)

// CALLBACKS
    // eg. process.on('exit', function()) {
        // on exit event, run function.
    //}

// const { EventEmitter } = require('events');
// const { readFile } = require('fs');
//     const eventEmitter = new EventEmitter();

//     eventEmitter.on('hello', () => {
//         console.log('hello world');
//     })

//     eventEmitter.emit('hello');

// FILE SYSTEM
// called 'fs'
// 'sync' implies 'blocking'

// PROMISES
// asyn, non-blocking. cleaner than callbacks
// const { readFile } = require('fs').promises; 
 
// async function hello() {
//     const file = await readFile('someTextFile.txt', 'utf8');
// }

// MODULES
// libs or code
// Common JS uses require()
// ES modules use import/export
// const myModule = require('path/to/myModule');    (where myModule is some js file)

// in myModule:
// module.exports = {
//  str = 'hi'
// }

// to use someone elses code, use npm:
// $ npm init -y
// $ npm install express
// do not touch code in node_modules directory

