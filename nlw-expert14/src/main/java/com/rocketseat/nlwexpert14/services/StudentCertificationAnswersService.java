package com.rocketseat.nlwexpert14.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rocketseat.nlwexpert14.dto.StudentCertificationAnswersDTO;
import com.rocketseat.nlwexpert14.model.AnswersCertificationsEntity;
import com.rocketseat.nlwexpert14.model.CertificationStudentEntity;
import com.rocketseat.nlwexpert14.model.QuestionEntity;
import com.rocketseat.nlwexpert14.model.StudentEntity;
import com.rocketseat.nlwexpert14.repositories.CertificationStudentRepository;
import com.rocketseat.nlwexpert14.repositories.QuestionRepository;
import com.rocketseat.nlwexpert14.repositories.StudentRepository;

@Service
public class StudentCertificationAnswersService {

      @Autowired
      private QuestionRepository questionRepository;

      @Autowired
      private StudentRepository studentRepository;

      @Autowired
      private CertificationStudentRepository certificationStudentRepository;

      public CertificationStudentEntity execute(StudentCertificationAnswersDTO dto) {
            // Verifica se o usuário existe
            var student = studentRepository.findByEmail(dto.getEmail());
            UUID studentID;

            if (student.isEmpty()) {
                  var studentCreated = StudentEntity.builder().email(dto.getEmail()).build();
                  studentCreated = studentRepository.save(studentCreated);
                  studentID = studentCreated.getId();
            } else {
                  studentID = student.get().getId();
            }

            // Busca as alternativas das perguntas, correta ou incorreta
            List<QuestionEntity> questionsEntity = questionRepository.findByTechnology(dto.getTechnology());

            dto.getQuestionsAnswers().stream().forEach(questionAnswer -> {
                  // Pego a questão que tem o mesmo id.
                  var question = questionsEntity.stream()
                              .filter(item -> item.getId().equals(questionAnswer.getQuestionID())).findFirst().get();

                  // Pego a alternativa correta da questão selecionada acima.
                  var findCorrectAlternative = question.getAlternativesEntities().stream()
                              .filter(alternative -> alternative.isCorrect()).findFirst().get();

                  if (findCorrectAlternative.getId().equals(questionAnswer.getAlternativeID())) {
                        questionAnswer.setCorrect(true);
                  } else {
                        questionAnswer.setCorrect(false);
                  }

            });

            // Pega as answerCertification
            List<AnswersCertificationsEntity> answersCertifications = new ArrayList<>();

            // Cria o objeto que será salvo na tabela certifications.
            CertificationStudentEntity certificationStudentEntity = CertificationStudentEntity.builder()
                        .technology(dto.getTechnology())
                        .studentID(studentID)
                        .answersCertificationsEntities(answersCertifications)
                        .build();

            var certificationStudentCreated = certificationStudentRepository.save(certificationStudentEntity);

            return certificationStudentCreated;
      }
}
