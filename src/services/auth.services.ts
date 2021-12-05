import { PrismaClient } from "@prisma/client";
import { User } from "../models/user.model";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class AuthService {
  // createUser
  public static async createUser({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }): Promise<User> {
    const user = new User({ email: email, password: password, name: name });
    try {
      await prisma.user.create({
        data: {
          email: user.email,
          password: user.password,
          name: user.name,
          created_at: user.createdAt,
          updated_at: user.updatedAt,
        },
      });
      return user;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  // deleteUser
  public static async deleteUser(id: string): Promise<User> {
    try {
      const _user = await prisma.user.delete({ where: { id: Number(id) } });
      const user = new User({
        name: _user.name,
        email: _user.email,
        password: _user.password,
        createdAt: _user.created_at,
        updatedAt: _user.updated_at,
      });
      return user;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  // updateUser
  public static async updateUser(id: number, data: any): Promise<User> {
    try {
      const _user = await prisma.user.update({
        where: { id: id },
        data: {
          ...data,
          updated_at: new Date(),
        },
      });
      const user = new User({
        name: _user.name,
        email: _user.email,
        password: _user.password,
        createdAt: _user.created_at,
        updatedAt: _user.updated_at,
      });
      return user;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  // generateToken
  public static async generateToken(id: number): Promise<string> {
    try {
      // create token
      const token = jwt.sign({ id: id }, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h",
      });
      return token;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  // verifyToken
  public static async verifyToken(token: string): Promise<string> {
    try {
      const payload: any = jwt.verify(
        token,
        process.env.JWT_SECRET || "secret"
      );
      return payload.id;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  //   findUser by email
  public static async findUserByEmail(email: string): Promise<User | null> {
    try {
      const _user = await prisma.user.findFirst({ where: { email: email } });
      if (!_user) {
        return null;
      }
      const user = new User({
        id: _user.id,
        name: _user.name,
        email: _user.email,
        password: _user.password,
        createdAt: _user.created_at,
        updatedAt: _user.updated_at,
      });
      return user;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  //   findUser by id
  public static async findUserById(id: number): Promise<User | null> {
    try {
      const _user = await prisma.user.findFirst({ where: { id: id } });
      if (!_user) {
        return null;
      }
      const user = new User({
        id: _user.id,
        name: _user.name,
        email: _user.email,
        password: _user.password,
        createdAt: _user.created_at,
        updatedAt: _user.updated_at,
      });
      return user;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
