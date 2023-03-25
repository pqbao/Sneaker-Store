import React from "react";
import Card from "../card/Card";
import styles from "./InfoBox.module.scss";

const InfoBox = ({ cardClass, title, count, icon }) => {
  return (
    <div className={styles["info-box"]}>
      <Card cardClass={cardClass}>
        <div className={styles.icon}>{icon}</div>
        <span>
          <h3>{count}</h3>
        </span>
        <h4>{title}</h4>
      </Card>
    </div>
  );
};

export default InfoBox;
