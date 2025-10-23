import React, { useEffect, useMemo, useState } from "react";

export function ClunkyTodoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Write code", completed: true },
    { id: 3, text: "Eat lunch", completed: false },
  ]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [tasksToRender, setTasksToRender] = useState<any[]>([])
  const [moreWordsFilter, setMoreWordsFilter] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      const tempTasks = [...tasks];
      tempTasks.push({ id: Date.now(), text: newTask, completed: false });
      setTasks(tempTasks);
      setNewTask("");
    }
  };

  const handleToggleComplete = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        let tempTask = { id: task.id, text: task.text, completed: task.completed };
        tempTask.completed = !tempTask.completed;
        return tempTask;
      }
      return task;
    });
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

    // Note:
    // This is working on all filters.
    // But I need clarification with the all filter.
    // Should pressing the "All" button turn off the word filter?
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
      <input
        type="text"
        value={newTask}
        onChange={handleInputChange}
        placeholder="Add new task"
      />
      <button onClick={handleAddTask}>Add</button>
      <button onClick={handleRemoveCompleted}>Remove completed</button>
      <div>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>
      <div>
        <button onClick={() => setMoreWordsFilter(!moreWordsFilter)}>More than one word: {moreWordsFilter ? "ON" : "OFF"}</button>
      </div>
      <ul>
        {tasksToRender.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.text} <a href="#" onClick={() => handleDeleteTask(task.id)}>[✘]</a>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
