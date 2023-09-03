"use client";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";
import { useToggle } from "usehooks-ts";

import Button from "@/components/Button/Button";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import Modal from "@/components/Modal/Modal";
import { deleteSlider } from "@/lib/admin/slider";
import add_icon from "@/public/images/icons/buttons/add.svg";

import { AdminSliderData } from "../AdminSlider";

import styles from "./AdminSlidersList.module.css";

interface AdminSlidersListProps {
  sliderData?: AdminSliderData[];
  handleEditSlider: ({}: AdminSliderData) => void;
  handleDeleteSlider: () => void;
}

const AdminSlidersList: React.FC<AdminSlidersListProps> = ({
  sliderData,
  handleEditSlider,
  handleDeleteSlider,
}) => {
  const [confDelModal, toggleDelModal] = useToggle(false);
  const [successModal, toggleSuccessModal] = useToggle(false);
  const [sliderId, setSliderId] = useState("");
  const deleteSliderHandler = async () => {
    try {
      await deleteSlider(sliderId);
      await toggleSuccessModal();
      await setSliderId("");
      await toggleDelModal();
      await handleDeleteSlider();
    } catch (error) {
      console.log(error);
      toast.error("Упс..., щось пішло не так!");
    }
  };
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {sliderData &&
          sliderData.map(({ id, img, title, text }) => (
            <li key={id} className={styles.card}>
              <div
                onClick={() => {
                  handleEditSlider({ id, img, title, text });
                }}
              >
                <div
                  className={styles["slide"]}
                  style={{
                    background: `lightgray url(https://remote-demining.onrender.com/images/${img}) left / cover`,
                  }}
                >
                  <div className={styles.text_container}>
                    <h2 className={styles["title"]}>{title}</h2>
                    <p className={styles["caption"]}>{text}</p>
                    <Button className={styles.slideBtn}>Підтримати</Button>
                  </div>
                </div>
              </div>
              <div
                className={styles.btn_container}
                onClick={() => {
                  setSliderId(id);
                  toggleDelModal();
                }}
              >
                <Button isFullWidth outlined>
                  Видалити
                </Button>
              </div>
            </li>
          ))}

        <li className={styles.add_card}>
          <div
            className={styles.add_btn}
            onClick={() => {
              handleEditSlider({
                id: "",
                img: "",
                title: "",
                text: "",
              });
            }}
          >
            <Image src={add_icon} width={50} height={51} alt={"add icon"} />
            <span>Додати</span>
          </div>
        </li>
        <li className={styles.last_card}></li>
      </ul>
      {confDelModal && (
        <Modal isModalOpen={confDelModal} toggleModal={toggleDelModal}>
          <ConfirmationModal
            message="Ви дійсно бажаєте видалити зображення?"
            approveChanges={() => deleteSliderHandler()}
            discardChanges={() => toggleDelModal()}
          />
        </Modal>
      )}
      {successModal && (
        <Modal isModalOpen={successModal} toggleModal={toggleSuccessModal}>
          <ConfirmationModal message="Слайд успішно видалено" />
        </Modal>
      )}
    </div>
  );
};

export default AdminSlidersList;
