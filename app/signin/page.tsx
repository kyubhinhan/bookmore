"use client";

import React from "react";
import styles from "./signin.module.css";

const page = () => {
  return (
    <div className={styles.Container}>
      <section>
        <div className={styles.Word}>
          <strong>로그인</strong> 또는 <strong>회원가입</strong>
        </div>
        <form method="POST" action="/api/signincheck">
          <button className={styles.LoginButton} type="submit" />
        </form>
      </section>
    </div>
  );
};

export default page;
