import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import prisma from "lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  if (code) {
    const url = "https://kauth.kakao.com/oauth/token";
    try {
      // 카카오 토큰 받기
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
      const infoResult = await axios.post(
        "https://kapi.kakao.com/v2/user/me",
        null,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      const email = infoResult.data.kakao_account.email;
      const profileImage = infoResult.data.properties.profile_image;

      // 이메일을 사용하여 서비스에 등록된 사용자인지 확인
      const result = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      // 서비스에 등록되지 않은 사용자일 때
      // email을 queryparam으로 signup 페이지로 redirect 시켜줌
      // profile image 또한 query param으로 넘겨줌
      if (result == null) {
        const redirectUrl = `http://localhost:3000/signup?email=${email}&profileImage=${profileImage}`;
        res.redirect(307, redirectUrl);
      }

      // 서비스에 등록된 사용자일 때
      // accesstoken과 refreshtoken을 발급해줌
      res.status(200).json({ type: "회원가입이 되어 있습니다." });
    } catch (logerr) {
      res.status(200).json({ error: logerr });
    }
  } else {
    res.status(200).json({ error: "code가 없습니다." });
  }
}
