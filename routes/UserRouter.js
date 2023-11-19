const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../modules/User");
const {
  registerRules,
  loginRules,
  validation,
} = require("../middlwere/validator");
const isAuth = require("../middlwere/passport");
// userRouter.get("/", (req, res) => {
//   res.send("hello world");
// });

//register
userRouter.post("/register", registerRules(), validation, async (req, res) => {
  const { name, lastName, email, password } = req.body;
  try {
    console.log(req.body);
    let newUser = new User({ name, lastName, email, password });
    //chec if the email exist
    const sershedEmail = await User.findOne({ email });
    console.log(sershedEmail);
    if (sershedEmail) {
      return res.send({ msg: "email already exist", newUserToken: "null" });
    }
    //hache password
    const saltRounds = 10;
    const genSalt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, genSalt);

    newUser.password = hashedPassword;
    //save user
    const newUserToken = await newUser.save();
    //generate a token
    const payload = {
      _id: newUserToken._id,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });
    res
      .status(200)
      .send({ newUserToken, msg: "User is saved", token: `Bearer${token}` });
  } catch (error) {
    res.status(500).send({ msg: "can no save the user" });
  }
});

//login
userRouter.post("/login", loginRules(), validation, async (req, res) => {
  const { email, password } = req.body;

  try {
    // find if the user exist
    const searshedUser = await User.findOne({ email });

    // cheq if the email exist
    if (!searshedUser) {
      return res.status(400).send({ msg: "User not Found" });
    }
    // password exist
    const passwordRight = await bcrypt.compare(password, searshedUser.password);
    if (!passwordRight) {
      return res.status(400).send({ msg: "incorrect password" });
    }
    //create a token
    const payload = {
      _id: searshedUser._id,
    };
    const token = await jwt.sign(payload, process.env.SecretOrKey, {
      expiresIn: 3600,
    });

    //send user
    res
      .status(200)
      .send({ user: searshedUser, msg: "success", token: `Bearer${token}` });
  } catch (error) {
    res.status(500).send({ msg: "can not get the user" });
  }
});
// delete user
userRouter.delete("/:id", async (req, res) => {
  try {
    let result = await User.findOneAndRemove({
      _id: req.params.id,
    });

    res.send({ msg: "user deleted" });
  } catch (error) {
    res.status(500).send("cannot delete user..");
    console.log(error);
  }
});

userRouter.get("/current", isAuth(), (req, res) => {
  res.status(200).send({ user: req.user });
});


userRouter.get('/getAll',async(req,res)=>{

  try{
    const result=await User.find()
    res.status(200).send({ user: result, msg: "User List" });
  }
  catch(err){
    res.status(500).send({msg:'can not find User'})
  }
})
module.exports = userRouter;
