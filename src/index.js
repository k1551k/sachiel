import express from "express";
import { getAccounts } from "./upbit.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_, res) => {
  res.send("HEALTH CHECK 😀");
});

// API Key CHECK
app.use((req, res, next) => {
  if (req.headers["authorization"] !== `${process.env.API_KEY}`) {
    return res.status(401).send("Unauthorized");
  }
  next();
});

app.get("/accounts", async (_, res) => {
  const accounts = await getAccounts();
  res.json(accounts);
});

app.listen(port, () => {
  console.log(`PORT : ${port}`);
});
