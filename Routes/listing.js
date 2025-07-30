const express=require("express");
const router=express.Router();
const wrapasync=require("../utils/wrapasync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema}=require("../schema.js");
const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing,}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const {storage}=require("../cloudconfig.js");
const multer  = require('multer');
const { string } = require("joi");
const upload = multer({storage});

router.route("/")
.get(wrapasync(listingController.index))  //index route
.post(                    //create route
   isLoggedIn,
   upload.single('listing[image]'),
   validateListing,
   wrapasync(listingController.createListing)
);


//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapasync(listingController.showListing))  //show rout
.put(        //update route
   isLoggedIn,
   isOwner,
   upload.single('listing[image]'),
   validateListing, 
   wrapasync(listingController.updateListing)
)
.delete(     //delete route
   isLoggedIn,
   isOwner,
   wrapasync(listingController.destroyListing)
);





//edit route
router.get("/:id/edit",
   isLoggedIn,
   isOwner,
   wrapasync(listingController.renderEditForm));



module.exports=router;