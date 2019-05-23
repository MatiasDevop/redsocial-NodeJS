const mongoose = require('mongoose');
const path = require('path');
const { Schema } = mongoose;

const ImageSchema = new Schema({
    title:{type: String},
    description:{ type: String},
    filename: { type: String},
    views:{ type: Number, default: 0},
    likes:{ type: Number, default: 0},
    timestamp:{ type: Date, default: Date.now}
});
//virtual variable its is when you typing code
ImageSchema.virtual('uniqueId') //get back just filname without extension
.get(function(){
    return this.filename.replace(path.extname(this.filename), '')
});
module.exports = mongoose.model('Image', ImageSchema);