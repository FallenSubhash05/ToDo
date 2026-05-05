package com.todo.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "tasks")
@Data
public class Task {

    @Id
    private String id;

    private String title;
    private String date;
    private String priority;
    private boolean completed;
}