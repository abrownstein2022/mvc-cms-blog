const router = require('express').Router();
const { Customers, Orders, OrderItems, Items } = require('../models');
const withAuth = require('../utils/auth');
const log = require('../utils/logger')
//! need next 2 lines for raw sequelize query to get view orders page to work (3 table joins)
const sequelize = require('sequelize');
const db = require('../config/connection');
//! additional library to format order date in handlebars display in view-orders
const dateFns = require('date-fns')

//! handlebars does not render layouts directly - can render a view inside of a layout
//! never call res.render('main') or res.render('layout')
//! homeRoutes.js should only be used for handlebar view routes

//? How could this be accomplished
//> maybe this
//> maybe this


//+ Next Steps
//- this
//- that
//- this

//~ NEVER DO THIS

//_ sdafasdfasdf

// = Plain white

// empty routes are treated as an empty path (/) and typically used to show the homepage
// localhost:3001
// same as localhost:3001/
// localhost:3001/profile
// most browser view pages will not be protected by middleware
// they will be visible to anyone
// no "withAuth" needed
//&                                                                                                                   
//$ root route of server '/' should render welcome page that only shows login and register links
router.get('/', async (req, res) => {
  console.log("path: '/' => rendering 'welcome.handlebars'")

  res.render('welcome', { 
    logged_in: req.session.logged_in 
  });

});

// alexis added 12/3/22 to be able to route back to homepage (landing page after login) from other pages
router.get('/homepage', withAuth, async (req, res) => {
  console.log("path: '/' => rendering 'homepage.handlebars'")

  res.render('homepage', { 
    layout: false,
    logged_in: req.session.logged_in 
  });

});
//end alexis 12/3/22

//&                                                                                                                   
//&this open handlebars (html) page for the menu for ordering
// //                                                                                                                   
// router.get('/menu', async (req, res) =>{
//   res.render('menu')
// })

// const query = "select o.order_id as 'Order #', DATE_FORMAT(order_date, '%M %d %Y') as 'Order Dt', i.item_name as 'Food Name'," +
// "oi.quantity as 'Qty Ordered', CONCAT('$',FORMAT(i.item_cost,2,'en-us')) as 'Item Cost', CONCAT('$',FORMAT((i.item_cost * oi.quantity),2,'en-us')) as 'Total Line Cost'" +
// "from orders o " + 
// "inner join " +
// "orderitems oi " +
// "inner JOIN items i ON oi.item_id = i.item_id " +
// "on o.order_id = oi.order_id " +
// "where customer_id = 1 " +
// "order by o.order_id, oi.item_id;"

  // If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in) {
  //   res.redirect('/profile');
  //   return;
  // }
  //! on the register page, pass the value of "show_register" to the login page, to switch between
  //! register and login pages
  // res.render('login', { show_register: false }); // show login section

//&                                                                                                                   
//$ this route requires the withAuth middleware because the query requires customer_id - which requires login
router.get('/view-orders', withAuth, async (req, res) => {

  /*
  let order_array = await Orders.findAll({
    // only grab orders that belong tho the current user
    where: { customer_id: req.session.customer_id },
    // include: [
      // OrderItems,
      //! EagerLoadingError [SequelizeEagerLoadingError]: items is not associated to orders!
      //! Items,
    // ],
    include: [{all: true}],
    order: [
      ['order_id', 'ASC'],
      //! ['item_id', 'ASC']
    ]
  })
  // map takes an array and returns a new array with modifications applied
  order_array = order_array.map(item => item.dataValues)
alb
const orderQuery = "select o.customer_id, o.order_id, o.order_date, " +
"i.item_name, oi.quantity, i.item_cost " +
"from orders o  " +
"JOIN orderitems oi " +
"on o.order_id = oi.order_id " +
"JOIN items i ON oi.item_id = i.item_id " +
"order by o.customer_id, o.order_id, oi.item_id"

// const { results } = require('sequelize');
// const orderData = await sequelize.query(orderQuery, { type: results.SELECT });

const { QueryTypes } = require('sequelize');
const customers = await sequelize.query("SELECT * FROM `customers`", { type: QueryTypes.SELECT });

console.log(JSON.stringify(customers, null, 2));
end alb

Prepared? statements provide an easy way to pass multiple params to a query thru an array - replacing '?' at the same index in the array
                                                          'a'               'b'
mysqliPrepared('SELECT * FROM students WHERE student_id = ? AND student_id = ?', ['a', 'b'])
sequelize.query(
    'SELECT * FROM students WHERE student_id = ?',
    {
!     replacements: ['REPLACE_STUDENT_ID'],
      type: sequelize.QueryTypes.SELECT
    }
)
*/

try{

  let order_array = await db.query(
    'select o.customer_id, o.order_id, o.order_date, ' + 
    'i.item_name, oi.quantity, i.item_cost ' + 
    'from orders o  ' + 
    'JOIN orderitems oi ' + 
    'on o.order_id = oi.order_id  ' + 
    'JOIN items i ON oi.item_id = i.item_id    ' + 
    'WHERE o.customer_id = :id ' +
    'order by o.customer_id, o.order_id, oi.item_id ',
    {
      replacements: { id: req.session.customer_id },
      type: sequelize.QueryTypes.SELECT
    }
  )
  // won't execute until above is finished, and if no errors thrown
  order_array = order_array.map(item => ({
    ...item,
    line_cost: item.quantity * item.item_cost,
    formatted_date: dateFns.format(item.order_date, 'MM/dd/yyyy')
  }))
  console.log(order_array)
  res.render('vieworder', {order_array});
}catch(err){
  res.render('errorpage', {error: err?.message ?? err.toString()})
}
//- not needed, we are waiting for result above
//  .then(order_array => {
//     console.log(order_array);
// })

//- this is replaced with a try/catch block
// .catch((error) => {
//     console.error('Failed to read data : ', error);
// });


  // res.render('vieworder', { order_array });
  // res.render('vieworder', { order_array: fakeArray });
});

//&                                                                                                                   
//$ Use withAuth middleware to prevent access to route
router.get('/place-order', 
withAuth,                  //~ COMMENTED OUT withAuth FOR TESTING but put back 
async (req, res) => {
  try {
    // TODO:
    //* Find the logged in users data, and their list of orders
    //* render orders page with array of order data


    // const userData = await Customers.findByPk(req.session.user_id, {
    //   attributes: { exclude: ['password'] },
    //   // include: [{ model: Project }],
    // });

    // const user = userData.get({ plain: true });

    res.render('placeorder', {
      layout: false, // layout: 'special-layout' => special-layout.handlebars
      customer_id: req.session.customer_id
      // ...user,
      //! pass array of orders here
      // logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



//&                                                                                                                   
//$ register should be public to all users - no withAuth middleware
router.get('/register', (req, res) => {
  console.log("path: '/' => rendering 'register.handlebars'")

  // // If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in) {
  //   res.redirect('/homepage');
  //   return;
  // }
  //! on the register page, pass the value of "show_register" to the login page, to switch between
  //! register and login pages
  //alexis 12/3/22 added layout:false below
  res.render('register', {show_register: true }); // show registration section
  //res.render('register', {layout: false, show_register: true }); // show registration section
  // res.render('login', { show_register: false }); // show login section
});


//&                                                                                                                   
//$ route for view orders for logged in customer
// router.get("/view-order", async (req, res) => {
//   try {
//     // const log = logger('/view-order')
//     //do get request to api/orders to return array of orders
//     //alexis will write api abstraction (function) for people in your API
//     //to use your API.  Abstraction functions make it so they only have to call
//     //one function.  They are shared functions. 
//     console.log('Registering user:', req.body)
    
//     //use customerid value stored in session var called "req.session.customer_id"

//     // let userExists = await Customers.findOne(req.body)
//     // create the customer record in Customer model
//     let result = await fetch('/api/orders/view-orders')
//     //- check to see if the user is in the db first

//     //  pass the whole req.body object into the query, because it matches the schema
//     //  this becomes `INSERT INTO Customers (fname, lname, phone) VALUES ('john', 'wick', null)

//     //  if db interaction threw an error, all steps below are skipped
//     // res.status(200).json(updatedUserData)
//     /*
//     100 =>
//     2xx => Success
//     3xx => ----- rare - server side
//     4xx => user input errror
//     5xx => server error
//     */






//     // always return something, at least a status
//     // res.status(200).json('ayo')
//     // let res = {}
//     // .json('')

//     // send is used when the object is already valid json or json-like object
//     // res.status(200).send({
//     //   userData: someData
//     // })
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });



//&                                                                                                                   
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  console.log("path: '/login' => rendering 'login.handlebars'")

  if (req.session.logged_in) {
    console.log("path: '/login' => already logged in => rendering 'homepage.handlebars'")

    res.render('homepage', { layout: false })
    return;
  }
  //! on the register page, pass the value of "show_register" to the login page, to switch between
  //! register and login pages
  res.render('login'); // show registration section
  // res.render('login', { show_register: false }); // show login section
});

// logout just sends a GET request to the API route => /api/users/logout

module.exports = router;
