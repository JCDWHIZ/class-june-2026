import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (process.env.JWT_SECRET === undefined) {
    return res.status(500).json({
      message: "JWT secret is not defined",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  return res.status(200).json({
    message: "Login successful",
    token,
  });
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body as {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    };

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    if (process.env.JWT_SECRET === undefined) {
      return res.status(500).json({
        message: "JWT secret is not defined",
      });
    }

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    return res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
