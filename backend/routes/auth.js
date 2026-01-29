import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const r = express.Router();

r.post("/register", async (req,res)=>{
  const hash = await bcrypt.hash(req.body.password,10);
  await new User({ email:req.body.email, password:hash }).save();
  res.json({ok:true});
});

r.post("/login", async (req,res)=>{
  const u = await User.findOne({ email:req.body.email });
  if(!u || !await bcrypt.compare(req.body.password,u.password))
    return res.sendStatus(401);

  const token = jwt.sign({ id:u._id }, process.env.JWT_SECRET);
  res.json({ token });
});

export default r;
