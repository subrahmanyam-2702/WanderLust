const User=require("../models/user");

module.exports.signUp=async(req,res,next)=>
{
    try
    {
        let {username,email,password}=req.body;
    let  newUser=new User({email,username});
    const registereduser=await User.register(newUser,password);
    req.login(registereduser,(err)=>
    {
        if(err)
        {
            return next(err);
        }
        req.flash("success","Welcome to WanderLust");
        res.redirect("/listings");
    });
    }catch(e)
    {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
};

module.exports.renderSignupForm=(req,res)=>
{
     res.render("users/signup.ejs");
};

module.exports.renderLoginForm=(req,res)=>
{
    res.render("users/login.ejs")  
};

module.exports.login=async(req,res)=>{
      req.flash("success","Welcome back to WanderLust");
      let redirectUrl=res.locals.redirectUrl || "/listings";
      res.redirect(redirectUrl);
};

module.exports.logout=(req,res,next)=>
{
    req.logout((err)=>
    {
        if(err)
        {
             return next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
};