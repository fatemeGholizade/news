"use client";
import { useSelector } from "react-redux";
import { RootState } from "app/types/store";
import styles from "app/[id]/style/page.module.scss";
import Image from "next/image";
export default function IndividualNews() {
  const selectedArticle = useSelector(
    (state: RootState) => state.article.selectedArticle,
  );
  return (
    <div className={styles.wrapper}>
      {selectedArticle?.urlToImage !== null &&
        selectedArticle?.urlToImage !== undefined && (
          <Image
            width="290"
            height="200"
            className={styles.image}
            loading="lazy"
            src={selectedArticle?.urlToImage}
            alt={"image"}
          />
        )}{" "}
      <h1>Title: {selectedArticle?.title}</h1>
      <h2>Author: {selectedArticle?.author}</h2>
      <p>description: {selectedArticle?.description}</p>
    </div>
  );
}
