const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    anime_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Anime",
      required: true,
    },
    rating: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
