const router = require("express").Router();
const userRoutes = require("./userRoutes.js");
const orderRoutes = require("./orderRoutes.js");

//original index.js (highest level) is further nested into 2 more routes here
//! host/api/users/...
router.use("/users", userRoutes);
//! host/api/orders/...
router.use("/orders", orderRoutes);
// localhost:3000/api/orders/whatever

module.exports = router;
