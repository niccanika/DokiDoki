const router = require("express").Router();
const Anime = require("../models/Anime.model");
const verify = require("../util/verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    console.log(req.body);
    const newAnime = new Anime(req.body);
    // console.log(newAnime);
    try {
      const savedAnime = await newAnime.save();
      // console.log(savedAnime);
      res.status(201).json(savedAnime);
    } catch (err) {
      // console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to add anime!");
  }
});

//UPDATE

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedAnime = await Anime.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedAnime);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed to modify this content!");
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Anime.findByIdAndDelete(req.params.id);
      res.status(200).json("The anime has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//GET

router.get("/find/:id", verify, async (req, res) => {
  try {
    const anime = await Anime.findById(req.params.id).populate([
      {
        path: "comments",
        populate: "user_id",
      },
      { path: "genre" },
    ]);
    res.status(200).json(anime);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET RANDOM ANIME

router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  let anime;
  try {
    if (type === "series") {
      anime = await Anime.aggregate([
        { $match: { isMovie: false } },
        { $sample: { size: 1 } },
      ]);
    } else {
      anime = await Anime.aggregate([
        { $match: { isMovie: true } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(anime);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL

router.get("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const anime = await Anime.find();
      res.status(200).json(anime.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

module.exports = router;
