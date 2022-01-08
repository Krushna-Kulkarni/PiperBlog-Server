const express = require("express");
const dotenv = require("dotenv");
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
app.use("/", (req, res) => { res.json({msg: "Hello from Express!"}) } )


//Middleware
app.use(express.json());

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server is running ${PORT}`));

//
