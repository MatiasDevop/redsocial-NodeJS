const mongoose = require('mongoose');// mongoose is a ORM to model data

const { database } = require('./keys');
mongoose.connect(database.URI, {
    useNewUrlParser:true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(err));