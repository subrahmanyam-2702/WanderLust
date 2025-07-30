if(process.env.NODE_ENV !="production")
{
   require('dotenv').config();
}
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dburl=process.env.ATLASDB_URL;

const path=require("path");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");

const listingRouter=require("./Routes/listing.js");
const reviewRouter=require("./Routes/review.js");
const userRouter=require("./Routes/user.js");

const methodoverride=require("method-override");

const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodoverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main()
.then((res)=>
{
   console.log("connected to the DB");
})
.catch((err)=>
{
   console.log(err);
});

async function main() {
   await mongoose.connect(dburl);
}

const store=MongoStore.create({
   mongoUrl:dburl,
   crypto:{
      secret:process.env.SECRET,
   },
   touchAfter:24*3600,
});

store.on("error",()=>
{
     console.log("Error in the MONGO SESSION STORE",err);
});

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:
    {
      expires:Date.now()+7*24*60*60*1000,
      maxAge:7*24*60*60*1000,
      httpOnly:true,
    },
}


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>
{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});
 

//Express listing router
app.use("/listings",listingRouter);

//express Review Router
app.use("/listings/:id/reviews",reviewRouter);
//express user router
app.use("/",userRouter);

app.use((req,res,next)=>
{
     next(new ExpressError(404,"Page Not Found!"));
});

app.use((err,req,res,next)=>
{
     let {statusCode=500,message="Something went wrong!"}=err;
     res.status(statusCode).render("error.ejs",{message});
});

app.listen(8080,()=>
{
   console.log('listening on the port 8080');
});
