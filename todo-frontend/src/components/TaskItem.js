import React, { useState } from "react";
import { FaCheck, FaTrash, FaEdit } from "react-icons/fa";

function TaskItem({ task, completeTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.title);

  const handleEdit = () => {
    if (!newText.trim()) return;
    editTask(task.id, newText);
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.priority?.toLowerCase()}`}>
      {isEditing ? (
        <>
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <span>{task.title}</span>

          <div className="btns">
            <button onClick={() => setIsEditing(true)}>
              <FaEdit />
            </button>

            <button onClick={() => completeTask(task.id)}>
              <FaCheck />
            </button>

            <button onClick={() => deleteTask(task.id)}>
              <FaTrash />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;