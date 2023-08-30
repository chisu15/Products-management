const homeRoute = require("./home_route.js");
const productRoute = require("./product_route.js");

module.exports = (app) =>
{
    app.use("/", homeRoute);
    app.use("/products", productRoute);
}