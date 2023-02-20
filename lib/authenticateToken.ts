import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// token 값을 확인해주는 middleware
// token 값이 통과되면 req에 user property 추가하고
// 그 property로 user의 email을 확인할 수 있음
export default function authenticateToken(
  req: NextApiRequest,
  res: NextApiResponse,
  next: any
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // token이 없을 경우 401 error를 return 함
  if (token == null) return res.status(401);

  // token이 있을 경우
  jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET), (err, user) => {
    // token 검증
    if (err) return res.status(403);
    // 검증이 끝나면 req의 user에 user 객체를 넣어줌
    (req as any).user = user;
    next();
  });
}
