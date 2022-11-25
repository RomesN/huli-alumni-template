package com.huli.todoapp.services;

import com.huli.todoapp.controllers.DTOs.RegistrationDTO;
import com.huli.todoapp.exceptions.PasswordException;
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
      throw new UsernameNotFoundException("Invalid username!");
    } else {
      return user.get();
    }
  }

  @Override
  public User create(RegistrationDTO registration) {
    if (!registration.getPassword().equals(registration.getPasswordRepeat())) {
      throw new PasswordException("Passwords do not match!", HttpStatusCode.valueOf(400));
    }

    if (userRepository.findUserByUsernameIgnoreCase(registration.getUserName()).isPresent()) {
      throw new PasswordException("Username with given username already exists!",
          HttpStatusCode.valueOf(409));
    }

    User user =
        new User(registration.getUserName(), passwordEncoder.encode(registration.getPassword()),
            registration.getEmail(), true, true, true, true);
    return userRepository.save(user);
  }
}
