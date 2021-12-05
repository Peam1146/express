import { AuthService } from "../services/auth.services";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model";

export class AuthController {
  // login
  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    try {
      const user = await AuthService.findUserByEmail(email);
      if (user == null) {
        return res.status(400).json({
          message: "User not found",
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Invalid credentials",
        });
      }
      const token = await AuthService.generateToken(user.id);
      res.status(200).json({
        message: "Login successful",
        token: token,
        email: user.email,
        name: user.name,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }

  //   register
  public static async register(req: Request, res: Response) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }
    try {
      const user = await AuthService.findUserByEmail(email);
      if (user != null) {
        return res.status(400).json({
          message: "User already exists",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
      const savedUser = await AuthService.createUser({
        email: newUser.email,
        name: newUser.name,
        password: newUser.password,
      });
      return res.status(200).json({
        message: "Registration successful",
        email: savedUser.email,
        name: savedUser.name,
      });
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  }

  //   logout
  public static async logout(req: Request, res: Response) {}

  //   get user
  public static async getUser(req: Request, res: Response) {
    const user = JSON.parse(req.body.user);
    res.status(200).json({
      email: user.email,
      name: user.name,
    });
  }

  public static async refreshToken(req: Request, res: Response) {
    const user = JSON.parse(req.body.user);
    try {
      const newToken = await AuthService.generateToken(user.id);
      res.status(200).json({
        message: "Token refreshed",
        token: newToken,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
}
