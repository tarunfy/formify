import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import ResetToken from "../models/reset_token.js";
import dotenv from "dotenv";
import cryptoRandomString from "crypto-random-string";
import nodemailer from "nodemailer";

dotenv.config();
const privateKey = process.env.PRIVATE_KEY;

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isExistingUser = await User.findOne({ email });

    if (!isExistingUser) {
      return res.status(400).json({ error: "User does not exists" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      isExistingUser.password
    );

    if (!isValidPassword) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    const token = jwt.sign(
      { email: isExistingUser.email, userId: isExistingUser._id },
      privateKey,
      {
        expiresIn: "2h",
      }
    );

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 2,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ user: isExistingUser, token });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const signUp = async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password too short" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await User.create({
      email,
      password: hashedPassword,
      fullName,
    });

    const token = jwt.sign(
      { email: result.email, userId: result._id },
      privateKey,
      {
        expiresIn: "2h",
      }
    );

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 2,
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ user: result, token });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.end();
};

export const currentUser = async (req, res) => {
  const token = req.cookies["access_token"];

  console.log("Current user token: ", token);

  if (!token) {
    return res.status(401).json({ error: "Token expired..." });
  }

  jwt.verify(token, privateKey, async (err, decode) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "Token is not valid or has been tampered " });
    }
    try {
      const user = await User.findById(decode.userId);
      console.log("Current user: ", user);

      return res.status(200).json({ user: user.fullName });
    } catch (err) {
      res.status(401).json({ error: "User doesn't exists with that userId" });
    }
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const isExisting = await User.findOne({ email });

  if (!isExisting) {
    return res.status(400).json({ error: "User not found" });
  }

  const token = await cryptoRandomString.async({ length: 10, type: "base64" });

  const result = await ResetToken.create({
    userId: isExisting._id,
    token,
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    name: "formify",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Reset your password",
    text: `Reset your password`,
    html: `
    <h2>Hey ${isExisting.fullName} click on the link below to reset your password 🙃<h2>
    <a href="https://formifyy.vercel.app/reset-password?token=${result.token}">Reset Your Password</a>`,
  };

  try {
    const response = await transporter.sendMail(mailOptions);
    console.log("email sent!", response);
    return res.status(200).json({ message: "Email has been sent" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Something went wrong Oops!" });
  }
};

export const resetPassword = async (req, res) => {
  const { password, confirmPassword, token } = req.body;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ error: "Please make sure your passwords match" });
  }

  const isValidToken = await ResetToken.findOne({ token });

  if (!isValidToken) {
    return res.status(400).json({ error: "Token is not valid" });
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  const updatedUser = await User.findByIdAndUpdate(isValidToken.userId, {
    password: hashedPassword,
  });

  const deleteToken = await ResetToken.findOneAndDelete({ token });

  return res.status(200).json({ message: "Password has been changed" });
};
