package com.arpit.todo_list.service;

import com.arpit.todo_list.model.Tasks;
import com.arpit.todo_list.model.UpdatedTask;
import com.arpit.todo_list.repository.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class TaskService {

    private final TaskRepo taskRepo;

    @Autowired
    public TaskService(TaskRepo taskRepo) {
        this.taskRepo = taskRepo;
    }

    public List<Tasks> getTasks() {
        return taskRepo.findAll();
    }

    public Tasks getTask(Long taskId) {
        return taskRepo.findById(taskId).orElse(null);
    }

    public int deleteTask(Long taskId) {
        taskRepo.deleteById(taskId);
        if (taskRepo.findById(taskId).isEmpty()) {
            return 1;
        }
        return 0;
    }

    public int updateTask(UpdatedTask task, Long taskId) {
        if (taskRepo.findById(taskId).isEmpty()) {
            return 0;
        }
        Tasks oldTask = taskRepo.findById(taskId).orElseThrow(() ->
                new RuntimeException("Task not found"));
        oldTask.setDueDate(task.getDueDate());
        oldTask.setTask(task.getTask());
        taskRepo.save(oldTask);
        return 1;
    }

    public int addTask(Tasks task) {
        if (task.getDueDate() == null) {
            task.setDueDate(LocalDate.now().plusDays(1));
        }
        taskRepo.save(task);
        return 1;
    }
}
