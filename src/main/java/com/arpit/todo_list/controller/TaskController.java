package com.arpit.todo_list.controller;

import com.arpit.todo_list.model.Tasks;
import com.arpit.todo_list.model.UpdatedTask;
import com.arpit.todo_list.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/tasks")
@CrossOrigin(origins = "http://localhost:63342")
public class TaskController {

    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<Tasks>> displayTasks() {
        List<Tasks> tasks = taskService.getTasks();
        if (!tasks.isEmpty()) {
            return ResponseEntity.ok(tasks);
        }
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{taskId}")
    public ResponseEntity<Tasks> displayTask(@PathVariable Long taskId) {
        Tasks tasks = taskService.getTask(taskId);
        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Tasks task) {
        int status = taskService.addTask(task);
        if (status == 1) {
            return ResponseEntity.accepted().build();
        }
        return ResponseEntity.badRequest().build();
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable Long taskId) {
        int status = taskService.deleteTask(taskId);
        if (status == 1) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<?> updateTask(
            @RequestBody UpdatedTask task,
            @PathVariable Long taskId) {
        int status = taskService.updateTask(task, taskId);
        if (status == 1) {
            return ResponseEntity.accepted().build();
        }
        return ResponseEntity.badRequest().build();
    }

}
