import category from "../models/category.js";

const findAllCategories = async (request, response, next) => {
  request.categoriesArray = await category.find({});
  next();
};

const createCategory = async (request, response, next) => {
  console.log("POST /categories");
  try {
    console.log(request.body);
    request.category = await category.create(request.body);
    next();
  } catch (error) {
    response.status(400).send("Error creating category");
  }
};

const deleteCategory = async (request, response, next) => {
  try {
    request.category = await category.findByIdAndDelete(request.params.id);
    next();
  } catch (error) {
    response.status(400).send("Error deleting category");
  }
  next();
};

const findCategoryById = async (request, response, next) => {
  try {
    request.category = await category.findById(request.params.id);
    next();
  } catch (error) {
    response.status(404).send({ message: "Category not found" });
  }
};

const updateCategory = async (request, response, next) => {
  try {
    request.category = await category.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    next();
  } catch (error) {
    response.status(400).send({ message: "Error update category" });
  }
};

const checkIsCategoryExists = async (request, response, next) => {
  const isInArray = request.categoriesArray.find((category) => {
    return request.body.name === category.name;
  });
  if (isInArray) {
    response
      .status(400)
      .send({ message: "A category with this name already exists" });
  } else {
    next();
  }
};

export {
  findAllCategories,
  createCategory,
  findCategoryById,
  deleteCategory,
  updateCategory,
  checkIsCategoryExists,
};
