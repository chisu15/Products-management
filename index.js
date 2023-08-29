const express = require("express");
const app = express();
const port = 3000;

app.set("views", "./views")
app.set("view engine", "pug");
//  ROUTER
const route = require ("./routes/client/index_route");
route(app)

app.listen(port, ()=>
{
    console.log("OK!");
})

