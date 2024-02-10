package com.rocketseat.nlwexpert14.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rocketseat.nlwexpert14.model.StudentEntity;

public interface StudentRepository extends JpaRepository<StudentEntity, UUID> {

      public Optional<StudentEntity> findByEmail(String email);
}
