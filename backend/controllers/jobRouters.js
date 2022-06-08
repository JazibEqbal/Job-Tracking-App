import express from "express";
import {
  craeteJob,
  deleteJob,
  getAllJobs,
  updateJob,
  showStats,
} from "./jobController.js";

const router = express.Router();

router.route("/").post(craeteJob).get(getAllJobs);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;

