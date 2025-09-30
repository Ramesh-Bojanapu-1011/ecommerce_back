import { Router } from 'express';
const router = Router();
import {
  createBlog,
  updateBlog,
  getallBlogs,
  getBlogById,
  deleteBlog,
  likeBlog,
  dislikeBlog
} from '../contoller/blogcontroler.js';
import Auth from '../middlewares/authmiddleware.js';

router.get('/all', getallBlogs);
router.get('/getBlogById/:id', getBlogById);
router.put('/likeblog/:blog_id', Auth.authMiddleware, likeBlog);
router.put('/dislikeblog/:blog_id', Auth.authMiddleware, dislikeBlog);
router.delete('/deleteblog/:id', Auth.authMiddleware, Auth.isAdmin, deleteBlog);

router.post('/create', Auth.authMiddleware, Auth.isAdmin, createBlog);
router.put('/update/:id', Auth.authMiddleware, Auth.isAdmin, updateBlog);

export default router;
