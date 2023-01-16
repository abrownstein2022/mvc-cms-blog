const router = require('express').Router();
const withAuth = require('../utils/auth');
const { createBlogCommentMap, getBlogsByUserId, getBlogById } = require('./api/blogRoutes');


router.get('/', async (req, res) => {
  try {
    //! not recommended to use router inside of the router
    // this is possible but complicated and not recommended
    // let data = router.get('/user-data')

    //! we COULD duplicate our logic here
    // // recommended to separate your controller / router logic
    // const projectData = await Project.findAll({
    //   include: [
    //     {
    //       model: User,
    //       attributes: ['name'],
    //     },
    //   ],
    // });


    // // Serialize data so the template can read it
    // const projects = projectData.map((project) => project.get({ plain: true }));

    const blogMap = createBlogCommentMap();
    res.render('homepage', {
      blogMap,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    //! never return status/json from a view route - create an error.hbs page and render it with error data
    // res.status(500).json(err);
    res.render('error', {
      text: err?.message ?? err.toString() ?? err
    });
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    if(!req.session.user_id){
      res.render('error', {
        text: 'You must be logged in, how did you get here?'
      });
      return;
    }
    //! tthis func now returns the mysql blog items mapped to an array of their dataVlaues
    //! can use the array directly without filtering
    const blogs = await getBlogsByUserId(req.session.user_id);

    console.log('got blogs by current user:', blogs);

    res.render('dashboard', {
      blogs,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    //! never return status/json from a view route - create an error.hbs page and render it with error data
    res.render('error', {
      text: err?.message ?? err.toString() ?? err
    });
  }
});

// add a route to handle showing the edit blog page
router.get('/edit/:blog_id', async (req, res) => {
  try {
    const blog = getBlogById(req.params.blog_id);

    res.render('edit', {
      blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    //! never return status/json from a view route - create an error.hbs page and render it with error data
    res.render('error', {
      text: err?.message ?? err.toString() ?? err
    });
  }
});


// Use withAuth middleware to prevent access to route
router.get('/signup', withAuth, async (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    // res.status(500).json(err);
    res.render('error', {
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


module.exports = router;
