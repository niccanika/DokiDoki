const mongoose = require("mongoose");

const AnimeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    year: { type: String },
    numOfSeasons: { type: Number, default: 1 },
    numOfEpisodes: { type: Number, default: 1 },
    rating: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    isMovie: { type: Boolean, default: false },
    comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Comment" }],
    genre: { type: mongoose.SchemaTypes.ObjectId, ref: "Genre" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Anime", AnimeSchema);
