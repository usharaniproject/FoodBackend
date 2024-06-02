import mongoose from "mongoose";
const connectdb = async()=>{
   await mongoose.connect('mongodb+srv://usharanirangapuram:avdKyHtsGnNqJ8xC@fooddeliverysite.cum6m9p.mongodb.net/food-del')
   .then(()=>{
    console.log('Connected to MongoDB Successfully')
   })
   .catch((error)=>{
    console.log(error)
   })
}

export default connectdb