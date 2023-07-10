const express = require("express");
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const passport = require("passport");
const { Server } = require("socket.io");
const dataBase = require("./config/objectConfig.js");
const router = require("./router/index.js");
const { initPassport } = require("./passportConfig/passportConfig.js");

dataBase.connectDB();
const app = express();
const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});


initPassport()
passport.use(passport.initialize());
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(cookieParser("P@l@vra"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static(__dirname + "/public"));
app.use(router);
