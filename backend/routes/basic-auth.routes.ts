import express, { Request, Response, NextFunction } from "express";
import basicAuth from "basic-auth"; // Middleware for basic auth

const router = express.Router();

// in-memory user storage 
interface User {
  username: string;
  password: string;
}
const users: User[] = [];


router.post("/signup", (req: Request, res: Response): any => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }


  if (users.some((u) => u.username === username)) {
    return res.status(400).send("User already exists");
  }

  
  users.push({ username, password });
  res.status(201).send("User created successfully");
});


router.post("/signin", (req: Request, res: Response): any => {
  const user = basicAuth(req); // Gets the username and password from the header
  if (!user || !user.name || !user.pass) {
    return res.status(401).send("Authentication required");
  }

  const foundUser = users.find(
    (u) => u.username === user.name && u.password === user.pass
  );
  if (!foundUser) {
    return res.status(401).send("Invalid credentials");
  }

  res.status(200).send("Login successful");
});


const checkAuth = (req: Request, res: Response, next: NextFunction): any => {
  const user = basicAuth(req); // Gets the username and password from the header

  if (!user || !user.name || !user.pass) {
    return res.status(401).send("Authentication required");
  }

  const foundUser = users.find(
    (u) => u.username === user.name && u.password === user.pass
  );
  if (!foundUser) {
    return res.status(401).send("Invalid credentials");
  }

  next();
};

router.get("/checkauth", checkAuth, (req: Request, res: Response): void => {
  res.status(200).send("User is authenticated");
});

router.post("/logout", checkAuth, (req: Request, res: Response): void => {
  res.status(200).send("Logout successful");
});
