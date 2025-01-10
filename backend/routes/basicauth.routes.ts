import express, { Request, Response, NextFunction } from "express";
import basicAuth from "basic-auth"; 
import { Session } from "express-session";

const router = express.Router();

// in-memory user storage
interface User {
  username: string;
  password: string;
}
const users: User[] = [];

interface CustomRequest extends Request {
  session: Session & { user?: { username: string; password: string } };
}

router.post("/signup", (req: CustomRequest, res: any): any => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  if (users.some((u) => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }

  users.push({ username, password });
  req.session.user = { username, password };
  res.status(201).json({ message: "User created successfully" });
});

const checkAuth = (req: Request, res: Response, next: NextFunction): any => {
  const user = basicAuth(req); // Gets the username and password from the header

  if (!user || !user.name || !user.pass) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const foundUser = users.find(
    (u) => u.username === user.name && u.password === user.pass
  );
  if (!foundUser) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  next();
};

router.get(
  "/check-auth",
  checkAuth,
  (req: CustomRequest, res: Response): void => {
    res.status(200).json({
      message: "User is authenticated",
      isAuthenticated: req.session?.user ? true : false,
    });
  }
);

router.get("/logout", checkAuth, (req: Request, res: Response): void => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: "Could not log out" });
    }

    res.clearCookie("connect.sid"); // Clear session cookie
    res.status(200).json({ message: "Logout successful", isLoggedOut: true });
  });
});

export default router;
