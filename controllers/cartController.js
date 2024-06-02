// import useModel from "../models/userModel.js";


// // add items to user cart
// const addToCart = async (req,res) =>{
//       try{
//        let userData=await useModel.findOne({_id:req.body.userId});
//        let cartData=await userData.cartData;
//        if(!cartData[req.body.itemId]){
//              cartData[req.body.itemId]=1
//        }
//        else{
//         cartData[req.body.itemId] +=1
//        }
//        await useModel.findByIdAndUpdate(req.body.userId,{cartData})
//        res.json({success:true,message:"Added to Cart"})
//       }catch(error){
//           console.log(error)
//           res.json({success:false,message:"Error"})
//       }
// }

// // remove item from user cart
// const removeFromCart = async (req,res) =>{
//          try{
//             let userData = await useModel.findById(req.body.userId);
//             let cartData = await userData.cartData;
//             if(cartData[req.body.itemId]>0){
//                 cartData[req.body.itemId] -=1;
//             }
//             await useModel.findByIdAndUpdate(req.body.userId,{cartData})
//             res.json({success:true,message:"Removed from Cart"})
//          }
//          catch(error){
//               console.log(error);
//               res.json({success:false,message:"Error"})
//          }
// }

// // fetch user cart data
// const getCart = async (req,res)=>{
//       try{
//               let userData =await useModel.findById(req.body.userId);
//               let cartData= await userData.cartData;
//               res.json({success:true,cartData})
//       }catch(error){
//         console.log(error);
//         res.json({success:false,message:"Error"}) 
//       }
// }
// export  {addToCart,removeFromCart,getCart}



import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error adding to cart" });
    }
};

// Remove item from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.json({ success: true, message: "Removed from Cart" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing from cart" });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching cart data" });
    }
};

export { addToCart, removeFromCart, getCart };
