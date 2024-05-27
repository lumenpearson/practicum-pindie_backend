const sendAllUsers = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.usersArray));
};

const sendUserCreated = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.user));
};

const sendUserById = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.user));
};

const sendUserUpdated = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify({ message: "User updated" }));
};

const sendUserDeleted = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.user));
};

const sendMe = (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.user));
};

module.exports = {
    sendAllUsers,
    sendUserCreated,
    sendUserById,
    sendUserUpdated,
    sendUserDeleted,
    sendMe,
};
