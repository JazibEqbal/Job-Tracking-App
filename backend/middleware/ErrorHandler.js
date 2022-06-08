import { StatusCodes } from "http-status-codes";

const errorHandleMiddleware = (err, req, res, next) => {
  //console.log(err);
  //DEFAULT ERROR
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, try again later",
  };
  //CHECKING ERRORS WITH THEIR NAMES
  if (err.name === "ValidationError") {
    (defaultError.statusCode = StatusCodes.BAD_REQUEST),
      (defaultError.msg = Object.values(err.errors)
        .map((item) => item.message)
        .join(","));
  }
  //if email is not unique
  if (err.code && err.code === 11000) {
    (defaultError.statusCode = StatusCodes.BAD_REQUEST),
      (defaultError.msg = `${Object.keys(err.keyValue)} has to be unique`);
  }
  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
  //res.status(defaultError.statusCode).json({ msg: err });
};

export default errorHandleMiddleware;

//defaultError.msg = err.message;
