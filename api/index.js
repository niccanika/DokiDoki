const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoute = require("./src/routes/auth.route");
const userRoute = require("./src/routes/users.route");
const animeRoute = require("./src/routes/anime.route");
const listRoute = require("./src/routes/lists.route");
const genreRoute = require("./src/routes/genre.route");
const commentRoute = require("./src/routes/comments.route");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");

const app = express();

if (!process.env.mongoURL) {
  console.log("MongoURL is not defined.");
  return -1;
}

app.use(express.json());

app.use(
  cors({
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Headers",
      "Origin",
      "Accept",
      "X-Requested-With",
      "Content-Type",
      "Access-Control-Request-Method",
      "Access-Control-Request-Headers",
      "token",
    ],
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://127.0.0.1:5173",
    ], // whatever ports you used in frontend
  })
);

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/anime", animeRoute);
app.use("/api/lists", listRoute);
app.use("/api/genres", genreRoute);
app.use("/api/comments", commentRoute);

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.json({
    success: 1,
    image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`,
  });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.mongoURL);
  } catch (error) {
    console.error(
      `${error.message}, can't connect to mongo: ${process.env.mongoURL}`
    );
    return -1;
  }

  app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};

start();
