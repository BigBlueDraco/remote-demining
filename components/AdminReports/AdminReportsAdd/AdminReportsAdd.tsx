"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AdminWrapper from "@/components/AdminWrapper/AdminWrapper";
import Breadcrumb, { CrumbItem } from "@/components/Breadcrumb/Breadcrumb";
import Button from "@/components/Button/Button";
import { createReports } from "@/lib/admin/content";
import pencil from "@/public/images/adminInputs/pen.svg";
import download from "@/public/images/icons/admin/download.svg";
import trash from "@/public/images/icons/admin/trash.svg";

import reportsValidate from "./reportsValidate";

import styles from "./AdminReportsAdd.module.css";

const items: CrumbItem[] = [
  { label: "Звітність", path: "/admin/reports" },
  { label: "Додати звітність", path: "/admin/reports/edit" },
];

export interface ReportsI {
  report: File | null;
}

const AdminReportsAdd = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ReportsI>({
    defaultValues: {
      report: null,
    },
    resolver: yupResolver(reportsValidate) as any,
  });

  const onSubmit = async (data: { report: File | null }) => {
    const file = data.report;
    if (file) {
      console.log(file);
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (typeof event.target?.result === "string") {
          const base64Data = event.target.result.split(",")[1];
          console.log(base64Data);
          try {
            await createReports(base64Data);
          } catch (error) {
            console.log(error);
          }
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className={styles.heading_container}>
        <Breadcrumb items={items} />
      </div>
      <AdminWrapper size="bigWrapper">
        <div className={styles.delete_container}>
          <Image src={pencil} alt="Олівець" width={27} height={27} />
          <Image
            src={trash}
            alt="Декоративна корзина для сміття"
            width={27}
            height={27}
          />
        </div>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <label className={styles.wrapper} htmlFor="reports">
            <input
              className={styles.input}
              type="file"
              id="reports"
              accept=".pdf"
              {...register("report")}
            />
            <div>
              <Image
                className={styles.icon}
                src={download}
                width={24}
                height={24}
                alt="Іконка завантаження"
              />
              <span className={styles.title}>Завантажити документ</span>
            </div>
          </label>
          {errors.report && (
            <p className={styles.error}>{errors.report?.message}</p>
          )}
          <div className={styles.btn_send_container}>
            <Button type="submit">Надіслати</Button>
          </div>
        </form>
      </AdminWrapper>
    </div>
  );
};

export default AdminReportsAdd;
