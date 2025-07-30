const Listing=require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken});

module.exports.index=async (req,res)=>{
    const { category } = req.query;
    let allListings;
    if (category) {
        const formattedCategory = category
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        allListings = await Listing.find({ category: formattedCategory });
    } else {
        allListings = await Listing.find({});
    }

    res.render("listings/index.ejs", { allListings, category });
};

module.exports.renderNewForm=(req,res)=>{  
       res.render("listings/new.ejs");
};

module.exports.showListing=async (req,res)=>{
      let {id}=req.params;
      const listing=await Listing.findById(id)
      .populate({
         path:"reviews",
         populate:{
            path:"author",
         }

      })
      .populate("owner");
      if(!listing)
      {
         req.flash("error","Listing you are searching is not existed");
         return res.redirect("/listings");
      }
      res.render("listings/show.ejs", {
  listing,
  mapToken: process.env.MAP_TOKEN
});
};

module.exports.createListing=async (req,res,next)=>{
       
     let response=await geocodingClient
     .forwardGeocode({
      query:req.body.listing.location,
      limit: 1
      })
      .send();
 

      let url=req.file.path;
      let filename=req.file.filename;
      const newListing=new Listing(req.body.listing);
      newListing.owner=req.user._id;
      newListing.image={url,filename};

      newListing.geometry=response.body.features[0].geometry;

      let savedListing=await newListing.save();;
      req.flash("success","New Listing created!");
      res.redirect("/listings"); 

};


module.exports.renderEditForm=async(req,res)=>{
      let {id}=req.params;
      let listing=await Listing.findById(id);
      if(!listing)
      {
         req.flash("error","Listing you are searching is not existed");
         return res.redirect("/listings");
      }
 
      let originalimageurl=listing.image.url;
      originalimageurl=originalimageurl.replace("/upload","/upload/w_250")
      res.render("listings/edit.ejs",{listing,originalimageurl});
};

// module.exports.updateListing=async (req,res)=>{ 
//       let {id}=req.params;    
//       let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
//       if(typeof req.file!=="undefined")
//       {
//             let url=req.file.path;
//             let filename=req.file.filename;
//             listing.image={url,filename};
//             await listing.save(); 
//       }
//       req.flash("success","Listing Updated!");
//       res.redirect(`/listings/${id}`);
// };
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;

    // 🗺️ Geocode the updated location
    const geoData = await geocodingClient
        .forwardGeocode({
            query: req.body.listing.location,
            limit: 1,
        })
        .send();

    // 📝 Update listing and its geometry
    let listing = await Listing.findByIdAndUpdate(id, {
        ...req.body.listing,
        geometry: geoData.body.features[0].geometry
    });

    // 📸 If a new image is uploaded
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
    }

    await listing.save(); // Save updated listing
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};


module.exports.destroyListing=async (req,res)=>{
      let {id}=req.params;
      let deletedListing=await Listing.findByIdAndDelete(id);
      req.flash("success","Listing deleted successfully!");
      res.redirect("/listings");
};








