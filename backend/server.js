import app from "./app.js";

app.listen(process.env.PORT, () =>
  console.log("🟢 Slime AI running on port " + process.env.PORT)
);
