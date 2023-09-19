const express = require("express");
const route = express.Router();
const controller = require("../../controller/admin/product_controller");


route.get("/", controller.index);
route.patch("/change-status/:status/:id", controller.changeStatus);
route.patch("/change-multi", controller.changeMulti);
route.post("/deleted/:id", controller.deleteItem);
route.get("/create", controller.create);
route.post("/create", controller.createPost);

module.exports = route;
