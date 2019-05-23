const express = require('express');
const config = require('./server/config');

const app = config(express()); //to config express exist another way
//database
require('./database');

app.listen(app.get('port'), () => {
    console.log('server on port:', app.get('port'));
});