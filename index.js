const express = require("express");
const app = express();
const PORT = 3001;
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("./middlewares/cors.js");
const connectToDatabase = require("./database/connect.js");
const apiRouter = require("./routes/apiRouter.js");
const cookieParser = require("cookie-parser");
const pagesRouter = require("./routes/pages.js");

connectToDatabase();

app.use(
    cors,
    cookieParser(),
    bodyParser.json(),
    pagesRouter,
    apiRouter,
    express.static(path.join(__dirname, "public"))
);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
