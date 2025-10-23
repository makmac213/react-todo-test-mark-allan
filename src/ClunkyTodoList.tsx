import React, { useEffect, useMemo, useState } from "react";
import { Task } from "./interfaces";
import ClunkyList from "./ClunkyList";
import ClunkyFilter from "./ClunkyFilter";
import ClunkyControls from "./ClunkyControls";

export function ClunkyTodoList() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Write code", completed: true },
    { id: 3, text: "Eat lunch", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [tasksToRender, setTasksToRender] = useState<Task[]>([]);
  const [moreWordsFilter, setMoreWordsFilter] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      // Make the code simpler but works the same
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const handleToggleComplete = (id: number) => {
    // Make the code simpler but works the same
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleRemoveCompleted = () => {
    const activeTasks = tasks.filter((task) => !task.completed);
    setTasks(activeTasks);
    // Return to 'all' filter after removing completed tasks
    // Why? Because if we are on completed filter and remove the completed tasks,
    // the list would be empty and might confuse the user.
    setFilter("all");
  };

  useEffect(() => {
    let filteredTasks = tasks;
    if (filter === "completed") {
      filteredTasks = tasks.filter((task) => task.completed);
    } else if (filter === "active") {
      filteredTasks = tasks.filter((task) => !task.completed);
    }
    // NOTE:
    // This is working on all filters.
    // But I need clarification with the "All" filter.
    // Should pressing the "All" button turn off the multiple words filter?
    if (moreWordsFilter) {
      filteredTasks = filteredTasks.filter((task) => task.text.trim().split(" ").length > 1);
    }
    setTasksToRender(filteredTasks);
  }, [tasks, filter, moreWordsFilter]);

  const totalCount = useMemo(() => {
    return tasks.length;
  }, [tasks]);

  return (
    <div>
      <h1>To-Do List</h1>
      <h2>Items: {totalCount}</h2>

      <ClunkyControls
        newTask={newTask}
        handleInputChange={handleInputChange}
        handleAddTask={handleAddTask}
        handleRemoveCompleted={handleRemoveCompleted}
      />

      <ClunkyFilter
        filter={filter}
        setFilter={setFilter}
        moreWordsFilter={moreWordsFilter}
        setMoreWordsFilter={setMoreWordsFilter}
      />

      <ClunkyList
        tasks={tasksToRender}
        handleToggleComplete={handleToggleComplete}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
}
