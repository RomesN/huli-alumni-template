package com.huli.todoapp.exceptions.model;

import org.springframework.http.HttpStatusCode;

public class ToDoException extends RuntimeException {
  HttpStatusCode statusCode;

  public ToDoException(String message, HttpStatusCode statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
