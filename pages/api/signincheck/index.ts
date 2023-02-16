import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url =
    "https://kauth.kakao.com/oauth/authorize?client_id=2043452302249c7269592239e1afa2d5&redirect_uri=http://localhost:3000/api/signincheck/callback&response_type=code";
  if (req.method === "POST") {
    res.redirect(307, url);
  } else {
    res.redirect(307, "http://localhost:3000");
  }
}
