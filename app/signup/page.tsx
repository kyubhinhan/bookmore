"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import styles from "./signup.module.css";
import Nickname from "source/component/signup/Nickname";
import ProfileImage from "source/component/signup/ProfileImage";

const Page = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const profileImage = searchParams.get("profileImage");
  const [nickname, setNickname] = useState("");
  const [nicknameCheck, setNicknameCheck] = useState("");
  const [imageUrl, setImageUrl] = useState(profileImage);
  const [imageFile, setImageFile] = useState<File>();

  // 회원 가입 요청이 제출되었을 때 처리해줌
  const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const targetData = new FormData();
    targetData.append("profileImage", imageFile as File);
    targetData.append("email", String(email));
    targetData.append("nickname", String(nickname));
    if (!imageFile) {
      targetData.append("profileImageUrl", String(profileImage));
    }

    // 전송
    const url = "http://localhost:3000/api/signup";
    axios.post(url, targetData).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className={styles.Container}>
      <form onSubmit={handleSignupSubmit}>
        <div className={styles.Title}>회원 가입</div>
        <Nickname
          nickname={nickname}
          nicknameCheck={nicknameCheck}
          setNickname={setNickname}
          setNicknameCheck={setNicknameCheck}
        />
        <ProfileImage
          imageUrl={imageUrl}
          imageFile={imageFile}
          setImageUrl={setImageUrl}
          setImageFile={setImageFile}
        />
        <button type="submit"> 제출</button>
      </form>
    </div>
  );
};

export default Page;
