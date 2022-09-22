import express from "express";
import errorHandleMiddleware from "./middleware/ErrorHandler.js";
import notFoundMiddleware from "./middleware/NotFound.js";
import dotenv from "dotenv";
import connect_db from "./db/datbaseConnect.js";
import authRouter from "./controllers/authRouters.js";
import jobRouter from "./controllers/jobRouters.js";
import "express-async-errors";
import morgan from "morgan";
import auth from "./middleware/auth.js";

//PROFUCTION READY
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

//SECURING SERVER
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

dotenv.config();
const app = express();
app.use(express.json());
//
// const __dirname = dirname(fileURLToPath(import.meta.url));
// app.use(express.static(path.resolve(__dirname, "../client-lc/build")));

//SECURING SERVER
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
//
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//MIDDLEWARE
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", auth, jobRouter);

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client-lc/build", "index.html"));
// });

app.use(notFoundMiddleware);
app.use(errorHandleMiddleware);

//
const port = process.env.PORT;
const start = async () => {
  try {
    await connect_db(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
