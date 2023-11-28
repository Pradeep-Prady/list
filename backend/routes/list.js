const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  createList,
  getLists,
  getList,
  updateList,
  deleteList,
} = require("../controllers/listController");

const router = express.Router();

router.post("/create-list", createList);
router.get("/get-lists", getLists);
router.get("/get-list/:id", getList);
router.put("/update-list", updateList);
router.delete("/delete-list/:deleteId", deleteList);

module.exports = router;
