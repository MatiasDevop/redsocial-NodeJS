const ctrl = {};
const path =require('path');
const fs = require('fs-extra');
const md5 = require('md5');
const { randomNumber } = require('../helpers/libs');

const sidebar = require('../helpers/sidebar');
// const Image = require('../models/image'); this can be change to another instruccion like this.
// to import the same
const { Image , Comment} = require('../models');
// to incement views
ctrl.index = async (req, res)=>{
    
    let viewModel = {image: {}, comments: {}};
   // to test console.log(req.params.image_id);
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image){ // if exist do it
        image.views= image.views + 1;
        viewModel.image = image;
        await image.save();
        const comments = await Comment.find({image_id: image._id}); // id from own id
        viewModel.comments = comments;
        // this is a new instrucciones to sidebar
        viewModel = await sidebar(viewModel);
        res.render('image', viewModel);
        //res.render('image', {image, comments});
    }else{
        res.redirect('/');
    }
   
   // res.send('hi imagectrl');
};
// to save a new image
ctrl.create = (req, res)=>{
    //console.log(req.file);
    const saveImage = async () => {
        const imgUrl = randomNumber();//get num randowm
        const images = await Image.find({filename: imgUrl});//search db
        if(images.length > 0){
            saveImage();// recurcion.......
        }else{
                console.log(imgUrl);
            const imageTempPath=req.file.path;
            const ext = path.extname(req.file.originalname).toLocaleLowerCase();
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`);
            if(ext === '.png' || ext === '.jpg' || ext ==='.jpeg' || ext === '.gif'){
                await fs.rename(imageTempPath,targetPath); // to move from file to another
            const newImg = new Image({
                    title: req.body.title,
                    filename:imgUrl + ext,
                    description:req.body.description,
                });
                const imageSave = await newImg.save();
                res.redirect('/images/'+ imgUrl);
            }else{
                await fs.unlink(imageTempPath);
                res.status(500).json({error: 'Only Images are allowed'});
            }
            //res.send('works');
            //res.redirect('/images');
        }
        
    }
    saveImage();
  
   // res.send('hi imagectrl');
};

ctrl.like = async (req, res)=>{
    console.log(req.params);
    const image = await Image.findOne({filename: {$regex: req.params.image_id}})
    console.log(image);
    if(image){
        image.likes = image.likes + 1;
        await image.save();
        res.json({likes: image.likes});
    }else{
        res.status(500).json({error: 'Internal Error'});
    }
   // res.send('hi imagectrl');
};
// to comments and gravatar
ctrl.comment = async (req, res)=>{
    //console.log(req.body);
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image){
        const NewComment = new Comment(req.body);
        NewComment.gravatar = md5(NewComment.email);
        NewComment.image_id = image._id;
       // console.log(NewComment);
       NewComment.save();//console.log(req.params.image_id);
       res.redirect('/images/'+ image.uniqueId);
    }else{
        res.redirect('/');
    }
    // res.send('hi imagectrl');
 };

 ctrl.remove = async(req, res)=>{
     console.log(req.params.image_id);
     const image = await Image.findOne({filename: {$regex: req.params.image_id}});
        if(image){
            await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
            await Comment.deleteOne({image_id: image._id});
            await image.remove()
            res.json(true);
        }
     //  const _id = req.params.image_id;
    //  const image = await Image.findByIdAndDelete(_id);
    //  res.redirect('/');
    // res.send('hi imagectrl');
 };
module.exports = ctrl;