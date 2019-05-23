const moment = require('moment');

const helpers = {};

// this is to look at time og image a you can use where else
helpers.timeago = timestamp =>{
   return moment(timestamp).startOf('minute').fromNow();
}
module.exports = helpers;