package com.huli.todoapp.services;

import com.huli.todoapp.controllers.DTOs.TaskDTO;
import com.huli.todoapp.model.Task;
import com.huli.todoapp.model.User;
import java.util.List;

public interface TaskService  {
  List<TaskDTO> getTasks(String username);

  Task createTask(TaskDTO taskDTO, User user);

  Task updateToDo(TaskDTO taskDTO, String taskId, String username);

  void deleteTask(String taskId, String username);
}
