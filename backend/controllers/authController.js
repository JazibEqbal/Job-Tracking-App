import User from "../models/Users.js";
import { StatusCodes } from "http-status-codes";
import { badRequestError, UnAuthenticatedError } from "../errors/index.js";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new badRequestError("please provide all values");
    }
    //DUPLICATE EMAIL
    const emailAlreadyExits = await User.findOne({ email });
    if (emailAlreadyExits) {
      throw new badRequestError("Email already exists");
    }
    //
    const user = await User.create({ name, email, password });
    //invoking JWT from UserSchema
    const token = user.createJWT();
    //RESPOND
    res.status(StatusCodes.CREATED).json({
      //removing password
      user: {
        name: user.name,
        email: user.email,
        lastName: user.lastName,
        location: user.location,
      },
      token,
      location: user.location,
    });
  } catch (error) {
    next(error);
  }
};
//
//
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new badRequestError("Please provide all values");
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new UnAuthenticatedError("Wrong email or password");
    }
    //console.log(user);
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError("Wrong email or password");
    }
    const token = user.createJWT();
    //hiding password
    user.password = undefined;
    res.status(StatusCodes.OK).json({ user, token, location: user.location });
    //res.send('loged')
  } catch (error) {
    next(error);
  }
};
//UPDATE USER
//
const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("Please provide all values to update");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.location = location;
  user.lastName = lastName;
  //
  await user.save();
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user,
    token,
    location: user.location,
  });
  //console.log(req.user);
  //res.send("updateUser");
};
export { register, login, updateUser };

// const user = await User.create(req.body);
// res.status(201).json({ user });
