import mongoose from "mongoose";

const connect_db = (url) => {
  return mongoose.connect(url);
};

export default connect_db;
