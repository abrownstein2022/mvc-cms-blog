const router = require('express').Router();
const { Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


const createBlogCommentMap = async () => {
  const allBlogs = await Blog.findAll();

  // for each blog post - find its comments
  //! cannot use async logic / promises in a forEach loop - it has no reference to the promises - doesn't know what to wait for
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
  if(!_id){
    console.log('gettBlogsByUserId() requires argument of "user_id"');
  }
  const blogs = await Blog.findAll({ where: { user_id: _id }});
  //! findAll is returning an array of mysql blog objects - they have nested property that we need (dataValues)
  //! loop thru the array and get the dataValues for each blog
  return blogs.map(blog => blog.dataValues);
};

const getBlogById = async (_id) => {
  if(!_id){
    console.log('gettBlogById() requires argument of "blog_id"');
  }
  const blog = await Blog.findOne({ where: { id: _id }});
  console.log('Get blog by id', {
    _id,
    blog
  });
  //! findAll is returning an array of mysql blog objects - they have nested property that we need (dataValues)
  //! loop thru the array and get the dataValues for each blog
  return blog.dataValues;
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
    await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
      username: req.session.username
    });

    // res.status(200).json(newBlog);
    res.redirect('/dashboard');
  } catch (err) {
    // res.status(400).json(err);
    res.render('error', {
      text: err?.message ?? err.toString() ?? err
    });
  }
});

//if there's a delete method, then there's also an update method (go hand-in-hand)
// POST...com/api/blogs/edit/:blog_id
router.post('/edit/:blog_id', withAuth, async (req, res) => {
  try {

    console.log('recieved request at route: api/blogs/edit/blog_id :', req.body, req.params);

    const { title, content } = req.body;
    //! check out Zod npm package (validation)
    if (!title || !content) {
      res.status(404).json({ message: 'Blog requires "title" and "content" values.' });
      return;
    }
    let blogData;
    let blogId;

    try{
      blogId = parseInt(req.params.blog_id); //~ NaN has typeof number
      console.log('Parsed id:', blogId);
    }catch(err){
      console.log('ERR 1 (cound not parse id):', err);
    }

    try{
      await Blog.findOne({ where: { id: blogId } });
    }catch(err){
      console.log('ERR 2 (blog does not exist):', err);
    }


    try{
      // await Blog.findOne({ where: { id: parseInt(req.params.blog_id) } });
      // blogData = await Blog.update({
      //   where: {
      //     id: blogId, //! next time use strings for "id"
      //   },
      //   values: {
      //     title,
      //     content
      //   }
      // });

      // const dish = await Dish.update(
      //   {
      //     dish_name: req.body.dish_name,
      //     description: req.body.description,
      //     guest_name: req.body.guest_name,
      //     has_nuts: req.body.has_nuts,
      //   },
      //   {
      //     where: {
      //       id: req.params.id,
      //     },
      //   }
      // );

      blogData = await Blog.update(
        {
          title: title,
          content: content
        },
        {
          returning: true,
          where: {
            id: blogId,
          }
        }
      );

    }catch(err){
      console.log('ERR 3 (could not update blog):', err);
    }


    if (!blogData) {
      // res.status(404).json({ message: 'No blog found with this id!' });
      res.render('error', {
        text: 'No blog found with this id!'
      });
      return;
    }

    res.redirect('/dashboard');
  } catch (err) {
    // res.status(500).json({
    //   devMessage: 'Error updating the blog content...',
    //   err
    // });
    res.render('error', {
      text: err?.message ?? err.toString() ?? err
    });
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

//if there's a delete method, then there's also an update method (go hand-in-hand)
// POST...com/api/blogs/edit/:blog_id
router.post('/comment/:blog_id', withAuth, async (req, res) => {
  try {

    console.log('recieved request at route: api/blogs/edit/blog_id :', req.body, req.params);

    const { content } = req.body;
    //! check out Zod npm package (validation)
    if ( !content) {
      res.status(404).json({ message: 'Comment requires "content" values.' });
      return;
    }
    // let blogData;
    let blogId;

    try{
      blogId = parseInt(req.params.blog_id); //~ NaN has typeof number
      console.log('Parsed id:', blogId);
    }catch(err){
      console.log('ERR 1 (cound not parse id):', err);
    }

    try{
      await Blog.findOne({ where: { id: blogId } });
    }catch(err){
      console.log('ERR 2 (blog does not exist):', err);
    }



    await Comment.create({
      username: req.session.username,
      blog_id: blogId,
      content,
    });
    res.redirect('/');





  } catch (err) {
    // res.status(500).json({
    //   devMessage: 'Error updating the blog content...',
    //   err
    // });
    res.render('error', {
      text: err?.message ?? err.toString() ?? err
    });
  }
});

// module.exports = router;
// module.exports = { createBlogCommentMap, getBlogsByUserId };

module.exports = router;
exports = module.exports;
exports.createBlogCommentMap = createBlogCommentMap;
exports.getBlogsByUserId = getBlogsByUserId;
exports.getBlogById = getBlogById;