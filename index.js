const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("express-flash");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const database = require("./config/database");
const systemConfig = require("./config/system");

app.use(methodOverride("_method"));
app.set("views", "./views")
app.set("view engine", "pug");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

//  FLASH
app.use(cookieParser("JHGJKLKLGFLJK"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
//  END FLASH
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

