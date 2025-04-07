"use client";

import { Key, useEffect, useRef, useState } from "react";
import Header from "app/components/header/header";
import CustomCard from "app/components/customCard/customCard";
import ArrowIcon from "app/assets/ArrowIcon";
import { useGetTopHeadlinesQuery } from "app/core/topHeadlineSlice";
import { useGetAllNewsQuery } from "app/core/allNewsSlice";
import { Navigation } from "swiper/modules";
import { Article } from "app/types/news";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "app/styles/page.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import { PAGE_SIZE } from "app/core/constant";

export default function NewsPage() {
  const { data } = useGetTopHeadlinesQuery();
  const [canSlidePrev, setCanSlidePrev] = useState<boolean>(false);
  const [canSlideNext, setCanSlideNext] = useState<boolean>(true);
  const [swiperInstance, setSwiperInstance] = useState<Swipper>();

  const [page, setPage] = useState(1);
  const [newsList, setNewsList] = useState<Article[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { data: allNewsData, isFetching } = useGetAllNewsQuery({
    page,
    pageSize: PAGE_SIZE,
  });

  useEffect(() => {
    if (allNewsData?.articles.length) {
      setNewsList((prev) => [...prev, ...allNewsData?.articles]);
    }
  }, [allNewsData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isFetching) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 },
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isFetching]);
  
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
          {data?.articles?.map(
            (item: Article, index: Key | null | undefined) => (
              <SwiperSlide key={index}>
                <CustomCard
                  title={item?.title}
                  author={item?.author}
                  description={item?.description}
                  image={item?.urlToImage}
                />
              </SwiperSlide>
            ),
          )}
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
      <div className={styles.all_news_section}>
        <p className={styles.heading}>All News</p>
        <div className={styles.news_card_container}>
          {newsList.map((item: Article, index: number) => (
            <div className={styles.news_card}>
              <CustomCard
                key={index}
                title={item?.title}
                author={item?.author}
                description={item?.description}
                image={item?.urlToImage}
              />
            </div>
          ))}
        </div>
        <div ref={observerRef} style={{ height: 50 }} />
        {isFetching && (
          <p className={styles.loadingText}>Loading more news...</p>
        )}
      </div>
    </>
  );
}
