const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review");
const { required } = require("joi");

const listingSchema= new Schema({
    title:
    {
        type:String,
        required:true,
    },
    description:
    {
        type:String,

    },
    image:
    {
        // type:String,
        // default:"https://media.istockphoto.com/id/1286187894/photo/cottage-for-cklents-in-hotel-close-to-nirvana-beach-in-kumta-district-coconut-palm-trees.jpg?s=1024x1024&w=is&k=20&c=O3YvMituWf-oLisMzsw0XnnCrvy4UXDm8hC5t5rKVPc=",
        // set:(v)=> v===""?"https://media.istockphoto.com/id/1286187894/photo/cottage-for-cklents-in-hotel-close-to-nirvana-beach-in-kumta-district-coconut-palm-trees.jpg?s=1024x1024&w=is&k=20&c=O3YvMituWf-oLisMzsw0XnnCrvy4UXDm8hC5t5rKVPc=":v,

        url:String,
        filename:String
    },
    price:
    {
        type:Number,
        default:1500
    },
    location:
    {
        type:String,
    },
    country:
    {
        type:String,
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review",
        }
    ],
    owner:
    {
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  category:
  {
    type:String,
    enum:['Trending','Mountains','Iconic Cities','Rooms','Castles','Amazing Pools','Camping','Farming','Arctic'],
    default:'Trending',
    required:true
  }
});

listingSchema.post("findOneAndDelete",async(listing)=>
{
    if(listing)
    {
       await Review.deleteMany({_id:{$in:listing.reviews}});
    }
       
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
