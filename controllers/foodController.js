import multer from "multer";
import foodModel from "../models/footModel.js";
import fs from 'fs';
import mongoose from "mongoose";

//adding Food Item
 const addFood = async (req,res)=>{
          const image_filename = `${req.file.filename}`;

          const food= new foodModel({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,
            image:image_filename
          })
          try{
            await food.save();
            res.json({success:true,message:"Food Item added successfully"})
          }
          catch(error){
            console.log(error)
            res.json({success:false,message:error});
          }
}

//getting all food items

const listFood = async (req,res)=>{
        try{
            const foods= await foodModel.find({})
            res.json({success:true,data:foods})
        }
        catch(error){
            console.log(error);
            res.json({success:false,data:error});
        }
}

// removing a food item 

const removeFood = async (req,res)=>{
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`upload/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Item removed Successfully"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,data:error});
    }
}


export {addFood,listFood,removeFood}





































