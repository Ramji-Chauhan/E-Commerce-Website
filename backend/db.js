import mongoose from "mongoose";
export const Connection = async (username, password) => {
  const URL = `mongodb+srv://ramjichauhan068:dNw0CORpCypypYGX@cluster0.duahgay.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
    });
    console.log("Mongo is connected!!!!");
  } catch (e) {
    console.log("Unsuccesfull connection to database ", e.message);
  }
};
export default Connection;
