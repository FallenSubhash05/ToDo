import React, { useState, useEffect, useCallback } from "react";
import CalendarView from "./components/CalendarView";
import TaskList from "./components/TaskList";
import "./App.css";
import axios from "axios";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  // 📅 Format date
  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const currentDate = formatDate(selectedDate);

  // 🔄 Fetch tasks (fixed with useCallback)
  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/tasks/${currentDate}`
      );
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  }, [currentDate]);

  // 🔁 Run when date changes
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // ➕ Add Task
  const addTask = async (title, priority) => {
    try {
      await axios.post("http://localhost:8080/api/tasks", {
        title,
        date: currentDate,
        priority,
      });
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // ✅ Complete Task
  const completeTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/api/tasks/complete/${id}`
      );
      fetchTasks();
    } catch (err) {
      console.error("Error completing task:", err);
    }
  };

  // ❌ Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/tasks/${id}`
      );
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // ✏️ Edit Task
  const editTask = async (id, newTitle) => {
    try {
      await axios.put(
        `http://localhost:8080/api/tasks/edit/${id}`,
        { title: newTitle }
      );
      fetchTasks();
    } catch (err) {
      console.error("Error editing task:", err);
    }
  };

  return (
    <div className="app">
      <h1>📅 To-Do App</h1>

      <div className="layout">
        <CalendarView
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <TaskList
          tasks={tasks}
          addTask={addTask}
          completeTask={completeTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      </div>
    </div>
  );
}

export default App;