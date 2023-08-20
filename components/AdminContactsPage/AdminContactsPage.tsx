"use client";
import { useEffect, useState } from "react";

import { getContacts } from "@/lib/admin/content";

import AdminWrapper from "../AdminWrapper/AdminWrapper";

import AdminDisplayContacts from "./AdminDisplayContacts/AdminDisplayContacts";
import AdminEditContacts from "./AdminEditContacts/AdminEditContacts";

import styles from "./AdminContactsPage.module.css";

export interface ContactsFormValues {
  id: string;
  email: string;
  phone: string;
}

const AdminContactsPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [contactData, setContactData] = useState<ContactsFormValues>({
    id: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (!isEditing) {
      fetchContactData();
    }
  }, [isEditing]);

  const fetchContactData = async () => {
    try {
      const data = await getContacts();
      if (data?.length) {
        const firstContact = data[0];
        setContactData({
          id: firstContact._id,
          email: firstContact.data.email,
          phone: firstContact.data.phone,
        });
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  // Function to handle Save button click
  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <h1 className={styles.heading}>
        <span className={isEditing ? styles.breadcrumb : undefined}>
          Контакти
        </span>
        {isEditing && <span className={styles.breadcrumb}>&gt;</span>}
        {isEditing && <span className={styles.edit}>Редагувати</span>}
      </h1>
      <AdminWrapper size="bigWrapper">
        {isEditing ? (
          <AdminEditContacts contactData={contactData} onSave={handleSave} />
        ) : (
          <AdminDisplayContacts
            contactData={contactData}
            onEdit={() => setIsEditing(true)}
          />
        )}
      </AdminWrapper>
    </div>
  );
};

export default AdminContactsPage;
