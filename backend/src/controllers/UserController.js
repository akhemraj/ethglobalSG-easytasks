// /controllers/userController.js
// const User = require('../models/userModel');
import User from "../models/User.js";
// Create a new user
export const createUser = async (req, res) => {
  try {
    console.log("creating user", req.body);
    const { name, email, age } = req.body;

    const newUser = new User({ name, email, age });
    console.log('user created');
    const savedUser = await newUser.save();
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
        const {token} = req.body;
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({message: "Error Signing up or Signing In User"});
    }
}

