const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("HEALTH CHECK 😀");
});

app.listen(port, () => {
  console.log(`PORT : ${port}`);
});
