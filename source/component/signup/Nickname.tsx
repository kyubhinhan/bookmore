import React from "react";
import axios from "axios";
import styles from "./nickname.module.css";

const Nickname = ({
  nickname,
  nicknameCheck,
  setNickname,
  setNicknameCheck,
}: NicknamePropType) => {
  // 닉네임이 변경되었을 때 그 값을 변경해줌
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (nicknameCheck !== "") {
      setNicknameCheck("");
    }
  };

  // 서버로 닉네임의 중복 여부를 파악해줌
  const handleNicknameCheck = async () => {
    if (nickname === "") return;
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
  return (
    <section className={styles.Container}>
      <label htmlFor="signup-nickname">닉네임</label>
      <input
        id="signup-nickname"
        type="text"
        value={nickname}
        onChange={handleNicknameChange}
        onBlur={handleNicknameCheck}
        className={styles[nicknameCheck]}
      />
      <div className={`${styles.Info} ${styles[nicknameCheck]}`}>
        {nicknameCheck === "possible" && <p>사용가능합니다.</p>}
        {nicknameCheck === "impossible" && <p>중복된 닉네임입니다.</p>}
      </div>
    </section>
  );
};

export default Nickname;

interface NicknamePropType {
  nickname: string;
  nicknameCheck: string;
  setNickname: React.Dispatch<React.SetStateAction<string>>;
  setNicknameCheck: React.Dispatch<React.SetStateAction<string>>;
}
