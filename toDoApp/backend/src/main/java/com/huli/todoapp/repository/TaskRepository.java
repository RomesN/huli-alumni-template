package com.huli.todoapp.repository;

import com.huli.todoapp.model.Task;
import com.huli.todoapp.model.User;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
  List<Task> findAllByUser(User user);
}
