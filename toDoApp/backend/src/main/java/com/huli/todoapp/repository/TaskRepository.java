package com.huli.todoapp.repository;

import com.huli.todoapp.model.Task;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
  @Query("select t from Task t where upper(t.user.username) = upper(?1)")
  List<Task> findAllTasksByUsernameIgnoreCase(String username);

  Optional<Task> findTaskById(Long id);
}
