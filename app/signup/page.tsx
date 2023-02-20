"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const Page = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const profileImage = searchParams.get("profileImage");
  const [nickname, setNickname] = useState("");
  const [nicknameCheck, setNicknameCheck] = useState("");
  const [imageFile, setImageFile] = useState<File>();

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  // 닉네임 중복 여부를 파악해줌
  const handleNicknameCheck = async () => {
    const url = "http://localhost:3000/api/signup/nicknamecheck";
    const { data } = await axios.post(url, {
      nickname,
    });
    const { check } = data;
    if (check) {
      setNicknameCheck("possible");
    } else {
      setNicknameCheck("impossible");
    }
  };

  // 회원 가입 요청이 제출되었을 때 처리해줌
  const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const targetData = new FormData();
    targetData.append("profileImage", imageFile as File);
    targetData.append("email", String(email));
    targetData.append("nickname", String(nickname));

    // 전송
    const url = "http://localhost:3000/api/signup";
    axios.post(url, targetData).then((res) => {
      console.log(res);
    });
  };

  // 사진이 입력되었을 때 처리를 해줌
  const handleImageSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignupSubmit}>
        <section>
          <label htmlFor="signup-email">이메일</label>
          <div id="signup-email">{email}</div>
        </section>
        <section>
          <label htmlFor="signup-nickname">닉네임</label>
          <input
            id="signup-nickname"
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            onBlur={handleNicknameCheck}
          />
          {nicknameCheck === "possible" && <p>사용가능합니다.</p>}
          {nicknameCheck === "impossible" && <p>사용 불가능합니다.</p>}
        </section>
        <section>
          <label htmlFor="signup-profileimage">프로필 이미지</label>
          <input
            id="signup-profileimage"
            type="file"
            accept="image/*"
            onChange={handleImageSubmit}
          />
        </section>
        <button type="submit"> 제출</button>
      </form>
    </div>
  );
};

export default Page;
