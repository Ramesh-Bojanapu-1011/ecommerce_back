const express = require('express');
const router = express.Router();
const {
  createBlog,
  updateBlog,
  getallBlogs,
  getBlogById,
  deleteBlog,
  likeBlog,
  dislikeBlog,
} = require('../contoller/blogcontroler');
const { authMiddleware, isAdmin } = require('../middlewares/authmiddleware');

router.get('/all', getallBlogs);
router.get('/getBlogById/:id', getBlogById);
router.put('/likeblog/:blog_id', authMiddleware, likeBlog);
router.put('/dislikeblog/:blog_id', authMiddleware, dislikeBlog);
router.delete('/deleteblog/:id', authMiddleware, isAdmin, deleteBlog);

router.post('/create', authMiddleware, isAdmin, createBlog);
router.put('/update/:id', authMiddleware, isAdmin, updateBlog);

module.exports = router;
