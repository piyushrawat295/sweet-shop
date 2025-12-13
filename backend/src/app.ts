import express from "express";
import cors from "cors";
import routes from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/ping", (req, res) => {
  res.send("pong");
});
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});


app.use("/api", routes);
app.use(errorMiddleware);

export default app;
