const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = 5000;
const secretKey = "secretKey";

app.use(express.json());

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    name: "Aaaa",
    age: 22,
  };

  jwt.sign(user, secretKey, { expiresIn: "1h" }, (err, token) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        token: `Bearer ${token}`,
      });
    }
  });
});

app.post("/verify", verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      res.send({ message: "invalid token" });
    } else {
      res.json({
        message: "profile accessed",
        authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({
      message: "token is not valid",
    });
  }
}

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
