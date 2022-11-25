package com.huli.todoapp.model;

import com.huli.todoapp.model.enums.Priority;
import jakarta.persistence.CollectionTable;
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
import java.security.Timestamp;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
public class Task {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String name;
  private String description;
  private Boolean done;
  @Temporal(TemporalType.TIMESTAMP)
  private Timestamp dueDate;
  @ManyToOne
  @JoinColumn(name="user_id", nullable=false)
  private User user;
  @CollectionTable(name="taskPriority")
  @Enumerated(EnumType.STRING)
  private Priority priority;
}


