const router = require("express").Router();
const mongoose = require("mongoose");
const Order = require("../models/Order.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//  ADD A CAKE INTO THE ORDER
router.post("/addcake/:cakeId", isAuthenticated, (req, res, next) => {
  const { cakeId } = req.params;
  console.log("cake id:" + cakeId);
  const person = req.payload._id;
  console.log(person);

  Order.findOne({ customer: person, isPaid: false })
    .then((foundOrder) => {
      console.log(foundOrder);
      const orderId = foundOrder._id;
      console.log(orderId);
      Order.findByIdAndUpdate(orderId, {
        $push: { cakes: cakeId },
      })
        .then((response) => {
          //res.json(response);
        })
        .catch((err) => res.json(err));
    })
    .catch(next);
});

// CART DETAILS
router.get("/cart", isAuthenticated, (req, res, next) => {
  const person = req.payload._id;
  // console.log("person id: " + person);

  Order.findOne({ customer: person, isPaid: false })
    .populate("cakes")
    .then((foundOrder) => {
      res.json(foundOrder);
    })
    .catch((err) => res.json(err));
});

// Close Current Order and open a new one
router.put("/:orderId/close", isAuthenticated, (req, res, next) => {
  const { orderId } = req.params;
  const { totalCost } = req.body;
  console.log("totalcost:", totalCost);

  // console.log("order id: " + orderId);
  Order.findByIdAndUpdate(orderId, { isPaid: true, totalPrice: totalCost })
    .then((response) => {
      const customer = response.customer;
      // console.log(customer);
      Order.create({ customer: customer });
      res.json(response);
    })
    .catch((err) => res.json(err));
});

// GET PREVIOUS ORDER LIST
router.get("/list", isAuthenticated, (req, res, next) => {
  const person = req.payload._id;
  // console.log("person id: " + person);

  Order.find({ customer: person, isPaid: true })
    .populate("cakes")
    .then((foundOrders) => {
      // console.log(foundOrders);
      res.json(foundOrders);
    })
    .catch((err) => res.json(err));
});

// ORDER DETAILS
router.get("/:orderId", (req, res, next) => {
  // const person = req.payload._id;
  // console.log("person id: " + person);
  const { orderId } = req.params;
  console.log(orderId);
  Order.findOne({ _id: orderId })
    .populate("cakes")
    .then((foundOrder) => {
      res.json(foundOrder);
      console.log(foundOrder);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
