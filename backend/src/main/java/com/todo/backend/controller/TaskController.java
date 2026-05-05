package com.todo.backend.controller;

import com.todo.backend.model.Task;
import com.todo.backend.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskService service;

    @PostMapping
    public Task addTask(@RequestBody Task task) {
        return service.addTask(task);
    }

    @GetMapping("/{date}")
    public List<Task> getTasks(@PathVariable String date) {
        return service.getTasksByDate(date);
    }

    @PutMapping("/complete/{id}")
    public Task completeTask(@PathVariable String id) {
        return service.completeTask(id);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id) {
        service.deleteTask(id);
    }

    @PutMapping("/edit/{id}")
    public Task editTask(@PathVariable String id, @RequestBody Task t) {
        return service.editTask(id, t.getTitle());
    }
}