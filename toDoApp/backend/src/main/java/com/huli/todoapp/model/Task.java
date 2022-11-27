package com.huli.todoapp.model;

import com.huli.todoapp.controllers.DTOs.TaskDTO;
import com.huli.todoapp.model.enums.Priority;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@Getter
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  @Column(nullable = false)
  private String name;
  @Column(nullable = false)
  private String description;
  private Boolean done;
  @Temporal(TemporalType.TIMESTAMP)
  private Date dueDate;
  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User user;
  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Priority priority;

  public Task(TaskDTO taskDTO, User user) {
    this.name = taskDTO.getName();
    this.description = taskDTO.getDescription();
    this.done = taskDTO.getDone();
    this.dueDate = taskDTO.getDueDate();
    this.priority = taskDTO.getPriority();
    this.user = user;
  }
}


