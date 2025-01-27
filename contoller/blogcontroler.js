const { isValidObjectId } = require("mongoose");
const blogmodel = require("../models/blogbodel");

const asyncHandler = require("express-async-handler");
const validate_mongoos_id = require("../utils/validatemongodgid");

const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await blogmodel.create(req.body);
    res.json(newBlog);
  } catch (err) {
    throw new Error(err);
  }
});

const updateBlog = asyncHandler(async (req, res) => {
  try {
    const updateBlog = await blogmodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updateBlog);
  } catch (err) {
    throw new Error(err);
  }
});

const getallBlogs = asyncHandler(async (_req, res) => {
  try {
    const blogs = await blogmodel.find();
    res.json(blogs);
  } catch (err) {
    throw new Error(err);
  }
});

const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await blogmodel.findById(id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }
    res.json(blog);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validate_mongoos_id(id);
  try {
    if (!isValidObjectId(id)) {
      res.status(404);
      throw new Error("Blog not found");
    }
    const blog = await blogmodel.findByIdAndDelete(id);
    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }
    res.json({ message: "Blog removed" });
  } catch (err) {
    throw new Error(err);
  }
});

const likeBlog = asyncHandler(async (req, res) => {
  const { blog_id } = req.params;
  validate_mongoos_id(blog_id);

  const blog = await blogmodel.findById(blog_id);

  //find the blog by id and check if the user has already liked the blog
  const login_user = req?.user?.id;
  // find the user is already liked the blog
  const isliked = blog?.isliked;

  //find the user is already disliked the blog
  const already_disliked = blog?.dislikes?.find(
    (dislike) => dislike.toString() === login_user.toString()
  );

  if (already_disliked) {
    //if user has already disliked the blog, remove the dislike
    const blog = await blogmodel.findByIdAndUpdate(
      blog_id,
      {
        $pull: { dislikes: login_user },
        dislikes: false,
      },
      {
        new: true,
      }
    );
    console.log("liked blog", blog);
    res.json(blog);
  }
  if (isliked) {
    //if user has already liked the blog, remove the like
    const blog = await blogmodel.findByIdAndUpdate(
      blog_id,
      {
        $pull: { likes: login_user },
        isliked: false,
      },
      {
        new: true,
      }
    );
    console.log("unliked blog", blog);
    res.json(blog);
  } else {
    //if user has not liked the blog, add the like
    const blog = await blogmodel.findByIdAndUpdate(
      blog_id,
      {
        $push: { likes: login_user },
        isliked: true,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  }
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const { blog_id } = req.params;
  validate_mongoos_id(blog_id);

  const blog = await blogmodel.findById(blog_id);

  //find the blog by id and check if the user has already liked the blog
  const login_user = req?.user?.id;
  // find the user is already liked the blog
  const isdisliked = blog?.isdisliked;
  //find the user is already disliked the blog
  const already_liked = blog?.likes?.find(
    (dislike) => dislike.toString() === login_user.toString()
  );

  if (already_liked) {
    //if user has already disliked the blog, remove the dislike
    const blog = await blogmodel.findByIdAndUpdate(
      blog_id,
      {
        $pull: { dislikes: login_user },
        dislikes: false,
      },
      {
        new: true,
      }
    );

    res.json(blog);
  }
  if (isdisliked) {
    //if user has already liked the blog, remove the like
    const blog = await blogmodel.findByIdAndUpdate(
      blog_id,
      {
        $pull: { dislikes: login_user },
        isdisliked: false,
      },
      {
        new: true,
      }
    );

    res.json(blog);
  } else {
    //if user has not liked the blog, add the like
    const blog = await blogmodel.findByIdAndUpdate(
      blog_id,
      {
        $push: { dislikes: login_user },
        isdisliked: true,
      },
      {
        new: true,
      }
    );
    res.json(blog);
  }
});

module.exports = {
  createBlog,
  updateBlog,
  getallBlogs,
  getBlogById,
  deleteBlog,
  likeBlog,
  dislikeBlog,
};
