import { Request, Response } from "express";
import { loginRequest } from "../types";

export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body as loginRequest;

  res.send(
    "<h1>Login Page</h1><p>This is the login page of our Express server.</p>",
  );
};
