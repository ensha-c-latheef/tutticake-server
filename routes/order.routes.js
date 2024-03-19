const express = require("express");
const router = express.Router();

// .post(`${API_URL}/order/addcake/${cakeId}`)

//  ADD A CAKE INTO THE ORDER
router.post("/", isAuthenticated, (req, res, next) => {
  const { name, description, imageUrl, price, preperationTime } = req.body;

  const vendor = req.payload._id;

  Cake.create({ name, description, imageUrl, price, preperationTime, vendor })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});
