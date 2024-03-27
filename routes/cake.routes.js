const router = require("express").Router();
const mongoose = require("mongoose");
const Cake = require("../models/Cake.model");
const Review = require("../models/Review.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");



//  CREATE A NEW CAKE
router.post("/", isAuthenticated, (req, res, next) => {
  const { name, description, imageUrl, price, preperationTime } = req.body;

  const vendor = req.payload._id;

  Cake.create({ name, description, imageUrl, price, preperationTime, vendor })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// LIST CAKES
router.get("/", (req, res, next) => {
  Cake.find()
    // .populate("tasks")
    .then((allCakes) => res.json(allCakes))
    .catch((err) => res.json(err));
});

// SHOW A CAKE
router.get("/:cakeId", (req, res, next) => {
  const { cakeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cakeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cake.findById(cakeId)
    .populate("vendor")
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
      options: { sort: {'createdAt': 'desc'} },
    })
    .then((cake) => res.status(200).json(cake))
    .catch((error) => res.json(error));
});

// EDIT A CAKE
router.put("/:cakeId", isAuthenticated, (req, res, next) => {
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
router.delete("/:cakeId", isAuthenticated, (req, res, next) => {
  const { cakeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cakeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Cake.findByIdAndDelete(cakeId)
    .then(() => {
      Review.deleteMany({ cake: cakeId })
        .then(() => {
          res.json({
            message: `Cake with ${cakeId} is removed successfully.`,
          })
        })
        .catch((error) => res.json(error));
    })
    .catch((error) => res.json(error));
});

 /* POST - add comment */
router.post("/:id/comment", isAuthenticated, (req, res, next) => {
  let author = req.payload._id;
  let cake = req.params.id;
  let rating = req.body.rating;
  let comment = req.body.comment;
  Review.create({
    author,
    cake,
    rating,
    comment,
  })
    .then((newReview) => {
      Cake.findByIdAndUpdate(cake, {
        $push: { reviews: newReview._id },
      }).then(() => {
        res.status(200).json(newReview);
      });
    })
    .catch((error) =>
      console.log(`Error while creating a new comment for cake: ${error}`)
    );
});


module.exports = router;
