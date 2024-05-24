const categories = require("../models/category");
const {
  ERR_CAT_CREATE,
  ERR_CAT_UPDATE,
  ERR_CAT_DELETE,
  ERR_CAT_NOT_FOUND,
  ERR_CAT_NAME_REQUIRED,
  ERR_CAT_EXISTS,
} = require("@/config");

const createCategory = async (req, res, next) => {
  try {
    req.category = await categories.create(req.body);
    next();
  } catch {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: ERR_CAT_CREATE }));
  }
};

const findAllCategories = async (req, res, next) => {
  req.categoriesArray = await categories.find({});
  next();
};

const findCategoryById = async (req, res, next) => {
  try {
    req.category = await categories.findById(req.params.id);
    next();
  } catch {
    res.setHeader("Content-Type", "application/json");
    res.status(404).send(JSON.stringify({ message: ERR_CAT_NOT_FOUND }));
  }
};

const updateCategory = async (req, res, next) => {
  try {
    req.category = await categories.findByIdAndUpdate(req.params.id, req.body);
    next();
  } catch {
    res.status(400).send({ message: ERR_CAT_UPDATE });
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    req.category = await categories.findByIdAndDelete(req.params.id);
    next();
  } catch {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: ERR_CAT_DELETE }));
  }
};

const checkEmptyName = async (req, res, next) => {
  if (!req.body.name) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: ERR_CAT_NAME_REQUIRED }));
  } else {
    next();
  }
};

const checkIsCategoryExists = async (req, res, next) => {
  const isInArray = req.categoriesArray.find((category) => {
    return (
      req.body.name === category.name &&
      category._id.toString() !== req.params.id
    );
  });

  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(
      JSON.stringify({
        message: ERR_CAT_EXISTS,
      })
    );
  } else {
    next();
  }
};

module.exports = {
  createCategory,
  findAllCategories,
  findCategoryById,
  updateCategory,
  deleteCategory,
  checkEmptyName,
  checkIsCategoryExists,
};
