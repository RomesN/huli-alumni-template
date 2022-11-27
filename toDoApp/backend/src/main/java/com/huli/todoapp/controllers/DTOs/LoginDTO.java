package com.huli.todoapp.controllers.DTOs;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class LoginDTO {
  String username;
  String password;
}
