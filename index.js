import express from "express";
import connectToDb from "./db.js";
import authRouter from "./routes/auth/user.js";

const app = express();
const port = 3000;
connectToDb()
app.use(express.json())

app.use("/user",authRouter)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});