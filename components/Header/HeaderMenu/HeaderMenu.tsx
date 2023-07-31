import { MouseEventHandler } from "react";

import NavLink from "../../NavLink/NavLink";

import styles from "./HeaderMenu.module.css";

interface HeaderMenuProps {
  isOpenMenu?: boolean;
  isMobile?: boolean;
  toggleMenu?: () => void;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({
  isOpenMenu = false,
  isMobile = false,
  toggleMenu,
}: HeaderMenuProps) => {
  const menuWrapperStyle = `${styles.menu_wrapper} ${
    isOpenMenu ? styles.openMenu : ""
  } ${isMobile ? styles.mobile : ""}`;
 

  const handleMenuItemClick: MouseEventHandler<HTMLLIElement> = (): void => {
    if (isMobile) {
      toggleMenu && toggleMenu();
    }
  };

  return (
    <nav className={menuWrapperStyle}>
      <ul className={styles.menu_list}>
        <li className={styles.menu_item} onClick={handleMenuItemClick}>
          <NavLink href="/about">Про нас</NavLink>
        </li>
        <li className={styles.menu_item} onClick={handleMenuItemClick}>
          <NavLink href="#">Наукова діяльність</NavLink>
        </li>
        <li className={styles.menu_item} onClick={handleMenuItemClick}>
          <NavLink href="/socrat">Дистанційне розмінування</NavLink>
        </li>
        <li className={styles.menu_item} onClick={handleMenuItemClick}>
          <NavLink href="/contacts">Контакти</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderMenu;
