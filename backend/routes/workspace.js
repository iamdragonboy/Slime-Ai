import express from "express";
import { auth } from "../middleware/auth.js";
import Workspace from "../models/Workspace.js";
import plans from "../config/plans.js";
import { v4 as uuid } from "uuid";

const r = express.Router();

r.post("/create", auth, async (req,res)=>{
  const count = await Workspace.countDocuments({ userId:req.user._id });
  if(count >= plans[req.user.plan].workspaces)
    return res.status(403).json({ error:"Limit reached" });

  const ws = await new Workspace({
    userId:req.user._id,
    name:req.body.name,
    provider:req.body.provider || "ollama",
    apiKey:"sk-slime-"+uuid()
  }).save();

  res.json(ws);
});

export default r;
