//console.clear();
const express = require("express");
const DBconnect = require("./Configuration/DbConnect");
const cors = require("cors");
//importing passport
const passport = require("passport");
const app = express();

require("dotenv").config();
//connect database
const UserRouter=require("./routes/UserRouter");
const QuizRouter=require("./routes/QuizRouter")
DBconnect();
app.use(cors());
app.use(express.json());


//routes
app.use("/user", UserRouter);

app.use("/quiz", QuizRouter);

//running passport
app.use(passport.initialize());

//lisnen Port
const port = process.env.PORT;
app.listen(port, (err) => {
  err ? console.log(err) : console.log(`server is running in port ${port}`);
});
