'use client'

import Header from "./components/header/header";
import { useGetNewsQuery } from "./core/topHeadlines";
import CustomCard from "./components/custom-card/customCard";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SvgArrow from "./components/Svg/SvgArrow";
import { useEffect, useState } from "react";
import styles from "./styles/page.module.scss";

export default function NewsPage() {
  const { data } = useGetNewsQuery();
  const [canSlidePrev, setCanSlidePrev] = useState(false);
  const [canSlideNext, setCanSlideNext] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

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
        <h2 className={styles.heading}>Top Headlines</h2>
        <div className={styles.wrapper}>
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
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => {
              setCanSlidePrev(!swiper.isBeginning);
              setCanSlideNext(!swiper.isEnd);
            }}
            className={styles.swiper}
          >
            {data?.articles?.map((item, index) => (
              <SwiperSlide key={index}>
                <CustomCard
                  id={item?.source?.id}
                  title={item?.title}
                  author={item?.author}
                  description={item?.description}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            id="id-prev"
            className={`${styles.navButton} ${styles.prev} ${!canSlidePrev ? styles.disabled : ""}`}
          >
            <SvgArrow direction="left" />
          </div>
          <div
            id="id-next"
            className={`${styles.navButton} ${styles.next} ${!canSlideNext ? styles.disabled : ""}`}
          >
            <SvgArrow direction="right" />
          </div>
        </div>
    </>
  );
}
