const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.status(401).send({ message: "Authorization required" });
    }

    const token = authorization.replace("Bearer ", "");
    try {
        req.user = jwt.verify(token, "never-gonna-give-you-up");
    } catch (error) {
        return res.status(401).send({ message: "Authorization required" });
    }
    next();
};

const checkCookiesJWT = (req, res, next) => {
    if (!req.cookies.jwt) {
        return res.redirect("/");
    }
    req.headers.authorization = `Bearer ${req.cookies.jwt}`;
    next();
};

module.exports = { checkAuth, checkCookiesJWT };
