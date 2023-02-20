import type { NextApiRequest, NextApiResponse } from "next";
import dotenv from "dotenv";

dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REST_API_KEY}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`;
  if (req.method === "POST") {
    res.redirect(307, url);
  } else {
    res.redirect(307, "http://localhost:3000");
  }
}
