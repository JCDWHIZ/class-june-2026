import { Request, Response } from "express";
import { loginRequest } from "../types";
import User from "../models/User";

export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body as loginRequest;

  res.send(
    "<h1>Login Page</h1><p>This is the login page of our Express server.</p>",
  );
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

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    return res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
