import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  items: [
    {
      image: { type: String, required: true },
      name: { type: String, required: true },
      restaurant: { type: String, required: true },
      count: { type: Number, required: true },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required:true
  },
});

const Orders = mongoose.model("Orders", orderSchema);
export default Orders;
