import express from "express";
import { askKRWDeposit, getAccounts } from "./upbit.js";

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
  const accounts = await getAccounts()
    .then((data) =>
      data.reduce((acc, el) => {
        if (el.currency === "KRW" || el.balance * el.avg_buy_price > 1) {
          acc.set(el.currency, el.balance);
        }
        return acc;
      }, new Map())
    )
    .then((data) => Object.fromEntries(data));
  res.json(accounts);
});

app.post("/deposits", async (req, res) => {
  const { amount } = req.body;
  await askKRWDeposit(amount);
  res.status(200).json({ message: "Successfully Requested" });
});

app.listen(port, () => {
  console.log(`PORT : ${port}`);
});
