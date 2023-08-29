const express = require("express");
const route = express.Router();

// route.get("/", (req, res) =>{
//     res.render("client/pages/products/index.pug");
// })

const controller = require("../../controller/client/products_controller");
route.get("/", controller.index);
module.exports = route;