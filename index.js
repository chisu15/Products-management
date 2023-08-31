const express = require("express");

require("dotenv").config();
const port = process.env.PORT;
const app = express();


app.set("views", "./views")
app.set("view engine", "pug");

app.use(express.static("public"));
//  ROUTER
const route = require ("./routes/client/index_route");
route(app)

app.listen(port, ()=>
{
    console.log("OK!");
})

