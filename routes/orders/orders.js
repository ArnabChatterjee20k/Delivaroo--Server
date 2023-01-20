import express from "express";
import checkToken from "../../middleware/checkToken.js";
import Orders from "../../models/orders.js";
import User from "../../models/user.js";
const { Router } = express;

const orderRouter = Router();

orderRouter.get("/", checkToken, async (req, res) => {
  const {id} = req["access-token"];
  const user = await User.findById(id).populate("orders");
  if (user) {
    return res.status(200).json(user.orders);
  }
  return res.status(404);
});

orderRouter.post("/", checkToken, async (req, res) => {
  const {id} = req["access-token"];
  const user = await User.findById(id);
  if (user) {
    const body = req.body;
    const order = await new Orders({...body,user:user}).save();
    user.orders.push(order._id)
    user.save()
    return res.status(200).json({ status: order });
  }
  return res.status(404);
});

export default orderRouter;
