const catchAsyncError = require("../middlewares/catchAsyncError");
const List = require("../models/ListModel");
const ErrorHandler = require("../utils/errorHandler");

exports.createList = catchAsyncError(async (req, res, next) => {
  const { name, lists } = req.body;

  const list = await List.create({
    name,
    lists,
  });

  res.status(200).json({
    success: true,
    list,
  });
});

exports.getList = catchAsyncError(async (req, res, next) => {
  const id = req.params.id;

  const list = await List.findById(id);
  if (!list) {
    return next(new ErrorHandler("List not found"));
  }
  res.status(200).json({
    success: true,
    list,
  });
});

exports.getLists = catchAsyncError(async (req, res, next) => {
  const lists = await List.find();

  res.status(200).json({
    success: true,
    lists,
  });
});

exports.updateList = catchAsyncError(async (req, res, next) => {
  const { id, name, lists } = req.body;

  const updateObject = {
    name: name,
    lists: lists,
  };

  const list = await List.findByIdAndUpdate(id, updateObject, {
    new: true,
    runValidators: true,
  });

  if (!list) {
    return next(new ErrorHandler("List not found"));
  }

  res.status(200).json({
    success: true,
    list,
  });
});

exports.deleteList = catchAsyncError(async (req, res, next) => {
  const { deleteId } = req.params;
  console.log(deleteId);

  await List.findByIdAndDelete(deleteId);

  res.status(200).json({
    success: true,
  });
});
