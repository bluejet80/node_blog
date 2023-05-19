require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server is Listening on port ${PORT}`);
});
