"use client";

import React from "react";
import styles from "./signin.module.css";

const page = () => {
  return (
    <div className={styles.Container}>
      <form method="POST" action="/api/signincheck">
        <button type="submit">카카오 로그인</button>
      </form>
    </div>
  );
};

export default page;
