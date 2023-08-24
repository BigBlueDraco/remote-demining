"use client";
import Image from "next/image";
import { useState } from "react";
import { useToggle } from "usehooks-ts";

import Button from "@/components/Button/Button";
import ConfirmationModal from "@/components/ConfirmationModal/ConfirmationModal";
import Modal from "@/components/Modal/Modal";
import { deleteCard } from "@/lib/admin/cards";
import add_icon from "@/public/images/icons/buttons/add.svg";

import { AdminCardsData } from "../AdminCards";

import styles from "./AdminCardsList.module.css";

interface AdminCardsListProps {
  cardsData?: AdminCardsData[];
  handleEditCard: ({}: AdminCardsData) => void;
  handleDeleteCard: () => void;
}

const AdminCardsList: React.FC<AdminCardsListProps> = ({
  cardsData,
  handleEditCard,
  handleDeleteCard,
}) => {
  const [confDelModal, toggleDelModal] = useToggle(false);
  const [successModal, toggleSuccessModal] = useToggle(false);
  const [cardId, setCardId] = useState("");
  const deleteCardHandler = async () => {
    try {
      await deleteCard(cardId);
      await toggleSuccessModal();
      await setCardId("");
      await toggleDelModal();
      await handleDeleteCard();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {cardsData &&
          cardsData.map(({ id, img, title, text, img_description }) => (
            <li key={id} className={styles.card}>
              <div
                onClick={() => {
                  handleEditCard({ id, img, title, text, img_description });
                }}
              >
                <div className={styles.img_container}>
                  <Image
                    src={`https://remote-demining.onrender.com/images/${img}`}
                    className={styles.image}
                    alt={img_description || title}
                    fill
                  />
                </div>

                <div className={styles.body}>
                  <h3 className={styles.title}>{title}</h3>
                  <p className={styles.text}>{text}</p>
                </div>
              </div>
              <div
                className={styles.btn_container}
                onClick={() => {
                  setCardId(id);
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
              handleEditCard({
                id: "",
                img: "",
                title: "",
                text: "",
                img_description: "",
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
            message="Ви дійсно бажаєте видалити картку?"
            approveChanges={() => deleteCardHandler()}
            discardChanges={() => toggleDelModal()}
          />
        </Modal>
      )}
      {successModal && (
        <Modal
          isModalOpen={successModal}
          toggleModal={toggleSuccessModal}
        >
          <ConfirmationModal message="Картку успішно видалено" />
        </Modal>
      )}
    </div>
  );
};

export default AdminCardsList;
