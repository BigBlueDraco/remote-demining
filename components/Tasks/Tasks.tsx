import tasksData from "./tasksData";
import TasksList from "./TasksList/TasksList";
import SectionContainer from "../SectionContainer/SectionContainer";

import bg from "@/public/images/tasks/task-bg.jpg";
console.log(bg);

const Tasks: React.FC = () => {
  return (
    <SectionContainer
      title="Основні завдання"
      bgImg={bg.src}
      titleColor="var(--task-text-color)"
      centerTitle
    >
      <TasksList items={tasksData} />
    </SectionContainer>
  );
};

export default Tasks;
