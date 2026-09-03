/* backend/src/services/user.service.ts */

import bcrypt from "bcryptjs";
import { envConfig } from "../config/env.config";
import User from "../model/user.model";
import { generateToken } from "../lib/token";

/**
 * User Service Layer
 * ----------------------
 * Handles all business logic, JWT and database interactions related to:
 *  1. Sign Up
 *  2. Sign In
 *  3. Fetching logged in profile
 *
 * Uses Mongoose's built-in ORM for database access, bcryptjs from password hashing and JWT gen handler from custom function.
 */

class UserService {
  // Mongoose ORM Object
  private orm;

  constructor(orm = User) {
    this.orm = orm;
  }

  // Method to sign-up user account
  async registerUser(email: string, password: string, specialPassword: string) {
    // Check if account already exists
    const existingAccount = await this.orm.findOne({ email });
    if (existingAccount)
      throw new Error("Account with same email already exists");

    // Check if user is valid to sign-up
    if (specialPassword !== envConfig.SPECIAL_PASSWORD)
      throw new Error(
        "You are not authorized to open account for this application",
      );

    // Hash password with bcrypt's algorithm
    const hashPassword = await bcrypt.hash(password, 10);

    // Save user data into database (register)
    const user = await this.orm.create({ email, password: hashPassword });

    return user; // Return user data
  }

  async loginUser(email: string, password: string) {
    // Get user from database
    const user = await this.orm.findOne({ email });
    if (!user) {
      throw new Error("User account does not exist"); // Throw error if user not found
    }

    // Check if password is incorrect
    const isValidPassword = await bcrypt.compare(password, user.password!);
    if (!isValidPassword) {
      throw new Error("Entered password is incorrect");
    }

    // Assign user's ID to generate JWT
    const token = generateToken(String(user._id));
    return { token, user }; // Return signed token and user data
  }
}

export default UserService;
