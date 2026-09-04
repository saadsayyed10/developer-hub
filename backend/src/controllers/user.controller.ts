// Import (Request, Response) objects from express
import { Request, Response } from "express";

// Import custom class
import UserService from "../services/user.service";

// Instantiate an object to use methods of user services
const userServices = new UserService();

/*
    Controller: Sign Up user account
    Method: POST
    Endpoint: /api/user/sign-up
    Authorization: Not-Required
*/
export const registerUser = async (req: Request, res: Response) => {
  const { email, password, specialPassword } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email ID is required to sign up" });
  }

  if (!password || password.length < 8) {
    return res.status(400).json({
      error: "Please enter a strong password consisting over 8 characters",
    });
  }

  if (!specialPassword) {
    return res
      .status(400)
      .json({ error: "Special password is required to sign up" });
  }

  try {
    const user = await userServices.registerUser(
      email,
      password,
      specialPassword
    );
    res.status(201).json({ message: "Account successfully registered", user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/*
    Controller: Sign In user account
    Method: POST
    Endpoint: /api/user/sign-in
    Authorization: Not-Required
*/
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email ID is required to sign up" });
  }

  if (!password) {
    return res.status(400).json({
      error: "Password is required to sign up",
    });
  }

  try {
    const { token, user } = await userServices.loginUser(email, password);
    res.status(200).json({ token, user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

/*
    Controller: Fetch logged in user account
    Method: GET
    Endpoint: /api/user/profile
    Authorization: Required
*/
export const fetchUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;

    const user = await userServices.fetchUserProfile(userId);
    res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
