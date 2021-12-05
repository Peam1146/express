import express from "express";
import { AuthController } from "./controllers/auth.controller";
import { check } from "./controllers/simple.controller";
import { AuthMiddleware } from "./middlewares/auth.middleware";

const app = express();

// allow body parsing
app.use(express.json());

app.get("/", check);
app.post("/login", AuthController.login);
app.post("/register", AuthController.register);

// group authentication routes
app.use("/auth", AuthMiddleware.verifyToken);
app.get("/auth/me", AuthController.getUser);
app.post("/auth/refresh", AuthController.refreshToken);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
