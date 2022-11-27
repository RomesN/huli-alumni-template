package com.huli.todoapp.exceptions;

import com.huli.todoapp.exceptions.model.ToDoException;
import org.springframework.http.HttpStatusCode;

public class TaskException extends ToDoException {
  public TaskException(String message, HttpStatusCode statusCode) {
    super(message, statusCode);
  }
}
