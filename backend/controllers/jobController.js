import { StatusCodes } from "http-status-codes";
import checkPermissions from "../middleware/checkPermissions.js";
import Job from "../models/Jobs.js";
import mongoose from "mongoose";
import moment from "moment";

//creating a job
const craeteJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all values" });
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
  //res.send("create job");
};
//GET ALL JOBS
const getAllJobs = async (req, res) => {
  //QUERY ONE WAY
  //const { status } = req.query;
  //const jobs = await Job.find({ createdBy: req.user.userId, status });
  //OTHER WAY
  //Grabbing Query from frontend
  const { status, jobType, search, sort } = req.query;
  const queryObject = {
    createdBy: req.user.userId,
  };
  //QUERY
  //checking before implementing on frontend
  // if (status && status !== "all") {
  //   queryObject.status = status;
  // }
  if (status !== "all") {
    queryObject.status = status;
  }
  if (jobType !== "all") {
    queryObject.jobType = jobType;
  }
  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  //
  let result = Job.find(queryObject);
  //CHAINING SORTING
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  //PAGINATION
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * 5;
  result = result.skip(skip).limit(limit);
  //
  const jobs = await result;
  //
  const totalJobs = await Job.countDocuments(queryObject);
  const numberOfPages = Math.ceil(totalJobs / limit);
  res.status(StatusCodes.OK).json({ jobs, totalJobs, numberOfPages });
  //res.send("get all jobs");
};
//
// UPDATE A JOB
const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;
  if (!position || !company) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all values" });
  }
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No jobs found with id: ${jobId}` });
  }
  checkPermissions(req.user, job.createdBy);
  const jobToUpdate = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json({ jobToUpdate });
  //res.send("update job");
  //
  //ALTERNATIVE WAY

  // job.company = company;
  // job.position = position;
  // await job.save();
  // res.status(StatusCodes.OK).json({ job });
};
//DELETE JOB
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;
  const job = await Job.findOne({ _id: jobId });
  if (!job) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No jobs found with id: ${jobId}` });
  }
  checkPermissions(req.user, job.createdBy);
  await job.remove();
  res.status(StatusCodes.OK).json({ msg: "Job Removed" });
  //res.send("delete job");
};
//

//STATS
const showStats = async (req, res) => {
  //AGGREGRATION PIPELINE
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  //Reducing and converting array into object
  stats = stats.reduce((accumulator, currentItem) => {
    const { _id: title, count } = currentItem;
    accumulator[title] = count;
    return accumulator;
  }, {});
  //default values if user has no jobs
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  //
  //Limiting year & month which is latest
  //
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 12 },
  ]);
  //Refactoring months and year
  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
  // res.send("show stats");
};

export { craeteJob, deleteJob, getAllJobs, updateJob, showStats };
