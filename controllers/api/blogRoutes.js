const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth');


// GET...com/api/blogs
// PUBLIC - anyone can see all blogs (no witthAuth middleware)
router.get('/', async (req, res) => {
  try {
    const allBlogs = await Blog.findAll()

    res.status(200).json(allBlogs);
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST...com/api/blogs
router.post('/', withAuth, async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

//if there's a delete method, then there's also an update method (go hand-in-hand)
// UPDATE...com/api/blogs/:id
router.update('/:blog_id', withAuth, async (req, res) => {
  try {

    const { title, content } = req.body
    //! check out Zod npm package (validation)
    if (!title || !content) {
      res.status(404).json({ message: 'Blog requires "title" and "content" values.' });
      return;
    }

    const blogData = await Blog.update({
      where: {
        id: req.params.blog_id,
        // user_id: req.session.user_id,
      },
      values: {
        title,
        content
      }
    });     

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//if there's a delete method, then there's also an update method (go hand-in-hand)
// DELETE...com/api/blogs/:id
router.delete('/:blog_id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.blog_id,
        user_id: req.session.user_id,
      },
    });     

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
