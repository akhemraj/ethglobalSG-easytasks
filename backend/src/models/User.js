import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {type: String },
    walletAddress: {
        type: String,
        // unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'earner'],
        default: 'user'
    },
    pincode: {
        type: String,
        default: null
    }
});
  
const User = mongoose.model('User', userSchema);

export default User;