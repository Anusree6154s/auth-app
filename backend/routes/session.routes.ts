import express, { Request, Response } from "express";
import { Session } from "express-session";

const router = express.Router();

interface User {
  username: string;
  password: string;
}
interface CustomRequest extends Request {
  session: Session & { user?: { username: string } };
}

// In-memory user database (for simplicity)
const users: User[] = [];

router.post(
  "/signup",
  async (req: CustomRequest, res: Response): Promise<void> => {
    const { username } = req.body;

    if (!username) {
      res.status(400).json({ message: "Username is required" });
      return;
    }

    // Check if user already exists
    if (users.some((u) => u.username === username)) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    req.session.user = username;

    res.status(201).json({ message: "User created successfully" });
  }
);

// check existence of the session
router.get("/check-auth", (req: CustomRequest, res: Response): void => {
  if (!req.session.user) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }
  res
    .status(200)
    .json({ message: "User is authenticated", isAuthenticated: true });
});

// Logout route: Destroy the session
router.get("/logout", (req: CustomRequest, res: Response): void => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: "Failed to log out" });
      return;
    }
    res.status(200).json({ message: "Logout successful", isLoggedOut: true });
  });
});

export default router;
