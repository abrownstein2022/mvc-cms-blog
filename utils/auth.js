const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  //needed to disable layout when redirecting to login page
  if (!req.session.logged_in || !req.session.customer_id) {
    res.render('login', {layout: false});
  } else {
    next();
  }
};

module.exports = withAuth;
//change above to
//export default withAuth;

