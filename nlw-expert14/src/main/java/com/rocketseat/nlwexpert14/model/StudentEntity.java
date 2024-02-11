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
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "students")
public class StudentEntity {

      @Id
      @GeneratedValue(strategy = GenerationType.UUID)
      private UUID id;

      @Column(unique = true, nullable = false)
      private String email;

      // @OneToMany(mappedBy = "studentEntity")
      @OneToMany
      @JoinColumn(name = "studentEntity")
      private List<CertificationStudentEntity> certificationStudentEntities;

      @CreationTimestamp
      private LocalDateTime createdAt;
}
