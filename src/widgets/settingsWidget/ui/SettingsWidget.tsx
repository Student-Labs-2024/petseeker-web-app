import React from "react";
import { userModel } from "@entities/user";
import styles from "./SettingsWidget.module.scss";
import { match } from "ts-pattern";
import { Text } from "@shared/ui/text";
import { Label } from "@shared/ui/label";
import { ReactComponent as LightThemeIcon } from "@shared/assets/settings_light_theme.svg";
import { ReactComponent as DarkThemeIcon } from "@shared/assets/settings_dark_theme.svg";
import { Button } from "@shared/ui/button";
import { NavLink } from "react-router-dom";
import { PROFILE } from "@/app/router/consts";
import { Radio } from "@/shared/ui/radio";

export const SettingsWidget: React.FC = () => {
  return (
    <div className={styles.settings}>
      <div className={styles.settings__top}>
        <div className={styles.settings__text_center}>
          <Text>Настройки </Text>
        </div>
        <button className={styles.settings__ready}>
          <Text>Готово </Text>
        </button>
      </div>
      <div className={styles.settings__region}>
        <Label>
          {" "}
          <Text>Регион для поиска</Text>
        </Label>
        <button className={styles.settings__region_clean}>
          Очистить историю поисков{" "}
        </button>
      </div>
      <div className={styles.settings__styles}>
        <Label>
          <div className={styles.settings__theme_light}>
            <LightThemeIcon />
            <Text>Светлая тема</Text>
          </div>
          {/* <Radio /> */}
        </Label>
        <Label>
          <div className={styles.settings__theme_light}>
            <DarkThemeIcon />
            <Text>Светлая тема</Text>
          </div>
          {/* <Radio /> */}
        </Label>
      </div>
    </div>
  );
};
