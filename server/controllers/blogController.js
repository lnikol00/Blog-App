const Blog = require('../model/Blog')

//GET ALL BLOGS
const getAllBlogs = async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs);
}

//GET SINGLE BLOG
const getSingleBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        res.json(blog)
    } else {
        res.sendStatus(404);
    }
}

//CREATE BLOG
const createBlog = async (req, res) => {
    const { title, author, body } = req.body;
    if (!title || !author || !body) return res.status(400).send({ 'message': 'Title, body and author are required.' });

    //create and store the new blog
    const newBlog = new Blog({
        title,
        author,
        body
    });

    if (newBlog) {
        const createNewBlog = await newBlog.save();
        res.status(201).json(createNewBlog);
    } else {
        res.sendStatus(400);
    }
}

//EDIT BLOG
const editBlog = async (req, res) => {
    const { title, author, body } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (blog) {
        blog.title = title;
        blog.author = author;
        blog.body = body;

        const updateBlog = await blog.save();
        res.json(updateBlog);
    } else {
        res.sendStatus(400);
    }
}

//DELETE BLOG
const deleteBlog = async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        await blog.remove();
        res.json({ message: "Blog deleted" });
    } else {
        res.sendStatus(404);
    }
}

module.exports = {
    getAllBlogs,
    getSingleBlog,
    createBlog,
    editBlog,
    deleteBlog
}