import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;
  let err;

  if (code) {
    const url = "https://kauth.kakao.com/oauth/token";
    try {
      // 토큰 받기
      const { data } = await axios.post(url, null, {
        params: {
          grant_type: "authorization_code",
          client_id: "2043452302249c7269592239e1afa2d5",
          redirect_uri: "http://localhost:3000/api/signincheck/callback",
          code,
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const { access_token, refresh_token } = data;

      // 사용자 정보 조회하기(이메일이랑 프로필 이미지 검색)
      const res = await axios.post("https://kapi.kakao.com/v2/user/me", null, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const email = res.data.kakao_account.email;
      const profileImage = res.data.properties.profile_image;
    } catch (logerr) {
      err = logerr;
    }
  }

  res.status(200).json({ err });
}
