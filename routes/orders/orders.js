import express from "express";
import checkToken from "../../middleware/checkToken.js";
import Orders from "../../models/orders.js";
import User from "../../models/user.js";
const { Router } = express;

const orderRouter = Router();

orderRouter.get("/", checkToken, async (req, res) => {
  const { id } = req["access-token"];
  const user = await User.findById(id).populate({
    path: "orders",
    model: "Orders",
    options: { sort: { orderDate: -1 } },
  });
  /**
   * populating means to replace the refs with the actual document
   * we are storing the refs in user with the help of objectid
   * then replacing the object ids with actual document with population
   * including items and removing _id
   */
  if (user) {
    return res.status(200).json(user.orders);
  }
  res.sendStatus(404);
});

orderRouter.post("/", checkToken, async (req, res) => {
  const { id } = req["access-token"];
  const user = await User.findById(id);
  if (user) {
    const body = req.body;
    const order = await new Orders({ items: body, user: user }).save();
    user.orders.push(order._id);
    user.save();
    return res.status(200).json({ status: order });
  }
  res.sendStatus(404);
});

export default orderRouter;
