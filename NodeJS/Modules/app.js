//console.log(module);

// call
const log = require('./logger');
log('log message');

// info about file
const path = require('path');
var pathObj = path.parse(__filename);

console.log(pathObj);

//info of Os
const os = require('os');
var totalMemory = os.totalmem();
var freeMemory = os.freemem();

console.log('Total Memory: '+totalMemory);
console.log('Free Memory: '+freeMemory);
//ECMAScript6
console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

//filesystem
const fs = require('fs');
const file = fs.readdir('./', function(err, files){
    if(err) console.log('Erro', err);
    else console.log('Resultado', files);
});