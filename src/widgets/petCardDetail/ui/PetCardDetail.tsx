import React from "react";
import { useParams } from "react-router-dom";
import styles from "./petCardDetail.module.scss";
import "swiper/css";
import "swiper/css/pagination";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../shared/ui/button";
import { Text } from "../../../shared/ui/text";
import { ReactComponent as GenderFemale } from "../../../shared/assets/gender_female_icon.svg";
import { ReactComponent as GenderMale } from "../../../shared/assets/gender_male_icon.svg";
import { ReactComponent as Like } from "../../../shared/assets/like.svg";
import { ReactComponent as Back } from "../../../shared/assets/back_arrow_icon.svg";
import { ReactComponent as Birthday } from "../../../shared/assets/birthday.svg";
import { ReactComponent as Home } from "../../../shared/assets/home.svg";
import { ReactComponent as ShelterArrow } from "../../../shared/assets/shelter_link_arrow.svg";
import { useGetPetDetailQuery } from "../../../entities/pet";
import { match } from "ts-pattern";
export const PetCardDetail: React.FC = () => {
  let { id } = useParams();
  const { data: pet, isLoading, isError } = useGetPetDetailQuery({ id });
  const navigate = useNavigate();
  return (
    <>
      {match({ isLoading, isError, pet })
        .with({ isLoading: true }, () => <div>Loading...</div>)
        .with({ isError: true }, () => <div>Error: </div>)
        .with({ pet: undefined }, () => <p>No pet available.</p>)
        .otherwise(() => (
          <div className={styles.container}>
            <div className={styles.header}>
              <button
                onClick={() => navigate(-1)}
                className={styles.backButton}
              >
                <Back />
              </button>
              <div className={styles.title}>
                <Text myClass="subtitle" color="white">
                  Рыжуля
                </Text>
              </div>
              <div className={styles.icons}>
                <span className={styles.icon}>
                  {pet.male ? <GenderMale /> : <GenderFemale />}
                </span>
                <span className={styles.icon}>
                  <Like className={styles.like} />
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
                {pet.images?.map((image) => (
                  <SwiperSlide>
                    <div className={styles.slide_container}>
                      <img src={image} alt={image} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className={styles.info}>
              <Swiper
                className="auto-width"
                spaceBetween={10}
                slidesPerView={2}
              >
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
                  Маленького котенка по имени Рыжуля нашли на улице, забитого
                  дождем и голодом. Теперь он находится под нашей опекой,
                  окружен любовью и заботой. Рыжуля ищет свой дом...
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
        ))}
    </>
  );
};
