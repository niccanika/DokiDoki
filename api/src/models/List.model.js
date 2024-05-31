const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    type: { type: String },
    genre: { type: mongoose.SchemaTypes.ObjectId, ref: "Genre" },
    content: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Anime" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
