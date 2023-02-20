import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import multerS3 from "multer-s3";
import nextConnect from "next-connect";
import { S3Client } from "@aws-sdk/client-s3";
import prisma from "lib/prisma";
import dotenv from "dotenv";
dotenv.config();

// s3 버킷에 대한 정보를 설정해줌
const s3 = new S3Client({
  credentials: {
    accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
  },
  region: "ap-northeast-2",
});

// multerS3를 사용하여 S3에 접근하는 미들웨어를 multer를 이용하여 만들어줌
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "bookmore-image",
    key: (req, file, callback) => {
      callback(null, `${file.originalname}-${Date.now().toString()}`);
    },
  }),
});

// 미들웨어를 사용하기 위해 next-connect를 사용함
const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// 만들어준 미들웨어를 추가해줌
apiRoute.use(upload.single("profileImage"));

// 회원 가입 처리
apiRoute.post(async (req, res) => {
  // 이메일, 닉네임, 프로필 이미지 경로를 받음
  const { email, nickname, profileImageUrl } = req.body;
  const profileImageLocation = (req as any).file?.location;
  const profileImage =
    profileImageUrl === undefined ? profileImageLocation : profileImageUrl;

  // 서비스에 유저 정보를 추가해줌
  const user = await prisma.user.create({
    data: {
      email,
      nickname,
      profileImage,
    },
  });

  // 성공했다는 메시지를 주고 user 정보를 리턴함
  res.status(200).json({ user });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
