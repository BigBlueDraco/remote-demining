"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useToggle } from "usehooks-ts";
import axios from "axios";

import passwordChange from "@/lib/admin/passwordChange";

import AdminWrapper from "../AdminWrapper/AdminWrapper";
import AutorizationInput from "../AutorizationInput/AutorizationInput";
import Button from "../Button/Button";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import Modal from "../Modal/Modal";

import validationSchema from "./validation";

import styles from "./AdminPasswordChangePage.module.css";

interface PasswordChangeFormValues {
  password: string;
  confirmPassword: string;
}

const AdminPasswordChangePage: FC = () => {
  const [isSuccessModalOpen, toggleSuccessModalOpen] = useToggle(false);
  const router = useRouter();

  const closeModal = () => {
    toggleSuccessModalOpen();
    router.push("/admin/");
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    setValue,
  } = useForm<PasswordChangeFormValues>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ password, confirmPassword }: PasswordChangeFormValues) => {
    if (isValid) {
      try {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!-_)(.,])[A-Za-z0-9!-_)(.,]{8,}$/;
        if (!passwordRegex.test(password)) {
          setError("password", {
            type: "manual",
            message:
              "Новий пароль може використовувати великі і маленькі літери латинського алфавіту, спеціальні знаки типу !-_)(., та цифри від 0 до 9",
          });
          return;
        }

        await passwordChange(password, confirmPassword);
        await toggleSuccessModalOpen();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (
            error.response?.status === 404 ||
            error.response?.status === 401
          ) {
            setError("password", {
              type: "custom",
              message: "Помилка валідації",
            });
            setError("confirmPassword", {
              type: "custom",
              message: "Помилка валідації",
            });
          }
          if (error.response?.status === 500) {
            setError("password", {
              type: "custom",
              message: "Упс... щось пішло не так",
            });
            setError("confirmPassword", {
              type: "custom",
              message: "Упс... щось пішло не так",
            });
          }
          setValue("password", "");
          setValue("confirmPassword", "");
        }
      }
    }
  };

  return (
    <section className={styles.section}>
      <AdminWrapper size="smallWrapper" classname={styles.wrapper}>
        <h3 className={styles.heading}>Змінити пароль</h3>
        <form
          className={styles.form}
          id="password-change-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className={styles.inputWrapper}>
            <AutorizationInput
              label="Введіть новий пароль*"
              type="password"
              errorMessage={errors.password?.message}
              error={errors.password}
              {...register("password")}
            />
            <AutorizationInput
              label="Підтвердіть новий пароль*"
              type="password"
              errorMessage={errors.confirmPassword?.message}
              error={errors.confirmPassword}
              {...register("confirmPassword")}
            />
          </div>
          <Button isFullWidth type="submit">
            Надіслати
          </Button>
        </form>
      </AdminWrapper>
      {isSuccessModalOpen && (
        <div className={styles.modal}>
          <Modal isModalOpen={isSuccessModalOpen} toggleModal={closeModal}>
          <ConfirmationModal
            message="Пароль успішно змінено"
          />
        </Modal>
        </div>
      )}
    </section>
  );
};

export default AdminPasswordChangePage;
