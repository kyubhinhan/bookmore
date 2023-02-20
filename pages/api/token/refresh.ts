import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "lib/prisma";
dotenv.config();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // refreshToken을 이용하여 accesstoken을 재발급해줌
  if (req.method === "POST") {
    // body에서 refreshToken을 추출함
    const { refreshToken } = req.body;
    // body에서 보내준 refreshToken이 없으면 에러 처리함
    if (refreshToken == null) return res.status(401);

    // user db에서 해당 refreshToken을 검색함
    const result = await prisma.user.findUnique({
      where: {
        refreshToken: String(refreshToken),
      },
    });
    const storedRefreshToken = result?.refreshToken;
    // 저장된 refreshToken이 없으면 에러 처리함
    if (storedRefreshToken == null) return res.status(403);
    // refreshToken을 검증함
    jwt.verify(
      storedRefreshToken,
      String(process.env.REFRESH_TOKEN_SECRET),
      (err, user) => {
        if (err) return res.status(403);
        // accessToken을 재발급하고 이를 return해줌
        const accessToken = jwt.sign(
          { email: (user as any).email },
          String(process.env.ACCESS_TOKEN_SECRET),
          { expiresIn: "15s" }
        );
        return res.status(200).json({
          accessToken,
        });
      }
    );
  }
  // refresh token을 삭제해줌
  if (req.method === "DELETE") {
    // body에서 refreshToken을 추출함
    const { refreshToken } = req.body;
    // 해당되는 refreshtoken을 찾아서 지워줌
    const updateUser = await prisma.user.update({
      where: {
        refreshToken,
      },
      data: {
        refreshToken: "",
      },
    });

    return res.status(204).json({ user: updateUser });
  }
}
