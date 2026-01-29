import mongoose from "mongoose";

export default mongoose.model("User",
  new mongoose.Schema({
    email: String,
    password: String,
    plan: { type: String, default: "FREE" },
    isAdmin: { type: Boolean, default: false }
  })
);
