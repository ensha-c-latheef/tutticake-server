const router = require("express").Router();
const mongoose = require("mongoose");
const Cake = require("../models/Cake.model");
// const Task = require("../models/Task.model");

//  CREATE A NEW CAKE
router.post("/cakes/create", (req, res, next) => {
  const { name, description, imageUrl, price } = req.body;

  Cake.create({ name, description, imageUrl, price })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// LIST CAKES
router.get("/cakes", (req, res, next) => {
  Cake.find()
    // .populate("tasks")
    .then((allCakes) => res.json(allCakes))
    .catch((err) => res.json(err));
});

// SHOW A CAKE
router.get("/cakes/:cakeId", (req, res, next) => {
  const { cakeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cakeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cake.findById(cakeId)
    // .populate("tasks")
    .then((cake) => res.status(200).json(cake))
    .catch((error) => res.json(error));
});

// EDIT A CAKE
router.put("/cakes/edit/:cakeId", (req, res, next) => {
  const { cakeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cakeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cake.findByIdAndUpdate(cakeId, req.body, { new: true })
    .then((updatedCake) => res.json(updatedCake))
    .catch((error) => res.json(error));
});
// DELEATE A CAKE
router.delete("/cakes/:cakeId", (req, res, next) => {
  const { cakeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cakeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cake.findByIdAndDelete(cakeId)
    .then(() =>
      res.json({
        message: `Cake with ${cakeId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
