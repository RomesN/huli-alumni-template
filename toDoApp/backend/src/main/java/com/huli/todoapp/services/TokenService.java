package com.huli.todoapp.services;

import org.springframework.security.core.Authentication;

public interface TokenService {
  String generateToken(Authentication authentication);
}
