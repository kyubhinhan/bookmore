"use client";

import React from "react";
import styles from "./signin.module.css";

const page = () => {
  const handleLoginButtonClick = () => {
    console.log("hi");
  };

  return (
    <div className={styles.Container}>
      <button className={styles.LoginButton} onClick={handleLoginButtonClick}>
        카카오 로그인
      </button>
    </div>
  );
};

export default page;
