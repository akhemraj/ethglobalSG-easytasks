// /controllers/userController.js
import User from "../models/User.js";
import jwt from 'jsonwebtoken';
import { verifyCloudProof } from '@worldcoin/idkit'



// Create a new user
export const createUser = async (req, res) => {
  try {
    console.log("creating user", req.body);
    const { name, email, role, pincode } = req.body;
    //role: "user" or "earner"
    const savedUser = await User.findOneAndUpdate({ email }, {name, role, pincode}, { upsert: true, new: true });
    console.log('user saved');
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

// Fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

export const userSignUpOrSignIn = async (req, res) => {
    try {
        let {token} = req.body;
        // console.log('tokenSingleQuotes : ', token, req.body);
        token = token.replace(/^"|"$/g, '');
        // console.log('decoding token', token );
        const decodedToken = jwt.decode(token);
        // console.log("decodedToken",decodedToken);
        if(!decodedToken) {
            res.status(500).json({message: "Error Signing up or Signing In User"});
        }
        const email = decodedToken.email;
        const walletAddress = decodedToken.verified_credentials[0].address;
        const user = await User.findOne({email}).lean();
        if(!user) {
            const newUser = new User({email, walletAddress});
            await newUser.save();
            res.status(200).json({isNewUser: true, email, walletAddress});
        } else {
            res.status(200).json({isNewUser: false, ...user});
        }
    } catch (error) {
        console.log("error", error);
        res.status(500).json({message: "Error Signing up or Signing In User"});
    }
}


export const verifyProof = async(req, res) => {
  try {
    const {proof, email} = req.body
    console.log('the body for verify proof is : ', proof, email, req.body);
    const app_id = process.env.WORLD_APP_ID
    const action = process.env.WORLD_APP_ACTION_ID
    // console.log(process.env.WORLD_APP_ID, process.env.WORLD_APP_ACTION_ID);
    const verifyRes = await verifyCloudProof(proof, app_id, action)

    if (verifyRes.success) {
        const user = await User.findOneAndUpdate({email}, {isVerified: true});
        res.status(200).send(verifyRes);
    } else {
        res.status(400).send(verifyRes);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error verifying proof', error });
  }
	
};