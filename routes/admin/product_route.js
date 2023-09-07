const express = require("express");
const route = express.Router();
const controller = require("../../controller/admin/product_controller");

route.get("/", controller.index);
module.exports = route;
