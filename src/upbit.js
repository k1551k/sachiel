import ky from "ky";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const BASE_URL = "https://api.upbit.com";

const client = ky.create({
  prefixUrl: BASE_URL,
  headers: {
    accept: "application/json",
  },
});

export const getAccounts = async () => {
  const payload = {
    access_key: process.env.UPBIT_ACCESS_KEY,
    nonce: uuidv4(),
  };
  const response = await client.get("v1/accounts", {
    headers: {
      Authorization: jwt.sign(payload, process.env.UPBIT_SECRET_KEY),
    },
  });
  return response.json();
};
