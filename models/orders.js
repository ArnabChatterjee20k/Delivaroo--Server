import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  items: [{ image: String, name: String, restaurant: String,count:Number }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Orders = mongoose.model("Orders", orderSchema);
export default Orders;
