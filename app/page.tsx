"use client";

import { Key, useEffect, useRef, useState } from "react";
import Header from "app/components/header/header";
import CustomCard from "app/components/customCard/customCard";
import ArrowIcon from "app/assets/ArrowIcon";
import { useGetTopHeadlinesQuery } from "app/core/topHeadlinesSlice";
import { useGetAllNewsQuery } from "app/core/allNewsSlice";
import { Navigation } from "swiper/modules";
import { Article } from "app/types/news";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "app/styles/page.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import { PAGE_SIZE } from "app/core/constants";

export default function NewsPage() {
  const { data } = useGetTopHeadlinesQuery();
  const [canSlidePrev, setCanSlidePrev] = useState<boolean>(false);
  const [canSlideNext, setCanSlideNext] = useState<boolean>(true);
  const [swiperInstance, setSwiperInstance] = useState<Swipper>();
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
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
    if (swiperInstance) {
      swiperInstance.params.navigation.prevEl = "#id-prev";
      swiperInstance.params.navigation.nextEl = "#id-next";
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  useEffect(() => {
    setHydrated(true);
  }, []);

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

  if (!hydrated) {
    return null;
  }

  if (!hydrated) {
    return null;
  }

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
          className={`${styles.nav_button} ${styles.prev} ${!canSlidePrev ? styles.disabled : ""}`}
        >
          <ArrowIcon direction="left" />
        </div>
        <div
          id="id-next"
          className={`${styles.nav_button} ${styles.next} ${!canSlideNext ? styles.disabled : ""}`}
        >
          <ArrowIcon direction="right" />
        </div>
      </div>
      <div className={styles.all_news_section}>
        <h2 className={styles.heading}>All News</h2>
        <div className={styles.news_card_container}>
          {newsList.map((item: Article, index: number) => (
            <div key={index} className={styles.news_card}>
              <CustomCard
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
          <h2 className={styles.loadingText}>Loading more news...</h2>
        )}
      </div>
    </>
  );
}
