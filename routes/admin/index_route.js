const dashboardRoute = require("./dashboard_route");
const productRoute = require("./product_route");
const systemConfig = require("../../config/system.js");
module.exports = (app) =>{
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", dashboardRoute);
    app.use(PATH_ADMIN + "/products", productRoute);
}