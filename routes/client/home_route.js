const express = require("express");
const route = express.Router();

// route.get("/", (req, res) =>{
//     res.render("client/pages/home/index.pug");
// })

const controller = require("../../controller/client/home_controller");
route.get("/", controller.index);
module.exports = route;