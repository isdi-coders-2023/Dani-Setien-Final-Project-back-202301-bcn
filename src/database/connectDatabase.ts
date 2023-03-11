import mongoose from "mongoose";

const connectDatabase = async (url: string) => {
  mongoose.set("strictQuery", false);
  mongoose.set("debug", true);

  mongoose.set("toJSON", {
    virtuals: true,
    transform(doc, converted) {
      delete converted._id;
    },
  });

  try {
    await mongoose.connect(url);
  } catch (error) {
    throw new Error("Error while connecting to data base.");
  }
};

export default connectDatabase;
