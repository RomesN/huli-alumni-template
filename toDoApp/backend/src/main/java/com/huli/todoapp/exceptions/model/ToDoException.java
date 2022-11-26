package com.huli.todoapp.exceptions.model;

import lombok.Getter;
import org.springframework.http.HttpStatusCode;

@Getter
public class ToDoException extends RuntimeException {
  private HttpStatusCode statusCode;

  public ToDoException(String message, HttpStatusCode statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
