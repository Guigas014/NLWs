package com.rocketseat.nlwexpert14.model;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "questions")
public class QuestionEntity {

      @Id
      @GeneratedValue(strategy = GenerationType.UUID)
      private UUID id;

      @Column(length = 50)
      private String technology;

      private String description;

      // @OneToMany(mappedBy = "questionEntity")
      @OneToMany
      @JoinColumn(name = "question_id")
      private List<AlternativesEntity> alternativesEntities;

      @CreationTimestamp
      private LocalDateTime createdAt;
}
