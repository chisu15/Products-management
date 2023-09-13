const express = require("express");
const route = express.Router();
const controller = require("../../controller/admin/product_controller");

route.get("/", controller.index);
route.patch("/change-status/:status/:id", controller.changeStatus);
module.exports = route;
