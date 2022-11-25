package com.huli.todoapp.exceptions;

import com.huli.todoapp.exceptions.model.ToDoException;
import org.springframework.http.HttpStatusCode;

public class PasswordException extends ToDoException {
  public PasswordException(String message, HttpStatusCode statusCode) {
    super(message, statusCode);
  }
}
