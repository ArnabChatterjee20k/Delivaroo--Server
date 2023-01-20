import mongoose from "mongoose";
const url =process.env.DELIVAROO_DB;
export default async function connectToDb() {
  try {
    await mongoose.connect(url);
    console.log("db connected");
  } catch (error) {
    throw new Error(error.message);
  }
}
