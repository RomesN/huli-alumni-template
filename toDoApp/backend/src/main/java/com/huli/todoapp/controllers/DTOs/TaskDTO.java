package com.huli.todoapp.controllers.DTOs;


import com.huli.todoapp.model.Task;
import com.huli.todoapp.model.enums.Priority;
import java.util.Date;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class TaskDTO {
  private Long id;
  private String name;
  private String description;
  private Boolean done = false;
  private Date dueDate = null;
  private Priority priority = Priority.LOW;

  public TaskDTO(Task task) {
    this.id = task.getId();
    this.name = task.getName();
    this.description = task.getDescription();
    this.done = task.getDone();
    this.dueDate = task.getDueDate();
    this.priority = task.getPriority();
  }
}
