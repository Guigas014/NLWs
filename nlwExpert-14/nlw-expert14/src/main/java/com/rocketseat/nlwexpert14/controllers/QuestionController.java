package com.rocketseat.nlwexpert14.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rocketseat.nlwexpert14.dto.AlternativesResultDTO;
import com.rocketseat.nlwexpert14.dto.QuestionResultDTO;
import com.rocketseat.nlwexpert14.model.AlternativesEntity;
import com.rocketseat.nlwexpert14.model.QuestionEntity;
import com.rocketseat.nlwexpert14.repositories.QuestionRepository;

@RestController
@RequestMapping("/questions")
public class QuestionController {

      @Autowired
      private QuestionRepository questionRepository;

      @GetMapping("/technology/{technology}")
      public List<QuestionResultDTO> findByTechnology(@PathVariable String technology) {
            var result = this.questionRepository.findByTechnology(technology);

            var toMap = result.stream().map(question -> mapQuestionToDTO(question)).collect(Collectors.toList());

            return toMap;
      }

      // As duas funções abaixo fazem a conversão de uma (List) Entity em um DTO.
      static QuestionResultDTO mapQuestionToDTO(QuestionEntity question) {
            var questionResultDTO = QuestionResultDTO.builder()
                        .id(question.getId())
                        .technology(question.getTechnology())
                        .description(question.getDescription()).build();

            List<AlternativesResultDTO> alternativesResultDTOs = question.getAlternativesEntities().stream()
                        .map(alternative -> mapAlternativeToDTO(alternative)).collect(Collectors.toList());

            questionResultDTO.setAlternatives(alternativesResultDTOs);

            return questionResultDTO;
      }

      static AlternativesResultDTO mapAlternativeToDTO(AlternativesEntity alternative) {
            return AlternativesResultDTO.builder()
                        .id(alternative.getId())
                        .description(alternative.getDescription()).build();
      }
}
