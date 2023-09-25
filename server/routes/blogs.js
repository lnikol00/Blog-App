const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const blogController = require('../controllers/blogController');

router.route('/')
    .get(asyncHandler(blogController.getAllBlogs))
    .post(asyncHandler(blogController.createBlog))

router.route('/:id')
    .get(asyncHandler(blogController.getSingleBlog))
    .put(asyncHandler(blogController.editBlog))
    .delete(asyncHandler(blogController.deleteBlog))

module.exports = router;