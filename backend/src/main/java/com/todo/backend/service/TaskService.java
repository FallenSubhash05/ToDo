package com.todo.backend.service;

import com.todo.backend.model.Task;
import com.todo.backend.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository repo;

    // ➕ Add Task
    public Task addTask(Task task) {
        task.setCompleted(false);
        return repo.save(task);
    }

    // 📅 Get tasks for selected date (ONLY uncompleted)
    public List<Task> getTasksByDate(String date) {
        carryForwardTasks(); // 🔥 main feature
        return repo.findByDateAndCompletedFalse(date);
    }

    // ✅ Complete Task
    public Task completeTask(String id) {
        Task task = repo.findById(id).orElseThrow(() ->
                new RuntimeException("Task not found"));
        task.setCompleted(true);
        return repo.save(task);
    }

    // ❌ Delete Task
    public void deleteTask(String id) {
        repo.deleteById(id);
    }

    // ✏️ Edit Task
    public Task editTask(String id, String title) {
        Task task = repo.findById(id).orElseThrow(() ->
                new RuntimeException("Task not found"));
        task.setTitle(title);
        return repo.save(task);
    }

    /* 🔥 MAIN FEATURE: Carry Forward */
    public void carryForwardTasks() {
        LocalDate today = LocalDate.now();

        List<Task> tasks = repo.findByCompletedFalse();

        for (Task task : tasks) {
            LocalDate taskDate = LocalDate.parse(task.getDate());

            if (taskDate.isBefore(today)) {
                task.setDate(today.toString());
                repo.save(task);
            }
        }
    }
}