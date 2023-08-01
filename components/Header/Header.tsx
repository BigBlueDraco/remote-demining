"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import btn_close_burger from "@/public/images/icons/header/btn_close_burger.svg";
import burger_menu from "@/public/images/icons/header/burger_menu.svg";

import Button from "../Button/Button";
import Container from "../Container/Container";

import HeaderLogo from "./HeaderLogo/HeaderLogo";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import LanguageMenu from "./LanguageMenu/LanguageMenu";
import MobileMenu from "./MobileMenu/MobileMenu";

import styles from "./Header.module.css";

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };
  const pathname = usePathname();
  const contentBox = `${styles.box} ${isOpenMenu ? styles.bottom_border : ""}`;
  return (
    <header className={styles.header}>
      <Container>
        <div className={contentBox}>
          <HeaderLogo />
          {pathname !== '/admin' && <HeaderMenu />}
          <div className={styles.box}>
            <LanguageMenu />
            <Button>Підтримати</Button>
            {pathname !== '/admin' &&  <button className={styles.btn_menu} onClick={toggleMenu}>
              <Image
                className={styles.burger_icon}
                src={isOpenMenu ? btn_close_burger : burger_menu}
                alt="burger_icon"
                width={27}
                height={30}
              ></Image>
            </button>}
          </div>
        </div>
        {isOpenMenu && pathname !== '/admin' && (
          <MobileMenu isOpenMenu={isOpenMenu} toggleMenu={toggleMenu} />
        )}
      </Container>
    </header>
  );
};

export default Header;
