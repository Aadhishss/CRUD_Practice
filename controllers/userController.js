const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
var bcrypt = require('bcrypt');
var jwt=require('jsonwebtoken')
//@desc Register a user
//@rout POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req,res)=>{
    const {username , email ,password}=req.body;
    if(!username||!email||!password){
       
        res.status(400);
     
        throw new Error("All fields are mandatory")
    }

   
    const userAvailable=await User.findOne({email});
      if(userAvailable){
        res.status(400);
        throw new Error('User already registered')
       }
 
  
    //Hash password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("hash password",hashedPassword);
    //Create and save user in DB
    const user=await User.create({
        username,
        email,
        password: hashedPassword
    });
    console.log("User created"+user);
    if (user){
        res.status(201).json({_id: user.id, email: user.email})
    }else{
        res.status(400);
        throw new Error("User data not valid")
    }


    res.json({message:"register the user"})

});

//@desc Login a user
//@rout POST /api/users/login
//@access public

const loginUser= asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
 
    if (!email||!password) {
       
        res.status(400);
        throw new Error('Please enter all fields');
        
    } 
   
     const user=await User.findOne({email});

    //  compare password with hashed password
    
        if (user && (await bcrypt.compare(password, user.password))){
        
            const accessToken=jwt.sign({
                user:{
                    username:user.username,
                    email:user.email,
                    id:user.id
                },
            },process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"100m"} 
            );
          
    
            res.status(200).json({accessToken});
    
        }else{
            res.status(401)
            throw new Error("email or password is not valid")
        }
    
    
  
});

//@desc Current user
//@rout GET /api/users/current_user
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
  });

module.exports={
    registerUser,
    loginUser,
    currentUser,
}