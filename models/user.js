import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  password: String,
  email: String,
  orders:[{
    type:Schema.Types.ObjectId,
    ref:"Orders"
  }]
});

const User = mongoose.model("User", userSchema);
export default User;