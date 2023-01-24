import express from "express";
import checkToken from "../../middleware/checkToken.js";
import User from "../../models/user.js";
import { getUserById, getUserByEmail } from "../../utils/getUser.js";
import { checkJWT, createJWT } from "../../utils/jwt.cjs";
import { compareHash, genHash } from "../../utils/passwordHash.js";

const { Router } = express;
const authRouter = Router();

authRouter.get("/", async (req, res) => {
  try {
    const { email, password } = req.query;
    if (!email || !password)
    return res.status(403).json({ status: "credential missing" });
    const user = await User.findOne({ email});
    if (user) {
      const isAuth = await compareHash(user.password,password)
      if(!isAuth) return res.sendStatus(404)
      const jwt = createJWT({ id: user._id });
      return res.status(200).json({ token: jwt });
    }
    return res.status(404).json({status:"not found"});
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
});

authRouter.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await getUserByEmail(email);
    if (userExists) return res.status(200).json({ status: "User Exists!" });

    const hashedPassword = await genHash(password);
    const user = new User({ ...req.body, password: hashedPassword });
    const savedUser = await user.save();

    return res.status(200).json(createJWT({ id: savedUser._id }));
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
});

export default authRouter;
