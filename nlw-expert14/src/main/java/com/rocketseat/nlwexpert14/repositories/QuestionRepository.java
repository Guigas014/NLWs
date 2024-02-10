package com.rocketseat.nlwexpert14.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rocketseat.nlwexpert14.model.QuestionEntity;

public interface QuestionRepository extends JpaRepository<QuestionEntity, UUID> {

      List<QuestionEntity> findByTechnology(String technology);
}
