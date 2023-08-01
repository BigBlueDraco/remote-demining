import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import TextArea from "@/components/TextArea/TextArea";

import styles from "./FeedbackForm.module.css";

const FeedbackForm = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Зворотній зв`язок</h2>
      <p className={styles.text}>
        Ваш відгук чи пропозиція буде корисною для нас. <br /> Дякуємо що ви з
        нами.
      </p>
      <form id="feedback-form" className={styles.form}>
        <Input
          size="full"
          type="text"
          label="Ім’я*"
          backgroundCl="secondary"
          errorMessage="Ім'я є обов'язковим полем"
        />
        <Input
          size="full"
          type="tel"
          label="Телефон*"
          backgroundCl="secondary"
          errorMessage="Телефон є обов'язковим полем"
        />
        <Input
          size="full"
          type="email"
          label="Email*"
          backgroundCl="secondary"
          errorMessage="Email є обов'язковим полем"
        />
        <TextArea
          label="Повідомлення*"
          size="full"
          backgroundCl="secondary"
          height={146}
        />
        <Button type="submit" isFullWidth>
          Надіслати
        </Button>
      </form>
    </div>
  );
};

export default FeedbackForm;
