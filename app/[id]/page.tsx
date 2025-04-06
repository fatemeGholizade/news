'use client'
import { useSelector } from "react-redux";
import { TRootState } from "../types/store";
import  styles  from "./style/page.module.scss";
export default function IndividualNews() {
  const selectedArticle = useSelector((state: TRootState) => state.article.selectedArticle);

    return (
      <div className={styles.wrapper}>
        <img className={styles.image} width={600} height={500} loading="lazy" src={selectedArticle?.urlToImage || ""} alt="img" />
        <h1>Title: {selectedArticle?.title}</h1>
        <h2>Author: {selectedArticle?.author}</h2>
        <p>description: {selectedArticle?.description}</p>
      </div>
    );
  }
  