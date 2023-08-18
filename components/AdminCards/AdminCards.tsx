"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useToggle } from "usehooks-ts";

import { createCard, getCards } from "@/lib/admin/cards";
import pen from "@/public/images/adminInputs/pen.svg";

import AdminWrapper from "../AdminWrapper/AdminWrapper";
import Button from "../Button/Button";
import projectsData from "../Projects/projectsData";

import AdminCardAdd from "./AdminCardAdd/AdminCardAdd";
import AdminCardsList from "./AdminCardsList/AdminCardsList";

import styles from "./AdminCards.module.css";

export interface AdminCardsData {
  id: number;
  img: string;
  title: string;
  text: string;
  img_description: string;
}

const AdminCards = () => {
  const [isEditing, setIsEditing] = useToggle(false);
  const [cardData, setCardsData] = useState<AdminCardsData[]>();
  const [editedCard, setEditedCard] = useState<AdminCardsData>({
    id: (cardData && cardData.length + 1) || 1,
    img: "",
    title: "",
    text: "",
    img_description: "",
  });
  useEffect(() => {
    fetchCardsData();
  }, []);
  const handleSave = (data: AdminCardsData) => {
    createCard(data);
    setIsEditing();
  };
  const handleEditCard = (card: AdminCardsData) => {
    setEditedCard(card);
    setIsEditing();
  };
  const fetchCardsData = async () => {
    try {
      const data = await getCards();
      const cardsData = data?.map((card): AdminCardsData => {
        console.log(card.images[0])
        return {
          id: card.data.id,
          img: `https://remote-demining.onrender.com/images/${card.images[0]}`,
          title: card.data.title,
          text: card.data.text,
          img_description: card.data.img_description,
        };
      });
      setCardsData(cardsData);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.heading_container}>
        <h1 className={styles.heading}>
          <span className={isEditing ? styles.breadcrumb : undefined}>
            Картки
          </span>
          {isEditing && <span className={styles.breadcrumb}>&gt;</span>}
          {isEditing && <span className={styles.edit}>Додати Картки</span>}
        </h1>
        {isEditing && (
          <span className={styles.btn_back}>
            <Button
              outlined
              onClick={() => {
                setIsEditing();
              }}
            >
              Назад
            </Button>
          </span>
        )}
        {!isEditing && (
          <div>
            <Image src={pen} alt="edit_img" width={27} height={27} />
          </div>
        )}
      </div>
      <AdminWrapper size="bigWrapper">
        {isEditing ? (
          <AdminCardAdd onSave={handleSave} cardData={editedCard} />
        ) : (
          <AdminCardsList
            // onSave={handleSave}
            cardsData={cardData}
            handleEditCard={handleEditCard}
          />
        )}
      </AdminWrapper>
    </div>
  );
};

export default AdminCards;
