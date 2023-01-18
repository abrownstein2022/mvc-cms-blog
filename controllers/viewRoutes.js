const router = require('express').Router();
const withAuth = require('../utils/auth');
const { getBlogById } = require('./api/blogRoutes');
const {Blog, Comment} = require('../models'); //1/16/23


// Use withAuth middleware to prevent access to route
//signup only has a render since doesn't require any data
router.get('/signup', async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    // res.status(500).json(err);
    res.render('error', {
      username: req.session.username,
      text: err?.message ?? err.toString() ?? err
    });
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    //! not recommended to use router inside of the router
    // this is possible but complicated and not recommended
    // let data = router.get('/user-data')

    //! we COULD duplicate our logic here
    // // recommended to separate your controller / router logic
    const blogData = await Blog.findAll({
      where: { user_id: req.session.user_id }
    });
    const blogs = blogData.map(blog => blog.get({plain:true})).sort((a,b) => a.date_created < b.date_created ? 1 : -1);


    // // Serialize data so the template can read it
    // const projects = projectData.map((project) => project.get({ plain: true }));

    // const blogMap = createBlogCommentMap();
    res.render('dashboard', {
      blogs,
      logged_in: req.session.logged_in,
      // this will only show the blogs for the currently logged in user
      user_id: req.session.user_id,
      username: req.session.username,
    });
  } catch (err) {
    //! never return status/json from a view route - create an error.hbs page and render it with error data
    // res.status(500).json(err);
    res.render('error', {
      username: req.session.username,
      text: err?.message ?? err.toString() ?? err
    });
  }
});

// homepage does not need login - open to public
router.get('/', async (req, res) => {
  try {
    // if(!req.session.user_id){
    //   res.render('error', {
    //     text: 'You must be logged in, how did you get here?'
    //   });
    //   return;
    // }
    //! tthis func now returns the mysql blog items mapped to an array of their dataVlaues
    //! can use the array directly without filtering
    //  const blogs = await getBlogsByUserId(req.session.user_id);

    const blogData = await Blog.findAll({
      include: [
        {
          model: Comment,
          attributes: ['username', 'content'],
        },
      ],
    });
    const blogs = blogData.map(blog => blog.get({plain:true})).sort((a,b) => a.date_created < b.date_created ? 1 : -1); //serialize data
    console.log('got blogs by current user:', blogs);

    res.render('homepage', {
      blogs,
      user_id: req.session.user_id,
      username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    //! never return status/json from a view route - create an error.hbs page and render it with error data
    res.render('error', {
      username: req.session.username,
      text: err?.message ?? err.toString() ?? err
    });
  }
});

// homepage does not need login - open to public
router.get('/active/:blog_id', withAuth, async (req, res) => {
  try {
    const blogId = parseInt(req.params.blog_id);
    const blogData = await Blog.findAll({
      include: [
        {
          model: Comment,
          // attributes: ['name'],
        },
      ],
    });

    const blogs = blogData
      .map(blog => {
        blog = blog.get({plain:true});

        if(blog.id === blogId){
          return {
            ...blog,
            active: true,
          };
        }

        return blog;

      })
      .sort((a,b) => a.date_created < b.date_created ? 1 : -1);
    //serialize data
    console.log('got blogs by current user:', blogs);

    res.render('homepage', {
      blogs,
      user_id: req.session.user_id,
      username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    //! never return status/json from a view route - create an error.hbs page and render it with error data
    res.render('error', {
      username: req.session.username,
      text: err?.message ?? err.toString() ?? err
    });
  }
});

// add a route to handle showing the edit blog page
//! withAuth is middleware that checks if logged-in
router.get('/edit/:blog_id', withAuth, async (req, res) => {
  try {
    const blog = await getBlogById(req.params.blog_id);

    res.render('edit', {
      blog,
      username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    //! never return status/json from a view route - create an error.hbs page and render it with error data
    res.render('error', {
      username: req.session.username,
      text: err?.message ?? err.toString() ?? err
    });
  }
});

router.get('/new', withAuth, async (req, res) => {
  try {
    res.render('new', {
      username: req.session.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    //! never return status/json from a view route - create an error.hbs page and render it with error data
    res.render('error', {
      username: req.session.username,
      text: err?.message ?? err.toString() ?? err
    });
  }
});





module.exports = router;
