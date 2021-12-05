import express from "express";

export const check = (req: express.Request, res: express.Response) => {
  console.log(req.body);
  res.status(200).send(req.body);
};
