import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

// 닉네임을 검사하여 중복이 있는지 파악해줌
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // nickname 추출함
    const { nickname } = req.body;

    // db에서 중복되는지 파악함
    const result = await prisma.user.findUnique({
      where: {
        nickname,
      },
    });

    // 중복이 없을 경우
    if (!result) {
      res.status(200).json({ check: true });
    } else {
      // 중복이 있을 경우
      res.status(200).json({ check: false });
    }
  } else {
    res.status(400).json({ error: "잘못된 접근입니다." });
  }
}
