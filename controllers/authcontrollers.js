const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { catchAsync } = require("../utils");
const { HttpError } = require("../Errors");
const gravatar = require("gravatar");
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../utils");
const { registrationMessage } = require("../messagesFromBackend");
require("dotenv").config();
const { SECRET_KEY, FRONTEND } = process.env;

exports.signup = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const firstName = email.split("@")[0];
  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    firstName,
    verificationToken,
  });

  await sendEmail({
    to: email,
    subject: "Registration on RentCar",
    html: registrationMessage(newUser),
  });

  const payload = { id: newUser._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: {
      _id: newUser.id,
      email: newUser.email,
      firstName: newUser.firstName,
      avatarURL: newUser.avatarURL,
      verificationToken: newUser.verificationToken,
    },
  });
});

exports.verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) throw HttpError(404, "User not found");

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.redirect(`${FRONTEND}/signin`);
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const userLog = await User.findOne({ email });

  if (!userLog || !userLog.verify) {
    throw HttpError(401, "Email or password is wrong or email is not verify");
  }

  const passwordCompare = await bcrypt.compare(password, userLog.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: userLog._id };
  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(userLog._id, { token });

  res.json({
    token,
    user: {
      email,
      role: userLog.role,
      firstName: userLog.firstName,
      lastName: userLog.lastName,
      address: userLog.address,
      phoneNumber: userLog.phoneNumber,
      avatar: userLog.avatarURL,
      favorites: userLog.favorites,
    },
  });
});

exports.logout = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204);
});

exports.currentUser = catchAsync(async (req, res, next) => {
  const {
    email,
    role,
    firstName,
    lastName,
    address,
    phoneNumber,
    avatar,
    favorites,
  } = req.user;
  res.json({
    email,
    role,
    firstName,
    lastName,
    address,
    phoneNumber,
    avatar,
    favorites,
  });
});

exports.updateRole = async (req, res) => {
  const { role } = req.body;
  const { _id } = req.user;

  if (!["user", "admin"].includes(role)) {
    throw HttpError(400, "Invalid subscription type");
  }

  const user = await User.findByIdAndUpdate(_id, { role }, { new: true });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  res
    .status(200)
    .json({
      email: user.email,
      role,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      avatar: user.avatarURL,
      favorites: user.favorites,
    });
};

exports.updateAvatar = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const { path: directory, originalname } = req.file;

  const fileName = `${_id}_${originalname}`;
  const directoryToUpload = path.join(
    __dirname,
    "../",
    "public",
    "avatars",
    fileName
  );

  const avatar = await Jimp.read(directory);
  await avatar.resize(250, 250).writeAsync(directory);
  await fs.rename(directory, directoryToUpload);

  const avatarURL = path.join("avatars", fileName);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.status(200).json({ avatarURL });
});

exports.resendVerifyEmail = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(400, "Missing required field email");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  await sendEmail({
    to: email,
    subject: "Registration on RentCar",
    html: registrationMessage(user),
  });

  res.json({ message: "Verification email sent" });
});
