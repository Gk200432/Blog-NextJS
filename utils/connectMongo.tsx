import mongoose from "mongoose";

const connectMongo = async () => {

  await mongoose.connect("mongodb://localhost:27017/nextjs_mongodb");
};

export default connectMongo;
