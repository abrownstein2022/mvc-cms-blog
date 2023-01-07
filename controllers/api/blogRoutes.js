const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


const createBlogCommentMap = async () => {
  const allBlogs = await Blog.findAll();

  // for each blog post - find its comments
  //! cannot use async logic / promises in a forEach loop - it has no reference to the promises - doesnt know what to wait for
  // Promise.all takes an array of promises and waits for EVERY one of them to resolve or reject
  // const allBlogsWithComments = Promise.all(
  //   // we need an array so we use array.map
  //   // the loop must return a promise ( Model.findAll() returns a promise )
  //   // find all comments with matching 'blog_id'
  //   allBlogs.map((blog) => Comment.findAll({ where: { blog_id: blog.id} }))
  // )

  // { blog_id: { ...blog }  }
  const blogMap = {};


  await Promise.all(
    // now we are returning an async function, instead of the Comment.findAll directly
    allBlogs.map(async (blog) => {
      let thisBlogsComments = await Comment.findAll({ where: { blog_id: blog.id} });
      // { blog_id: { ...blog }  }
      blogMap[blog.id] = {
        ...blog,
        comments: thisBlogsComments
      };

    })
  );
  return blogMap;
};


const getBlogsByUserId = async (_id) => {
  const blogs = await Blog.findAll({ where: { user_id: _id }});
  return blogs;
};
// GET...com/api/blogs (for the homepage - list every blog post)
// PUBLIC - anyone can see all blogs (no witthAuth middleware)
router.get('/', async (req, res) => {
  try {
    // get all blog posts
    const allBlogs = await Blog.findAll();
    res.status(200).json(allBlogs);
  }catch(err){
    res.status(400).json(err);
  }
});

//! DASHBOARD
// GET...com/api/blogs/my-blogs (for the dashboard - show current users blog posts)
// PUBLIC - anyone can see all blogs (no witthAuth middleware)
router.get('/my-blogs', async (req, res) => {
  try {
    const blogMap = await createBlogCommentMap();
    res.status(200).json(Object.values(blogMap));
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST...com/api/blogs (for the dashboard - create a new blog post from the dash)
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
router.put('/:blog_id', withAuth, async (req, res) => {
  try {

    const { title, content } = req.body;
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

// module.exports = router;
// module.exports = { createBlogCommentMap, getBlogsByUserId };

module.exports = router;
exports = module.exports;
exports.createBlogCommentMap = createBlogCommentMap;
exports.getBlogsByUserId = getBlogsByUserId;