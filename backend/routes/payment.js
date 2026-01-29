import express from "express";
import { auth } from "../middleware/auth.js";
import { verifyLTC } from "../services/blockcypher.js";

const r = express.Router();

r.post("/verify", auth, async (req,res)=>{
  const { txHash, plan } = req.body;
  if(!await verifyLTC(txHash)) return res.sendStatus(400);
  req.user.plan = plan;
  await req.user.save();
  res.json({ success:true });
});

export default r;
