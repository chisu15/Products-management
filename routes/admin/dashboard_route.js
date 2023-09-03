const express = require("express");
const route = express.Router();
const adminController = require("../../controller/admin/dashboard_controller")

route.get("/", adminController.dashboard);

module.exports = route;