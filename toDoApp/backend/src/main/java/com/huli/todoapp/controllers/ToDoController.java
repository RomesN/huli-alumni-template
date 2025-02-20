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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/")
public class ToDoController {
  private final UserService userService;
  private final TaskService taskService;

  public ToDoController(UserService userService, TaskService taskService) {
    this.userService = userService;
    this.taskService = taskService;
  }

  @PutMapping("/to-do")
  public ResponseEntity<?> createTask(@AuthenticationPrincipal Jwt principal, @RequestBody
  TaskDTO taskDTO) {
    try {
      User user = (User) userService.loadUserByUsername(principal.getClaimAsString("sub"));
      return ResponseEntity.ok(taskService.createTask(taskDTO, user));

    } catch (ToDoException e) {
      return ResponseEntity.status(e.getStatusCode())
          .body(e.getMessage());
    }
  }

  @GetMapping("/to-do")
  public ResponseEntity<?> getTasks(@AuthenticationPrincipal Jwt principal) {
    try {
      List<TaskDTO> taskList = taskService.getTasks(principal.getClaimAsString("sub"));
      return ResponseEntity.ok(taskList);

    } catch (ToDoException e) {
      return ResponseEntity.status(e.getStatusCode())
          .body(e.getMessage());
    }
  }

  @PatchMapping("/to-do/{id}")
  public ResponseEntity<?> updateTask(@AuthenticationPrincipal Jwt principal,
                                      @RequestBody TaskDTO taskDTO,
                                      @PathVariable String id) {
    try {
      return ResponseEntity.ok(
          taskService.updateToDo(taskDTO, id, principal.getClaimAsString("sub")));
    } catch (ToDoException e) {
      return ResponseEntity.status(e.getStatusCode())
          .body(e.getMessage());
    }
  }

  @DeleteMapping("/to-do/{id}")
  public ResponseEntity<?> deleteTask(@AuthenticationPrincipal Jwt principal,
                                      @PathVariable String id) {
    try {
      taskService.deleteTask(id, principal.getClaimAsString("sub"));
      return ResponseEntity.ok("To do with id " + id + " was deleted.");

    } catch (ToDoException e) {
      return ResponseEntity.status(e.getStatusCode())
          .body(e.getMessage());
    }
  }
}
