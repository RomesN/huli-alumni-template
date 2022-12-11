package com.huli.todoapp.services;

import com.huli.todoapp.controllers.DTOs.RegistrationDTO;
import com.huli.todoapp.exceptions.PasswordException;
import com.huli.todoapp.exceptions.UserException;
import com.huli.todoapp.model.User;
import com.huli.todoapp.repository.UserRepository;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
  private final UserRepository userRepository;
  private final BCryptPasswordEncoder passwordEncoder;

  @Autowired
  public UserServiceImpl(UserRepository userRepository,
                         BCryptPasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<User> user = userRepository.findUserByUsernameIgnoreCase(username);
    if (user.isEmpty()) {
      throw new UsernameNotFoundException("Invalid username.");
    } else {
      return user.get();
    }
  }

  @Override
  public User create(RegistrationDTO registration) {
    if (registration.getUsername().length() < 2) {
      throw new UserException("The username has to contain at least two characters.",
          HttpStatusCode.valueOf(400));
    }

    if (!registration.getPassword().equals(registration.getPasswordRepeat())) {
      throw new PasswordException("The passwords do not match.",
          HttpStatusCode.valueOf(400));
    }

    if (!registration.getPassword()
        .matches(
            "^.*(?=.{8,})((?=.*[!@#$%^&*()\\-_=+{};:,<.>]){1})(?=.*\\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$")) {
      throw new PasswordException(
          "Password does not meet criteria.",
          HttpStatusCode.valueOf(400));
    }

    if (userRepository.findUserByUsernameIgnoreCase(registration.getUsername())
        .isPresent()) {
      throw new UserException("Username with given username already exists.",
          HttpStatusCode.valueOf(409));
    }

    if (userRepository.findUserByEmail(registration.getEmail())
        .isPresent()) {
      throw new UserException("Username with given email already exists.",
          HttpStatusCode.valueOf(409));
    }

    User user =
        new User(registration.getUsername(), passwordEncoder.encode(registration.getPassword()),
            registration.getEmail(), true, true, true, true);
    return userRepository.save(user);
  }
}
