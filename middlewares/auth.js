import jwt from "jsonwebtoken";

const checkAuth = (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return response.status(401).send({ message: "authorisation required" });
  }
  const token = authorization.replace("Bearer ", "");
  try {
    request.user = jwt.verify(token, "i-am-so-tired");
  } catch (err) {
    return response.status(401).send({ message: "authorisation required" });
  }
  next();
};

const checkCookiesJWT = (request, response, next) => {
  if (!request.cookies.jwt) {
    return response.redirect("/");
  }
  request.headers.authorization = `Bearer ${request.cookies.jwt}`;
  next();
};

export { checkAuth, checkCookiesJWT };
