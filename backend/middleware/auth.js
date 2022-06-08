import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
// import { UnAuthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    //throw new UnAuthenticatedError("Authentication Invalid");
    return res.status(StatusCodes.UNAUTHORIZED).json({
      msg: "Access Denied!",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };

    next();
  } catch (error) {
    // throw new UnAuthenticatedError("Authentication Invalid");
    next(error);
  }
};

export default auth;
