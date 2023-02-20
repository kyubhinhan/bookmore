import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// accessToken과 refreshToken을 발급하여 return함
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // body에서 email을 추출하여 user object에 넣어줌
    const { email } = req.body;
    const user = {
      email,
    };

    // accesstoken과 refreshtoken을 발급받음
    const accesstoken = jwt.sign(
      user,
      String(process.env.ACCESS_TOKEN_SECRET),
      { expiresIn: "15s" }
    );
    const refreshtoken = jwt.sign(
      user,
      String(process.env.REFRESH_TOKEN_SECRET)
    );

    // 발급 받은 token을 return함
    res.status(200).json({
      accesstoken,
      refreshtoken,
    });
  } else {
    res.status(400).json({ data: "잘못된 접근입니다." });
  }
}
