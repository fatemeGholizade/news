'use client'

import { useEffect, useState } from "react";
import Header from "@/components/header/header";
import CustomCard from "@/components/customCard/customCard";
import ArrowIcon from "@/assets/ArrowIcon";
import { useGetNewsQuery } from "@/core/newsSlice";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "@/styles/page.module.scss";
import "swiper/css";
import "swiper/css/navigation";

export default function NewsPage() {
  const { data } = useGetNewsQuery();
  const [canSlidePrev, setCanSlidePrev] = useState<boolean>(false);
  const [canSlideNext, setCanSlideNext] = useState<boolean>(true);
  const [swiperInstance, setSwiperInstance] = useState<Swipper>();

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.params.navigation.prevEl = "#id-prev";
      swiperInstance.params.navigation.nextEl = "#id-next";
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <p className={styles.heading}>Top Headlines</p>
        <Swiper
          modules={[Navigation]}
          spaceBetween={25}
          slidesPerView={4}
          breakpoints={{
            280: { slidesPerView: 1 },
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
            1340: { slidesPerView: 4 },
          }}
          speed={500}
          keyboard={{ enabled: true }}
          pagination={{ clickable: true }}
          navigation={{
            prevEl: "#id-prev",
            nextEl: "#id-next",
          }}
          onSwiper={() => setSwiperInstance}
          onSlideChange={(swiper) => {
            setCanSlidePrev(!swiper.isBeginning);
            setCanSlideNext(!swiper.isEnd);
          }}
        >
          {data?.articles?.map((item, index) => (
            <SwiperSlide key={index}>
              <CustomCard
                title={item?.title}
                author={item?.author}
                description={item?.description}
                image = {item?.urlToImage}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          id="id-prev"
          className={`${styles.navButton} ${styles.prev} ${!canSlidePrev ? styles.disabled : ""}`}
        >
          <ArrowIcon direction="left" />
        </div>
        <div
          id="id-next"
          className={`${styles.navButton} ${styles.next} ${!canSlideNext ? styles.disabled : ""}`}
        >
          <ArrowIcon direction="right" />
        </div>
      </div>
      
    </>
  );
}
