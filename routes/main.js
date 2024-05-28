import express from "express";
import { promises as fs } from "fs";

const mainRoute = express.Router();

mainRoute.get("/", (request, response) => {
  fs.readFile("./public/index.html", "utf-8").then((data) => {
    response.header("Content-Type", "text/html").send(data);
  });
});

export default mainRoute;
