package com.rocketseat.nlwexpert14.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class StudentCertificationAnswersDTO {

      private String email;
      private String technology;
      private List<QuestionAnswerDTO> questionsAnswers;
}
