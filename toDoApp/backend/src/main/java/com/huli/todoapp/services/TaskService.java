package com.huli.todoapp.services;

import com.huli.todoapp.controllers.DTOs.TaskDTO;
import com.huli.todoapp.model.Task;
import com.huli.todoapp.model.User;
import java.util.List;

public interface TaskService  {
  List<TaskDTO> getTasks(User user);

  Task createTask(TaskDTO taskDTO, User user);
}
