import useModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator'

const createToken = (id)  =>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


//login user

const loginUser = async (req,res)=>{
       const {email,password} = req.body;
       try{
        const user  = await useModel.findOne({email})
        if(!user){
            return res.json({success:false,message:'User Not Found'})
        }
         
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:"Invalid Password"})
        }

        const token= createToken(user._id)
        res.json({success:true,token})

       }catch(error){

       console.log(error);
       res.json({success:false,message:"Error"})

       }
}



//register user 

const registerUser = async (req,res)=>{
       const {name,email,password} = req.body;
       try{
        const exists = await useModel.findOne({email})
        //checking is User already exists
           if(exists){
            return res.json({success:false,message:"User already registered"});
           }
        // validating email format and strong password
           if(!validator.isEmail(email)){
               return res.json({success:false,message:"Please Enter valid Email"});
           }
           //validate strong password
           if(password.lenght<8){
            return res.json({success:false,message:"Password must be atleast 8 characters"});
           }
           // Hashing Password
           const salt= await bcrypt.genSalt(10)
           const hashedPassword = await bcrypt.hash(password,salt);


           const newUser = new useModel({
            name:name,
            email:email,
            password:hashedPassword
           })

      const user = await newUser.save()
      const token = createToken(user._id)
       res.json({success:true,token});
       }catch(error){
           console.log(error);
           res.json({success:false,message:"Error"})
       }
}

export {loginUser,registerUser};