'use client';

import { ICardlProps } from "./types/card";
import styles from "./customCard.module.scss";

export default function CustomCard({ id, title, author, description }: ICardlProps) {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      <p className={styles.author}>{author}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
