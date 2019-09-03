const EventEmitter = require('events');

var url = 'http://mylogger.io/log';

class Logger extends EventEmitter {
    log(message){
        //send an http request
        console.log(message);
    //Raise Event // make noise, produce - signalling
        this.emit('messageLogged', {id:1,url: 'http://'});
    
    }
}



module.exports = Logger;