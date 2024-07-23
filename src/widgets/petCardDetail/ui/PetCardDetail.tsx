import React from "react";
import styles from "./petCardDetail.module.scss";
import { MainContainer } from "../../../shared/ui/mainContainer";
import "swiper/css";
import { NavLink } from "react-router-dom";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useNavigate } from 'react-router-dom';
import catImage from "../../../shared/assets/test-cat.svg";
import { Button } from "../../../shared/ui/button";
import { Text } from "../../../shared/ui/text";
import gender from "../../../shared/assets/gender_icon.svg";
import like from "../../../shared/assets/like.svg";
import back from "../../../shared/assets/back_arrow_icon.svg";
import { ReactComponent as Birthday } from "../../../shared/assets/birthday.svg";
import { ReactComponent as Home } from "../../../shared/assets/home.svg";
import { ReactComponent as ShelterArrow } from "../../../shared/assets/shelter_link_arrow.svg";
export const PetCardDetail: React.FC = () => {
    const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => navigate(-1)} className={styles.backButton}>
          <img src={back} alt="" />
        </button>
        <div className={styles.title}>
          <Text myClass="subtitle" color="white">
            Рыжуля
          </Text>
        </div>
        <div className={styles.icons}>
          <span className={styles.icon}>
            <img src={gender} alt="" />
          </span>
          <span className={styles.icon}>
            <img className={styles.like} src={like} alt="" />
          </span>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <span className={styles.status}>
          <Text color="white">В приюте</Text>
        </span>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          modules={[Pagination]}
          pagination={{ clickable: true }}
        >
          <SwiperSlide>
            <div className={styles.slide_container}>
              <img src={catImage} alt="Рыжуля" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.slide_container}>
              <img src={catImage} alt="Рыжуля" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className={styles.slide_container}>
              <img src={catImage} alt="Рыжуля" />
              <span className={styles.status}>
                <Text color="white">В приюте</Text>
              </span>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className={styles.info}>
        <Swiper className="auto-width" spaceBetween={10} slidesPerView={2}>
          <SwiperSlide>
            {" "}
            <div className={styles.navbar__item}>
              <Text myClass="medium" color="white">
                Возраст: <div>1 год</div>
              </Text>
            </div>{" "}
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className={styles.navbar__item}>
              <Text myClass="medium" color="white">
                Порода: <div>Не определено</div>
              </Text>
            </div>{" "}
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className={styles.navbar__item}>
              <Text myClass="medium" color="white">
                Прививки: <div>Есть</div>
              </Text>
            </div>{" "}
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className={styles.navbar__item}>
              <Text myClass="medium" color="white">
                Прививки: <div>Есть</div>
              </Text>
            </div>{" "}
          </SwiperSlide>
        </Swiper>
        <div className={styles.important}>
          <Text myClass="subtitle">Важные даты</Text>
          <div className={styles.important__list}>
            <div className={styles.important__item}>
              <div className={styles.important__icon}>
                <Birthday />
              </div>
              <div className={styles.important__text}>
                <Text myClass="medium">День рождения</Text>
                <Text myClass="medium" color="gray">
                  Неизвестно
                </Text>
              </div>
            </div>
            <div className={styles.important__item}>
              <div className={styles.important__icon}>
                <Home />
              </div>
              <div className={styles.important__text}>
                <Text myClass="medium">День прибытия</Text>
                <Text myClass="medium" color="gray">
                  Неизвестно
                </Text>
              </div>
            </div>
          </div>
        </div>
        <NavLink className={styles.shelter__link} to={"#"}>
          <Text myClass="btn" color="btn">
            Приют Омские хвостики
          </Text>
          <ShelterArrow></ShelterArrow>
        </NavLink>
        <Text myClass="subtitle">Обо мне</Text>
        <div className={styles.text_content}>
          <Text myClass="medium" color="gray">
            Маленького котенка по имени Рыжуля нашли на улице, забитого дождем и
            голодом. Теперь он находится под нашей опекой, окружен любовью и
            заботой. Рыжуля ищет свой дом...
          </Text>
        </div>
        <button className={styles.more}>
          <Text myClass="medium" color="btn">
            Читать больше
          </Text>
        </button>
        <div className={styles.m_top}>
          <Button>Забрать в семью</Button>
        </div>
      </div>
    </div>
  );
};
