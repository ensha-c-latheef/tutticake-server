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

// ORDER DETAILS - cart
router.get("/cart", isAuthenticated, (req, res, next) => {
  const person = req.payload._id;
  console.log("person id: " + person);

  Order.findOne({ customer: person, isPaid: false })
    .populate("cakes")
    .then((foundOrder) => {
      res.json(foundOrder);
    })
    .catch((err) => res.json(err));
});

router.put("/:orderId/close", isAuthenticated, (req, res, next) => {
  const { orderId } = req.params;
  // const person = req.payload._id;
  console.log("order id: " + orderId);
  Order.findByIdAndUpdate(orderId, { isPaid: true })
    .then((response) => {
      //res.json(response);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
