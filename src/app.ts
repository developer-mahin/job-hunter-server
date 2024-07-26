import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: "Welcome To The Blood Donation Server",
  });
});


// app.use()


export default app;
