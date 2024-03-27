const router = require("express").Router();
const mongoose = require("mongoose");
const Order = require("../models/Order.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

//  ADD A CAKE INTO THE ORDER
router.post("/addcake/:cakeId", isAuthenticated, (req, res, next) => {
  const { cakeId } = req.params;
  const person = req.payload._id;

  Order.findOne({ customer: person, isPaid: false })
    .then((foundOrder) => {
      const orderId = foundOrder._id;
      Order.findByIdAndUpdate(orderId, {
        $push: { cakes: cakeId },
      })
        .then((response) => {
          res.json(response);
        })
        .catch((err) => res.json(err));
    })
    .catch(next);
});

// CART DETAILS
router.get("/cart", isAuthenticated, (req, res, next) => {
  const person = req.payload._id;
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

  Order.findByIdAndUpdate(orderId, { isPaid: true, totalPrice: totalCost })
    .then((response) => {
      const customer = response.customer;
      Order.create({ customer: customer });
      res.json(response);
    })
    .catch((err) => res.json(err));
});

// GET PREVIOUS ORDER LIST
router.get("/list", isAuthenticated, (req, res, next) => {
  const person = req.payload._id;

  Order.find({ customer: person, isPaid: true })
    .populate("cakes")
    .then((foundOrders) => {
      res.json(foundOrders);
    })
    .catch((err) => res.json(err));
});

// ORDER DETAILS
router.get("/:orderId", isAuthenticated, (req, res, next) => {
  const { orderId } = req.params;
  Order.findOne({ _id: orderId })
    .populate("cakes")
    .then((foundOrder) => {
      res.json(foundOrder);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
