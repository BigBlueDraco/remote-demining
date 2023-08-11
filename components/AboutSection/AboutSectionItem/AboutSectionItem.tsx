
import Image from "next/image";

import styles from "./aboutSectionItem.module.css";

interface AboutSectionItemProps {
  text: string;
  img: string;
}

const AboutSectionItem: React.FC<AboutSectionItemProps> = ({ img, text }) => {
  return (
    <li className={styles.aboutItem}>
      <div className={styles.contentWrapper}>
        <div className={styles.img_container}>
          <Image className={styles.img} src={img} alt="About us" fill/>
        </div>
        <div className={styles.imgDescription}>
          <p className={styles.text}>{text}</p>
        </div>
      </div>
    </li>
  );
};

export default AboutSectionItem;
