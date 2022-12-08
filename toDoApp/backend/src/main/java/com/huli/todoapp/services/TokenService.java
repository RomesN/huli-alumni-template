package com.huli.todoapp.services;

import jakarta.servlet.http.Cookie;
import org.springframework.security.core.Authentication;

public interface TokenService {
  Cookie generateToken(Authentication authentication);
}
