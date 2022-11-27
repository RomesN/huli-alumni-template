package com.huli.todoapp.controllers;

import com.huli.todoapp.controllers.DTOs.LoginDTO;
import com.huli.todoapp.controllers.DTOs.RegistrationDTO;
import com.huli.todoapp.exceptions.model.ToDoException;
import com.huli.todoapp.model.User;
import com.huli.todoapp.services.TokenService;
import com.huli.todoapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PublicController {

  private final UserService userService;
  private final TokenService tokenService;
  private final AuthenticationManager authenticationManager;

  @Autowired
  public PublicController(UserService userService, AuthenticationManager authenticationManager, TokenService tokenService) {
    this.authenticationManager = authenticationManager;
    this.userService = userService;
    this.tokenService = tokenService;
  }

  @PostMapping(value = "/register")
  public ResponseEntity<String> register(@RequestBody RegistrationDTO registration) {
    try {
      User user = userService.create(registration);
      return ResponseEntity.ok(
          "The user with username " + user.getUsername() + " was successfully created");
    } catch (ToDoException e) {
      return ResponseEntity.status(e.getStatusCode()).body(e.getMessage());
    }
  }

  @PostMapping(value = "/login")
  public ResponseEntity<String> login(@RequestBody LoginDTO login) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword()));
    String token = tokenService.generateToken(authentication);
    return ResponseEntity.ok(token);
  }
}
