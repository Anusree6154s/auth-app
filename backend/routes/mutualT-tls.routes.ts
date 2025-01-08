// import express, { Request, Response } from "express";

// const router = express.Router();

// // TODO: fix client error:"Property 'client' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.ts(2339)"
// router.get("/", (req: Request, res: Response): void => {
//   if (req.client?.authorized) {
//     res.status(200).send("Hello, Mutual TLS Client!");
//   } else {
//     res.status(401).send("Unauthorized");
//   }
// });

// export default router;
