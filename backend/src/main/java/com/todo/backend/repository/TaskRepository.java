package com.todo.backend.repository;

import com.todo.backend.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TaskRepository extends MongoRepository<Task, String> {

    // 🔥 Get tasks for a specific date (only uncompleted)
    List<Task> findByDateAndCompletedFalse(String date);

    // 🔥 Used for carry-forward logic
    List<Task> findByCompletedFalse();
}