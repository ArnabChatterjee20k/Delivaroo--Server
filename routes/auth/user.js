import express from "express";
import checkToken from "../../middleware/checkToken.js";
import User from "../../models/user.js";
import { getUserById, getUserByEmail } from "../../utils/getUser.js";
import { checkJWT, createJWT } from "../../utils/jwt.cjs";
import { genHash } from "../../utils/passwordHash.js";

const { Router } = express;
const authRouter = Router();

authRouter.get("/:id",checkToken, async (req, res) => {
  try {
    const accessId = req["access-token"]
    const {id} = accessId
    const user = await getUserById(id);
    if (user) return res.status(200).json(user);
    return res.status(404).json({ status: "user not found" });
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
});

authRouter.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const userExists = await getUserByEmail(email);
    if (userExists) return res.status(200).json({ status: "User Exists!" });

    const hashedPassword = await genHash(password)
    const user = new User({...req.body,password:hashedPassword});
    const savedUser = await user.save();

    return res.status(200).json(createJWT({id:savedUser._id}));
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
});

export default authRouter;
