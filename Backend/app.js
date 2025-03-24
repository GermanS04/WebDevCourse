const { API_ROUTES, ROUTE_FILES } = require("./constants");
const express = require("express");
const app = express();
const PORT = 2025;
const cors = require("cors");
const USER_ROUTES = require(ROUTE_FILES.USERS);

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:4200"],
    methods: ["GET", "POST", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res, next) => {
  res.send("Welcome to the API");
  next();
});

app.use(API_ROUTES.USERS.BASE, USER_ROUTES);

app.listen(PORT, () => {
  console.log(`Running API on localhost ${PORT}`);
});
