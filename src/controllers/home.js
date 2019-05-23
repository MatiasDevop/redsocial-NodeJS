const ctrl = {};
const { Image } = require('../models');

const sidebar = require('../helpers/sidebar');

ctrl.index = async(req, res) =>{
    const images = await Image.find().sort({timestamp: -1});// order by ASC or any...
    //console.log(images);
    //this is new intruccions
    let viewModel = { images: [] }; // array images at start is empty
    viewModel.images = images;
    viewModel = await sidebar(viewModel);
    // until here
    // console.log('hi home');
    console.log(viewModel.sidebar);
    res.render('index',  viewModel);// news
    //res.render('index', { images }); // with the las Version JAVASCRPT you could put {images}

};

module.exports = ctrl;