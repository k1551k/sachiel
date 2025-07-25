import ky from "ky";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import querystring from "querystring";

const BASE_URL = "https://api.upbit.com";

const client = ky.create({
  prefixUrl: BASE_URL,
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
});

export const getAccounts = async () => {
  const payload = {
    access_key: process.env.UPBIT_ACCESS_KEY,
    nonce: uuidv4(),
  };
  const response = await client.get("v1/accounts", {
    headers: {
      Authorization: `Bearer ${jwt.sign(
        payload,
        process.env.UPBIT_SECRET_KEY
      )}`,
    },
  });
  return response.json();
};

export const askKRWDeposit = async (amount) => {
  const param = {
    amount,
    two_factor_type: "kakao",
  };
  const query = querystring.stringify(param);

  const hash = crypto.createHash("sha512");
  const queryHash = hash.update(query, "utf-8").digest("hex");

  const payload = {
    access_key: process.env.UPBIT_ACCESS_KEY,
    nonce: uuidv4(),
    query_hash: queryHash,
    query_hash_alg: "SHA512",
  };

  await client.post("v1/deposits/krw", {
    headers: {
      Authorization: `Bearer ${jwt.sign(
        payload,
        process.env.UPBIT_SECRET_KEY
      )}`,
    },
    json: param,
  });
};
