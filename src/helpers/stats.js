const { Comment, Image } = require('../models');

async function imageCounter(){
    return await Image.countDocuments();
}
async function  commentsCounter(){
    return await Comment.countDocuments();
}

async function imageTotalViewCounter(){
        /// this method is from mongoDB
        
    const result = await Image.aggregate([{$group: {
        _id: '1',
        viewsTotal: {$sum: '$views'}
    }}]);
    let viewsTotal = 0;
    if(result.length > 0) {
        viewsTotal += result[0].viewsTotal;
    }
    return viewsTotal;
    //return result[0].viewsTotal;        
}

async function likesTotalCounter(){
        const result = await Image.aggregate([{ 
            $group:{
            _id: '1',
            likesTotal: {$sum: '$likes'}
            }
    }]);
        let likesTotal = 0;
    if (result.length > 0) {
        likesTotal += result[0].likesTotal;
    }
    return likesTotal;
    //return result[0].likesTotal;
}

module.exports = async () => {
    //this Promise performs a lot of functions
    const results = await Promise.all([
        imageCounter(),
        commentsCounter(),
        imageTotalViewCounter(),
        likesTotalCounter()
    ])
    //[10,50.100,500]
    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }
}