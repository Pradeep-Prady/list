const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const errorMiddleware = require("./middlewares/error");
const cors = require("cors");

dotenv.config({ path: path.join(__dirname, "config/config.env") });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const list = require("./routes/list");

app.use("/api/v1/", list);

app.use(errorMiddleware);

module.exports = app;
