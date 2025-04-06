"use client";

import { CardProps } from "app/components/customCard/types/card";
import styles from "app/components/customCard/customCard.module.scss";

export default function CustomCard({
  title,
  author,
  image,
  description,
}: CardProps) {
  return (
    <div className={styles.card}>
      <img loading="lazy" src={image || ""} />
      <p className={styles.title}>{title}</p>
      <p className={styles.author}>{author}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
}