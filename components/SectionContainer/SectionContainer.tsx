import Image from "next/image";
import React, { ComponentProps } from "react";

import Container from "../Container/Container";

import styles from "./sectionContainer.module.css";

interface ContainerProps {
  title?: string;
  bgImg?: string;
  titleColor?: string;
  children?: React.ReactNode;
  description?: string;
  centerTitle?: boolean;
  className?: string;
  excludeMaxWidthTitle?: boolean;
  hasTitleWidth?: boolean;
  titleMargin?: boolean;
  alignTitle?: "center" | "left";
  activityPaddingTop?: boolean;
  hasNoRightPadding?: boolean;
}

const SectionContainer: React.FC<ContainerProps> = ({
  title,
  bgImg,
  titleColor = "#151515",
  children,
  description,
  centerTitle = false,
  excludeMaxWidthTitle,
  className,
  hasTitleWidth = false,
  titleMargin,
  alignTitle,
  hasNoRightPadding,
}) => {
  // const containerStyle = {
  //   backgroundImage: bgImg ? `url(${bgImg})` : "none",
  // };

  const titleStyle = {
    color: titleColor,
    textAlign: alignTitle,
  };

  const containerClassName = `${styles.container} ${
    bgImg ? styles.hasBgImg : ""
  } ${className || ""}`;

  const containerHeaderWrapperClassName = `${styles.containerHeaderWrapper} ${
    centerTitle ? `${styles.containerHeaderWrapper} ${styles.centered}` : ""
  } ${titleMargin ? styles.title_margin : ""}`;

  return (
    <section className={containerClassName}>
      {bgImg ? (
        <>
          <Image
            src={bgImg}
            alt="background"
            fill
            sizes="100vw"
            quality={100}
          />
          <Container
            style={`${styles.wrapper} ${
              hasNoRightPadding && styles.noRightPadding
            }`}
          >
            <div className={styles.content}>
              <div className={title && containerHeaderWrapperClassName}>
                {title && (
                  <h2
                    className={`${styles.title} ${
                      excludeMaxWidthTitle && styles.excludeMaxWidthTitle
                    } ${hasTitleWidth && styles.hasTitleWidth}`}
                    style={titleStyle}
                  >
                    {title}
                  </h2>
                )}
                {description && (
                  <>
                    <span className={styles.descLine}></span>
                    <p className={styles.desc}>{description}</p>
                  </>
                )}
              </div>
              {children}
            </div>
          </Container>
        </>
      ) : (
        <Container>
          <div className={title && containerHeaderWrapperClassName}>
            {title && (
              <h2
                className={`${styles.title} ${
                  excludeMaxWidthTitle && styles.excludeMaxWidthTitle
                } ${hasTitleWidth && styles.hasTitleWidth}`}
                style={titleStyle}
              >
                {title}
              </h2>
            )}
            {description && (
              <>
                <span className={styles.descLine}></span>
                <p className={styles.desc}>{description}</p>
              </>
            )}
          </div>
          {children}
        </Container>
      )}
    </section>
  );
};

SectionContainer.displayName = "SectionContainer";

export default SectionContainer;
