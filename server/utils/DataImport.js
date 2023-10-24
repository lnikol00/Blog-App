const express = require('express');
const Blog = require('../model/Blog')
const asyncHandler = require('express-async-handler')
const blogs = require('../data/Blogs')

const ImportData = express.Router()

ImportData.post(
    "/blogs",
    asyncHandler(async (req, res) => {
        await Blog.deleteMany({});
        const importBlogs = await Blog.insertMany(blogs);
        res.send({ importBlogs });
    })
);

module.exports = ImportData;