const sendAllCategories = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(request.categoriesArray));
};

const sendCategoryCreated = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(request.category));
};

const sendCategoryDeleted = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(request.category));
};

const sendCategoryById = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify(request.category));
};

const sendCategoryUpdated = (request, response) => {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify({ message: "Category Update" }));
};

export {
  sendAllCategories,
  sendCategoryCreated,
  sendCategoryDeleted,
  sendCategoryById,
  sendCategoryUpdated,
};
