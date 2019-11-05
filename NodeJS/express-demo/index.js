const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home')
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

//Config
console.log('App name:'+ config.get('name'));
console.log('Mail srv:'+ config.get('mail.host'));
console.log('Mail ´wd:'+ config.get('mail.password'));
//console.log(`NODE_ENV:${process.env.NODE_ENV}`);
//console.log(`app: ${app.get('env')}`);

if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
//console.log('Morgan enabled.');
}
app.use(logger);

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
