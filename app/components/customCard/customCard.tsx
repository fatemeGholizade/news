"use client";

import { CardProps } from "app/components/customCard/types/card";
import styles from "app/components/customCard/customCard.module.scss";
import Image from "next/image";

export default function CustomCard({
  title,
  author,
  image,
  description,
}: CardProps) {
  return (
    <div className={styles.card}>
      {image !== null && (
        <Image
          width="290"
          height="200"
          className={styles.image}
          loading="lazy"
          src={image}
          alt={"image"}
        />
      )}
      <p className={styles.title}>{title}</p>
      <p className={styles.author}>{author}</p>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
