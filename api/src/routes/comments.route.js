const router = require("express").Router();
const Comment = require("../models/Comment.model");
const Anime = require("../models/Anime.model");
const verify = require("../util/verifyToken");

//CREATE

router.post("/:animeID", verify, async (req, res) => {
  // if (req.user.id === req.params.id || req.user.isAdmin) {
  const newComment = new Comment({
    text: req.body.text,
    user_id: req.user.id,
    anime_id: req.params.animeID,
    rating: req.body.rating,
  });
  try {
    const savedComment = await newComment.save();
    await Anime.findByIdAndUpdate(req.params.animeID, {
      $push: { comments: savedComment },
    });
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
  // } else {
  //   if (req.user.id != req.params.id) {
  //     res.status(403).json("You are not the owner of the comment!");
  //   }
  //   if (!req.user.isAdmin) {
  //     res.status(403).json("You are not the admin!");
  //   } else {
  //     res.status(403).json("You are not allowed to add a comment!");
  //   }
  // }
});

//UPDATE

router.put("/:idUser-:id", verify, async (req, res) => {
  if (req.user.id === req.params.idUser || req.user.isAdmin) {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedComment);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can update only your comments!");
  }
});

//DELETE

router.delete("/:idUser-:id", verify, async (req, res) => {
  if (req.user.id === req.params.idUser || req.user.isAdmin) {
    try {
      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("The comment has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

router.get("/:id", verify, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL

router.get("/", verify, async (req, res) => {
  try {
    const comment = await Comment.find();
    res.status(200).json(comment.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
