const router = require("express").Router();
// file servers assume a path to a directory (/path/to) is referencing an index file in
// that directory (/path/to/index.any)
const { Customers } = require("../../models");
const withAuth = require("../../utils/auth");
const logger = require('../../utils/logger.js');
//! API routes should only send data


//Creates profile
// with auth is middleware that will intercept the request to this route
// withAuth checks the login status and calls next(), or sends user to login
// will never have a route with just forward slash after an api route
// would come after another route like api/users/
// in other words, would never just see "http://localhost:3001/api/" in the browser.
// would always have something after it like http://localhost:3001/api/users etc
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
      res.status(200).json("ayoo");
  } catch (err) {
    res.status(400).json(err);
  }
});

/* 
{
	"customer_first_name":"abcdef",
	"customer_last_name":"",
	"customer_login":"alice44",
	"customer_password":""
}
*/
//Post route for login
// POST localhost:3001/api/users/login
router.post('/register', async (req, res) => {
  try {
    // const log = logger('/register')
    
    console.log('Registering user:', req.body)
    
    let fname = req.body.customer_first_name
    let lname = req.body.customer_last_name
    let login = req.body.customer_login
    let pwrd = req.body.customer_password

    //! Could be tested all at once
    //! API routes are typically designed for other developers, the more detail the better
    if(!fname && fname.length){res.status(400).json('Registration requires "customer_first_name"');}
    if(!lname && lname.length){res.status(400).json('Registration requires "customer_last_name"');}
    if(!login && login.length){res.status(400).json('Registration requires "customer_login"');}
    if(!pwrd && pwrd.length){res.status(400).json('Registration requires "customer_password"');}
    // res.status(200).json('??')

    // let userExists = await Customers.findOne(req.body)
    // create the customer record in Customer model
    let updatedUserData = await Customers.create(req.body)
    //- TODO: check to see if the user is in the db first

    //  pass the whole req.body object into the query, because it matches the schema
    //  this becomes `INSERT INTO Customers (fname, lname, phone) VALUES ('john', 'wick', null)

    //  if db interaction threw an error, all steps below are skipped
    req.session.username = updatedUserData.customer_login
    req.session.customer_id = updatedUserData.customer_id
    req.session.logged_in = true
  //12/3/22 alexis added layout:false below (yay this is correct!)
    res.render('homepage', {layout: false, username: updatedUserData.customer_login})
    /*
    100 =>
    2xx => Success
    3xx => ----- rare - server side
    4xx => user input errror
    5xx => server error
    */
  
    // always return something, at least a status
    // res.status(200).json('ayo')
    // let res = {}
    // .json('')

    // send is used when the object is already valid json or json-like object
    // res.status(200).send({
    //   userData: someData
    // })
  } catch (err) {
    res.render('errorpage', { error: err?.message ?? err.toString() })
  }
});

//Post route for login
// POST localhost:3001/api/users/login
// we are rendering a handlebars page here which is unusual for an API route
router.post("/login", async (req, res) => {
  try {
    // throw new Error('No user found...')
    const log = logger('/login')
    log('Logging user in:', req.body)

    // find the user by the username (customer_login)
    let userData = await Customers.findOne({
      where: {
        //checking login and password no hashing or storage of password. Just doing string comparison. Basic login.
        customer_login: req.body.customer_login,
        customer_password: req.body.customer_password
       }
    })

    // if no user was found, return an error
    if(!userData){
      // res.status(400).json('No user found...');
      // throw to the catch block below to have a centralized place to handle errors
      // throw new Error('No user found...')
      //render = go to main.handlebars
      //once render, http request is closed, but code continues to execute for everything below
      res.render('login',{
        error: "Invalid username and/or password"
      })
      return;  //prevents code below from executing
    }

    // update the session data for this user
    //now we have the customer id and get orders view data based on
    //customer id, which is persistent due to being a session var
    req.session.username = userData.customer_login
    req.session.customer_id = userData.customer_id
    req.session.logged_in = true
    // res.status(200).json('Logged in!')
    //res.render('homepage')
    //log this user in
    res.render('homepage',{
        layout: false,
        username: userData.customer_login,
        customer_id: userData.customer_id,

    });  //handlebars page name only without / or .handlebars extension

  } catch (err) {
    // sometimes the err is an object containing the message property
    // otherwise just return the whole err 
     //don't return error here go to error page
    //res.status(200).json(err.message ?? err);
    res.render('login',{
      error: err.message ?? err.toString()  //want to pass as string so use toString
    })
  }
});

//Post route for logging out
// this route is triggered from a link element, which always send GET requests
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
      res.status(204).end();
    });
    res.render('logout')

});

module.exports = router;  //alexis 11/28/22