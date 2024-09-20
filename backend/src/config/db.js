// blog_app/config/db.js

import mongoose from "mongoose";

export default function connectDB() {
  const url = "mongodb+srv://ethSingaporeWinner:wewillwinethsingapore@eth-singapore.j33le.mongodb.net/";

  try {
    mongoose.connect(url);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected: ${url}`);
  });

  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}
