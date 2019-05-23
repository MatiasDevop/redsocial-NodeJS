const Stats = require('./stats');
const Images = require('./images');
const Comments = require('./comments');

module.exports = async viewModel =>{
    //viewmodel must get data from model
    // Images.popular();
    // Stats();
    // Comments.newest(); change by promise()
   const results = await Promise.all([
            Stats(),    
            Images.popular(),
            Comments.newest()
    ]);

    viewModel.sidebar = {
        stats: results[0],
        popular: results[1],
        comments: results[2]
    };
    return viewModel;
}