import jwt from "jsonwebtoken";
import User from "../models/User.js";

export async function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(data.id);
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}

export function admin(req, res, next) {
  if (!req.user.isAdmin) return res.sendStatus(403);
  next();
}
