const express = require("express");
const route = express.Router();
const multer = require("multer");
const controller = require("../../controller/admin/product_controller");
const storageMulter = require("../../helpers/storageMulter");
const upload = multer({ storage: storageMulter() });

route.get("/", controller.index);
route.patch("/change-status/:status/:id", controller.changeStatus);
route.patch("/change-multi", controller.changeMulti);
route.post("/deleted/:id", controller.deleteItem);
route.get("/create", controller.create);
route.post("/create", upload.single("thumbnail"), controller.createPost);

module.exports = route;
