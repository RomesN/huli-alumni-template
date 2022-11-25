package com.huli.todoapp.controllers.DTOs;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class RegistrationDTO {
  String password;
  String passwordRepeat;
  String userName;
  String email;
}
