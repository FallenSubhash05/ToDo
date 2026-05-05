import React, { useState } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, addTask, completeTask, deleteTask, editTask }) {
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleAdd = () => {
    if (!input.trim()) return;
    addTask(input, priority);
    setInput("");
  };

  return (
    <div className="task-container">
      <h2>Tasks</h2>

      <div className="input-box">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button onClick={handleAdd}>Add</button>
      </div>

      {tasks.length === 0 && <p>No tasks for this day</p>}

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          completeTask={completeTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

export default TaskList;