"use client";
import { redirect } from "next/navigation";
import { FC, useEffect } from "react";
import { useReadLocalStorage } from "usehooks-ts";

import "react-toastify/dist/ReactToastify.css";
import AdminNavBar from "@/components/AdminNavBar/AdminNavBar";
import { ToastContainer } from "react-toastify";

import styles from "./layout.module.css";

const LoggedInLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = useReadLocalStorage("token");

  useEffect(() => {
    if (!token) {
      redirect("/admin");
    }
  }, [token]);

  return (
    <div className={styles.pageWrapper}>
      <AdminNavBar />
      {children}
      <ToastContainer />
    </div>
  );
};

export default LoggedInLayout;
