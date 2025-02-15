
const  generateToken =   require('../utils/jwtconfig');

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const signup = async (req,res) =>{

  const {name,email,phone,password} = req.body;

   try {
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    if (phone.length !== 10) {
      return res.status(400).json({ message: "Phone number must be 10 digits" });
    }

    const user = await User.findOne({email});

    if(user){
      return res.status(400).json({message: "user already exists"});
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword
    })

    if (newUser) {
      
      // generate jwt token
      generateToken(newUser._id, res)
      await newUser.save();
      res.status(201).json(
        {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          profilePic: newUser.profilePic,
        }
      );

    } else {
      res.status(400).json({message  : "Invalid user data"});
    }

   } catch (error) {
      console.log("Error in signip controller", error.message);
      res.status(500).json({message: "Internal server error"});
    
   }
};
const login = (req,res) =>{
  try {
    
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({message: "Internal server error"});
  }
};

const logout = (req,res)=>{
  res.send('logout');
};


module.exports = {signup,login,logout};