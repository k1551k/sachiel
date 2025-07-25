const express = require("express");

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

app.get("/accounts", (req, res) => {
  res.send("ACCOUNTS ENDPOINT 😀");
});

app.listen(port, () => {
  console.log(`PORT : ${port}`);
});
