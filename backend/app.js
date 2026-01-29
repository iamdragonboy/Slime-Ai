import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import auth from "./routes/auth.js";
import ai from "./routes/ai.js";
import workspace from "./routes/workspace.js";
import payment from "./routes/payment.js";
import admin from "./routes/admin.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const app = express();
app.use(express.json());

app.use("/auth", auth);
app.use("/ai", ai);
app.use("/workspace", workspace);
app.use("/payment", payment);
app.use("/admin", admin);

app.get("/", (_, res) => res.json({ status: "Slime AI OK" }));

export default app;
