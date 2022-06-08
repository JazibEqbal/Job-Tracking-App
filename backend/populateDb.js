import { readFile } from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

import connect_db from "./db/datbaseConnect.js";
import Job from "./models/Jobs.js";

const start = async () => {
  try {
    await connect_db(process.env.MONGO_URL);
    await Job.deleteMany();

    const jsonData = JSON.parse(
      await readFile(new URL("./mockData-mokaroo.json", import.meta.url))
    );
    await Job.create(jsonData);
    console.log("Success");
    process.exit(0);
  } catch (error) {
    console.log("Error");
    process.exit(1);
  }
};
start();