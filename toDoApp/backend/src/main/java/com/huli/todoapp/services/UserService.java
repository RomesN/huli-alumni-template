package com.huli.todoapp.services;

import com.huli.todoapp.controllers.DTOs.RegistrationDTO;
import com.huli.todoapp.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
  User create(RegistrationDTO registration);
}
