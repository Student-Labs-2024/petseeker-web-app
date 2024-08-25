import { MainContainer } from "@/shared/ui/mainContainer";
import React from "react";

import { userModel } from "@entities/user";
import styles from "./profileInfo.module.scss";
import { ReactComponent as RaitingStarIcon } from "@shared/assets/raiting_star_icon.svg";
import { Text } from "@shared/ui/text";
export const Feedbacks = () => {
  const totalStars = 5;
  const stars = 3;
  const { data: feedbacks = [] } = userModel.useGetFeedbacksQuery();
  return (
    <MainContainer>
      <div className="feedback">
        <div className="feedback__top">
          <Text>Отзывы</Text>
        </div>

        <div className="feedback__content">
          <div className={styles.profile__rating}>
            <Text myClass="bold_medium_big">5.0</Text>
            <div className={styles.profile__stars}>
              {[...Array(totalStars)].map((_, index) => (
                <span
                  key={index}
                  className={index < stars ? styles.active : styles.inactive}
                >
                  <RaitingStarIcon />
                </span>
              ))}
            </div>
            <div>
              {feedbacks.map((item) => (
                <div>
                  {item.title}
                  <div className={styles.raiting}>{item.raiting}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainContainer>
  );
};
