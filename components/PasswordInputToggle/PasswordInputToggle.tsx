"use client";
import Image from "next/image";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { FieldError } from "react-hook-form/dist/types";

import eye from "@/public/images/adminInputs/eye.svg";
import eyeOff from "@/public/images/adminInputs/eyeOff.svg";

import styles from "./PasswordInputToggle.module.css";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: FieldError | undefined;
  errorMessage?: string;
}

const PasswordInputToggle = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ error, errorMessage, ...inputProps }, ref) => {
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);

    const handleToggle = () => {
      if (type === "password") {
        setIcon(eye);
        setType("text");
      } else {
        setIcon(eyeOff);
        setType("password");
      }
    };

    return (
      <div className={styles.input__container}>
        <label className={styles.label__psw} htmlFor="psw">
          Пароль
        </label>
        <input
          id="psw"
          className={styles.input}
          type={type}
          placeholder="Введіть пароль"
          ref={ref}
          {...inputProps}
        />
        <span className={styles.eye} onClick={handleToggle}>
          <Image width={30} height={18} src={icon} alt="eye" />
        </span>
        {error && <p className={styles.error}>{errorMessage}</p>}
      </div>
    );
  }
);

PasswordInputToggle.displayName = "PasswordInputToggle";

export default PasswordInputToggle;
