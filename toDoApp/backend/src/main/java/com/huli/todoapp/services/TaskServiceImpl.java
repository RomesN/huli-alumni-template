package com.huli.todoapp.services;

import com.huli.todoapp.controllers.DTOs.TaskDTO;
import com.huli.todoapp.exceptions.TaskException;
import com.huli.todoapp.model.Task;
import com.huli.todoapp.model.User;
import com.huli.todoapp.repository.TaskRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Repository;

@Repository
public class TaskServiceImpl implements TaskService {
  private final TaskRepository taskRepository;

  @Autowired
  public TaskServiceImpl(TaskRepository taskRepository) {
    this.taskRepository = taskRepository;
  }

  @Override
  public List<TaskDTO> getTasks(User user) {
    List<Task> taskList = taskRepository.findAllByUser(user);
    if (taskList.isEmpty()) {
      throw new TaskException("No task added yet", HttpStatusCode.valueOf(404));
    }
    return taskList.stream().map(TaskDTO::new).collect(Collectors.toList());
  }

  @Override
  public Task createTask(TaskDTO taskDTO, User user) {
    if (taskDTO.getName() == null || taskDTO.getDescription() == null ||
        taskDTO.getName().isBlank() ||
        taskDTO.getDescription().isBlank()) {
      throw new TaskException("Name and description cannot be empty.", HttpStatusCode.valueOf(400));
    }

    return taskRepository.save(new Task(taskDTO, user));
  }
}
