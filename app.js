const express  = require("express");
const path = require("path");
const addRouter = require("./routes/addMovie");
const viewRouter = require("./routes/viewRoutes");
const app = express();

//1) MIDDLEWARE
app.use(express.json()) //This MiddleWare used for reading JSON data came through POST request

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views")); // Setting Templates

app.use(express.static(path.join(__dirname,"public"))); //Reading Static Files Like(HTML,CSS,JS)

//Just Testing MiddleWare
// app.use((req,res,next)=>{
//     console.log("Hi from Middleware");
//     next();
// })

// 3) ROUTES
app.use("/", viewRouter);
app.use("/api/v1/moviezwala",addRouter);
// console.log(app)
module.exports = app;
