import express from "express";
import { auth, admin } from "../middleware/auth.js";
import User from "../models/User.js";

const r = express.Router();

r.post("/set-plan", auth, admin, async (req,res)=>{
  const u = await User.findById(req.body.userId);
  u.plan = req.body.plan;
  await u.save();
  res.json({ ok:true });
});

export default r;
