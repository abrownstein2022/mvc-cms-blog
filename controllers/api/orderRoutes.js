/** 
 * These routes are all nested inside of the route:
 * 
 * /api/orders/... */
const router = require("express").Router();


//! express handles routes / server side data persistence (session/cookies)

const { Orders, OrderItems, Items } = require("../../models");
const withAuth = require("../../utils/auth");
const logger = require("../../utils/logger.js");

//&                                                                                                             
//$ Get list of current customer's orders
router.get("/view-orders", async (req, res) => {
  let orderData = await Orders.find({
    where: {
      customer_id: req.session.customer_id,
    },
  });

  res.render("orderspage", {
    orders: orderData,
  });
});

//&                                                                                                             
//$ Place order
router.post("/place-order", async (req, res) => {
  try {
    // get the current customer_id from the session object
    let { customer_id } = req.session
    if(!customer_id){
      console.log('There was no customer_id, please login')
      res.redirect(200, '/login')
      return;
    }
    let { items_ordered } = req.body
    console.log('req body:', req.body)
    // res.status(200).json(items_ordered)
    // return;

    //+ Get the order_id from the newly created orders record. Most sequelize methods return the entry after modification
    let newOrderObject = await Orders.create({customer_id})

    Object.entries(items_ordered).forEach( async ([item_id, quantity]) => {

      let orderItems = await OrderItems.create({
        order_id: newOrderObject.order_id,
        item_id,
        quantity
      })

    })





    // // get the id of the order from handlebars name value
    // let thisOrderId = req.body.customerOrder;

    // // grab the array of orders for this user
    // let existingOrderIds = await Customers.findOne({
    //   where: {
    //     customer_id
    //   },
    // });

    // // add the new id to the array
    // let newOrders = [...existingOrderIds, thisOrderId];

    // // update the customers table
    // await Customers.update({
    //   where: {
    //     customer_id
    //   },
    //   orders: newOrders,
    // });
    // res.redirect(200, '/view-orders')
    res.status(200).json('success')
    // res.status(200).json("The order was placed");
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
