import ScientificActivity from "@/components/ScientificActivity/ScientificActivity";
import ScrollUp from "@/components/ScrollUp/ScrollUp";
import SectionContainer from "@/components/SectionContainer/SectionContainer";

import styles from './activity.module.css';

const Activity = () => {
  return (
    <main>
      <ScrollUp />
      <SectionContainer
        title="Наукова діяльність"
        alignTitle="left"
        description="Ми також надаємо корисні поради щодо вибору дрона, використання його можливостей та правил безпеки. Наша команда експертів завжди готова надати вам консультацію та допомогти з будь-якими питаннями, пов'язаними з дронами."
        className={styles.custom_padding_top}
      >
        <ScientificActivity />
      </SectionContainer>
    </main>
  );
};

export default Activity;
