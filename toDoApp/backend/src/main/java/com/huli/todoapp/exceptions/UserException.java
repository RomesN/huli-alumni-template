package com.huli.todoapp.exceptions;

import com.huli.todoapp.exceptions.model.ToDoException;
import org.springframework.http.HttpStatusCode;

public class UserException extends ToDoException {
  public UserException(String message, HttpStatusCode statusCode) {
    super(message, statusCode);
  }
}
