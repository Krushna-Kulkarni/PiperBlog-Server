const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const dbConnect = require("./config/db/dbConnect");
const userRoutes = require("./route/users/usersRoute");
const { errorHandler, notFound } = require("./middlewares/error/errorHandler");
const postRoute = require("./route/posts/postRoute");
const commentRoute = require("./route/comments/commentRoute");
const emailMsgRoute = require("./route/emailMsg/emailMsgRoute");
const categoryRoute = require("./route/category/categoryRoute");

const app = express();
//DB
dbConnect();

//to check heroku deployment
app.get("/", (req, res) => { res.json({msg: "Hello!"}) } )


//Middleware
app.use(express.json());

//cors
app.use(cors());

//Users route
app.use("/api/users", userRoutes);

//post route 
app.use("/api/posts", postRoute)

//comment route 
app.use("/api/comments", commentRoute)

//email message route
app.use("/api/email",emailMsgRoute);

//create category route
app.use("/api/category", categoryRoute)

//err handler
app.use(notFound);
app.use(errorHandler);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running ${PORT}`));


