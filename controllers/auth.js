const users = require("../models/user");
const jwt = require("jsonwebtoken");
const path = require("path");

const login = (req, res) => {
    const { email, password } = req.body;
    users
        .findUserByCredentials(email, password)
        .then((user) => {
            const token = jwt.sign(
                { _id: user._id },
                "never-gonna-give-you-up",
                {
                    expiresIn: 3600,
                }
            );
            return { user, token };
        })
        .then(({ user, token }) => {
            res.status(200).send({
                _id: user._id,
                username: user.username,
                email: user.email,
                jwt: token,
            });
        })
        .catch((error) => {
            res.status(401).send({ message: error.message });
        });
};

const sendIndex = (req, res) => {
    if (req.cookies.jwt) {
        try {
            jwt.verify(req.cookies.jwt, "never-gonna-give-you-up");
            return res.redirect("/admin/dashboard");
        } catch (err) {
            res.sendFile(path.join(__dirname, "../public/index.html"));
        }
    }
    res.sendFile(path.join(__dirname, "../public/index.html"));
};

const sendDashboard = (req, res) => {
    res.sendFile(path.join(__dirname, "../public/admin/dashboard.html"));
};

module.exports = { login, sendIndex, sendDashboard };
