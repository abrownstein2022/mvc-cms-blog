const router = require('express').Router();
const { User } = require('../../models');



//! not recommended to use router inside of the router
// this is possible but complicated and not recommended
// let data = router.get('/user-data')

//! we COULD duplicate our logic here
// recommended to separate your controller / router logic
/** registerUser({ username, password }) */
const registerUser = async (config) => {
  try {
    // user model is only looking for username and password, so will ignore any other keys
    const userData = await User.create(config);
    return userData;
  } catch (err) {
    console.log(err);
    // functions that return nothing or just return - actually return undefined
    return undefined;
  }
};



// get current user data to display on homepage or navbar
// this 'req' object is always the same object - the router is passing it to the correct 'route' to handle some logic
// not recommended to put logic directly in routes, because you cant use routes elsewhere
router.get('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json({
        id: userData.id,
        username: userData.username,
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// POST ...com/api/users/register - to register a new user { username, password }
router.post('/register', async (req, res) => {
  try {
    //! not recommended to use router inside of the router
    // this is possible but complicated and not recommended
    // let data = router.get('/user-data')

    //! we COULD duplicate our logic here
    // recommended to separate your controller / router logic
    const userData = await registerUser(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      // res.status(200).json({
      //   ...userData,
      //   password: '*' //! overwriting the password so no insecure data is returned to the front-end
      // });
      // do not use pass the entire object. Just pass the fields we need to show and don't show the password.
      res.status(200).json({
        id: userData.id,
        username: userData.username,
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'No user found, please try again' });
      return;
    }


    // these utility methods only wxist on the instance of the class, not the class itself (see static class methods)

    // await is NON-DESTRUCTIVE - you can use it anywhere to handle async / sync functions
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    console.log('User logged in successfully, setting user_id in session vars:', userData.id);
    req.session.user_id = userData.id;
    req.session.username = userData.username;
    req.session.logged_in = true;
    console.log('confirm session vars:', req.session);

    req.session.save(() => {
      // res.status(200).json({
      //   id: userData.id,
      //   username: userData.username,
      // });

      // res.status(200).json({
      //   user: userData.id,
      //   username: userData.username,
      //   message: 'You are now logged in!'
      // });
      // res.render('dashboard', {
      //   username: userData.username,
      //   user_id: userData.id
      // });
      res.redirect('/dashboard');
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
