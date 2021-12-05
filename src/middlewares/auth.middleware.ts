import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
import { AuthService } from "../services/auth.services";

export class AuthMiddleware {
  // jwt verification
  public static async verifyToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "No token provided",
        });
      }
      const id = await AuthService.verifyToken(token);
      const user = await AuthService.findUserById(Number(id));
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }
      req.body.user = user.toJson();
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid token" });
    }
  }
}
