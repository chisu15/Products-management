const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT;

const database = require("./config/database");
const systemConfig = require("./config/system");

app.set("views", "./views")
app.set("view engine", "pug");

app.use(express.static("public"));
//  ROUTER
const route = require ("./routes/client/index_route");
const routeAdmin = require("./routes/admin/index_route");

routeAdmin(app);
route(app)
database.connect();

app.locals.prefixAdmin = systemConfig.prefixAdmin;

app.listen(port, ()=>
{
    console.log("OK!");
})

