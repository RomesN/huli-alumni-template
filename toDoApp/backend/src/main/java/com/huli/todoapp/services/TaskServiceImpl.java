package com.huli.todoapp.services;

import com.huli.todoapp.controllers.DTOs.TaskDTO;
import com.huli.todoapp.exceptions.TaskException;
import com.huli.todoapp.model.Task;
import com.huli.todoapp.model.User;
import com.huli.todoapp.repository.TaskRepository;
import java.util.List;
import java.util.Optional;
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
  public List<TaskDTO> getTasks(String username) {
    List<Task> taskList = taskRepository.findAllTasksByUsernameIgnoreCase(username);
    if (taskList.isEmpty()) {
      throw new TaskException("No task added yet.", HttpStatusCode.valueOf(404));
    }
    return taskList.stream().map(TaskDTO::new).collect(Collectors.toList());
  }

  @Override
  public Task createTask(TaskDTO taskDTO, User user) {
    return taskRepository.save(new Task(taskDTO, user));
  }

  @Override
  public Task updateToDo(TaskDTO taskDTO, String taskId, String username) {
    Optional<Task> taskToUpdate = taskRepository.findTaskById(parseId(taskId));
    if (taskToUpdate.isEmpty() || !taskToUpdate.get().getUser().getUsername().equals(username)) {
      throw new TaskException("Wrong id.", HttpStatusCode.valueOf(404));
    }

    taskToUpdate.get().updateFromDTO(taskDTO);
    return taskRepository.save(taskToUpdate.get());
  }

  @Override
  public void deleteTask(String taskId, String username) {
    Optional<Task> taskToDelete = taskRepository.findTaskById(parseId(taskId));

    if (taskToDelete.isEmpty() || !taskToDelete.get().getUser().getUsername().equals(username)) {
      throw new TaskException("Wrong id.", HttpStatusCode.valueOf(404));
    }

    taskRepository.delete(taskToDelete.get());
  }

  private Long parseId(String id) {
    long parsedId;
    try {
      parsedId = Long.parseLong(id);
    } catch (NumberFormatException e) {
      throw new TaskException("Wrong id provided.", HttpStatusCode.valueOf(400));
    }
    return parsedId;
  }
}
