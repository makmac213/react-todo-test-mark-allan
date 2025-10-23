import { Task } from "./interfaces";

export default function ClunkyList({
    tasks,
    handleToggleComplete,
    handleDeleteTask
}: {
    tasks: Task[],
    handleToggleComplete: (id: number) => void,
    handleDeleteTask: (id: number) => void
}) {

    return (
      <ul id="task-list-container">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <div className="task-item-left">
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
                {task.text}
              </span>
            </div>
            <div className="task-item-action">
              <a href="#" onClick={() => handleDeleteTask(task.id)}>[✘]</a>
            </div>
          </li>
        ))}
      </ul>
    );
}
