import express, { Request, Response } from "express";
import { Session } from "express-session";

const router = express.Router();

interface CustomRequest extends Request {
  client?: { authorized?: boolean };
  session: Session & { user?: { username: string } };
}

router.post("/login", (req: CustomRequest, res: Response): void => {
  const { username } = req.body;

  if (!req.client?.authorized) {
    res
      .status(401)
      .json({ message: "Unauthorized: Client certificate required" });
    return;
  }

  req.session.user = { username };

  res.status(200).json({ message: "Login successful" });
});

router.get("/check-auth", (req: CustomRequest, res: Response) => {
  if (!req.session.user) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }
  res.status(200).json({
    isAuthenticated: true,
    user: req.session.user,
  });
});

router.post("/logout", (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }
    res
      .status(200)
      .json({ message: "Logged out successfully", isLoggedOut: true });
  });
});

export default router;
