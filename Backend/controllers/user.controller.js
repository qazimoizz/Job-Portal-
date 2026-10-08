import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullName, fullname, email, phoneNumber, password, role } = req.body;

        // Support both naming conventions
        const nameToSave = fullName || fullname;

        if (!nameToSave || !email || !password || !role) {
            return res.status(400).json({
                message: "Please fill in all required fields.",
                success: false
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email address.",
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName: nameToSave, // Saves to Mongoose required 'fullName'
            email,
            phoneNumber: phoneNumber || "",
            password: hashedPassword,
            role,
            profile: {
                bio: "",
                skills: [],
                profilePhoto: ""
            }
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        });
    } catch (error) {
        console.log("=== REGISTRATION ERROR ===");
        console.error(error);
        return res.status(500).json({
            message: error.message || "Server error during registration.",
            success: false
        });
    }
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "email or password is incorrect",
        succes: false,
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "email or password is incorrect",
        succes: false,
      });
    }
    // checking the role is correct
    if (role !== user.role) {
      return res.status(400).json({
        message: "account doesn't exists",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `welcome back ${user.fullName}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(201).cookie("token", "", { maxAge: 0 }).json({
      message: "loggedout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
    try {
      const { fullName, email, phoneNumber, skills, bio } = req.body;
        const file = req.file;
        
// cloudinary will come here bruuh
let skillsArray;
if(skills){
 skillsArray = skills.split(",");

}
    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    };
    // updating the user here
if(fullName) user.fullName =fullName
if(email) user.email= email
if(phoneNumber) user.phoneNumber = phoneNumber
if(bio) user.profile.bio = bio
if(skills) user.profile.skills = skillsArray
// resume part come here 

   user = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };
    return res.status(201).json({
        message:"Profile is updated successfully",
        user,
        success:true
    })
await user.save()

  } catch (error) {
    console.log(error);
  }
};
