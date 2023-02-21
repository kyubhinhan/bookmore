import React from "react";
import styles from "./profileImage.module.css";
import Image from "next/image";

const ProfileImage = ({
  imageUrl,
  imageFile,
  setImageUrl,
  setImageFile,
}: ProfileImagePropType) => {
  // 사진이 입력되었을 때 처리를 해줌
  const handleImageSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <section className={styles.Container}>
      <label htmlFor="signup-profileimage">프로필 이미지</label>
      <input
        id="signup-profileimage"
        type="file"
        accept="image/*"
        onChange={handleImageSubmit}
      />
      <div className={styles.ImageHolder}>
        <Image src={String(imageUrl)} fill alt="프로필 이미지" />
      </div>
    </section>
  );
};

export default ProfileImage;

interface ProfileImagePropType {
  imageUrl: string | null;
  imageFile: File | undefined;
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}
