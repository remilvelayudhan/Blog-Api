
const auth = require('../middlewares/auth');
const Blog = require('../models/Blog');

const createBlog = async (req,res)=>{

    const owner =req.user.id;
    const {title,blog} =req.body;
    try{
        const newBlog = new Blog({
            title,
            blog,
            owner
        })
        await newBlog.save();
        res.status(200).send({msg:'Blog created successfully',newBlog})
    }catch(err){
        res.status(500).send({msg:err.message})
    }

}

const getAllBlogs = async (req,res)=>{
    try{
        const blogs = await Blog.find({})
        res.json({
            message: 'Blogs fetched successfully',
            blogs
        });
    }
    catch(err){
        res.status(400).send({error: err});
    }
}

const getBlogById = async (req,res)=>{
    try{
        const blog = await Blog.findById(req.params.id);
        res.json({
            message: 'Blog fetched successfully',
            blog
        });
    }
    catch(err){
        res.status(400).send({error: err});
    }
}


const updateBlog = async (req,res)=>{
    
    const { title, blog } = req.body;
    try {
        const newblog = await Blog.findOne({ _id: req.params.id, owner: req.user._id });
        if(!newblog){
            return res.status(400).json({
                message: 'Blog not found'
            });
        }
        newblog.title = title;
        newblog.blog = blog;
        await newblog.save();

        res.json({
            message: 'Blog updated successfully'
        });
    }
    catch(err){
        res.status(400).send({error: err});
    }

}

module.exports= {createBlog,getAllBlogs,getBlogById,updateBlog}