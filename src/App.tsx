import { Header } from "./components/Header";
import { TaskForm } from "./components/tasks/TaskForm";
import { TaskList } from "./components/tasks/TaskList";

import { TaskProvider } from "./contexts/TaskContext";

function App() {
  return (
    <TaskProvider>
      <div className="md:max-w-screen-xl mx-auto space-y-10 p-4">
        <Header />
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
