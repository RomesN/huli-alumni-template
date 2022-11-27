package com.huli.todoapp.controllers;

import com.huli.todoapp.controllers.DTOs.TaskDTO;
import com.huli.todoapp.exceptions.model.ToDoException;
import com.huli.todoapp.model.User;
import com.huli.todoapp.services.TaskService;
import com.huli.todoapp.services.UserService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ToDoController {
  private final UserService userService;
  private final TaskService taskService;

  public ToDoController(UserService userService, TaskService taskService) {
    this.userService = userService;
    this.taskService = taskService;
  }

  @PostMapping("/to-do")
  public ResponseEntity<String> createTask(@AuthenticationPrincipal Jwt principal, @RequestBody
  TaskDTO taskDTO) {
    try {
      User user = (User) userService.loadUserByUsername(principal.getClaimAsString("sub"));
      taskService.createTask(taskDTO, user);
      return ResponseEntity.ok("To do was saved.");

    } catch (ToDoException e) {

      return ResponseEntity.status(e.getStatusCode())
          .body(e.getMessage());
    }
  }

  @GetMapping("/to-do")
  public ResponseEntity<?> getTasks(@AuthenticationPrincipal Jwt principal) {
    try {
      String username = principal.getClaimAsString("sub");
      User user = (User) userService.loadUserByUsername(username);
      List<TaskDTO> taskList = taskService.getTasks(user);
      return ResponseEntity.ok(taskList);
    } catch (ToDoException e) {

      return ResponseEntity.status(e.getStatusCode())
          .body(e.getMessage());
    }
  }
}
