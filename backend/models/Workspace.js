import mongoose from "mongoose";

export default mongoose.model("Workspace",
  new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    name: String,
    apiKey: String,
    provider: String
  })
);
