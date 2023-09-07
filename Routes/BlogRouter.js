const express =require('express');
const router = express.Router();

const {createBlog,getAllBlogs,getBlogById,updateBlog}= require('../Controllers/BlogController')
const auth=require('../middlewares/auth')



router.post('/create',(req,res)=>{
console.log(req.body);
});
router.post('/blogs',getAllBlogs);
router.post('/blogs/id',getBlogById);

router.post('/updateBlog/id',auth,updateBlog);





module.exports = router;