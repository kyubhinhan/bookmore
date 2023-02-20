import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import multerS3 from "multer-s3";
import nextConnect from "next-connect";
import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();

// AWS Bucket setting
const s3 = new S3Client({
  credentials: {
    accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
  },
  region: "ap-northeast-2",
});

// Returns a Multer instance that provides several methods for generating
// middleware that process files uploaded in multipart/form-data format.
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "bookmore-image",
    key: (req, file, callback) => {
      callback(null, Date.now().toString());
    },
  }),
});

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

// Adds the middleware to Next-Connect
apiRoute.use(upload.single("profileImage"));

// Process a POST request
apiRoute.post((req, res) => {
  console.log(req.body);
  console.log((req as any).file);
  res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
