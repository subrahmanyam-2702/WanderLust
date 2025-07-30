const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapasync=require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/user.js");


router.route("/signup")
.get(userController.renderSignupForm) //render signup
.post(wrapasync(userController.signUp));//signup


router.route("/login")
.get(userController.renderLoginForm)   //render login
.post(                    //login
    saveRedirectUrl,
    passport.authenticate("local", { 
        failureRedirect: '/login',
        failureFlash:true 
    }),
    wrapasync(userController.login)
);


router.get("/logout",userController.logout);

module.exports=router;