package com.rocketseat.nlwexpert14.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rocketseat.nlwexpert14.dto.StudentCertificationAnswersDTO;
import com.rocketseat.nlwexpert14.dto.VerifyHasCertificationDTO;
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

      @Autowired
      private VerifyIfHasCertificationService verifyIfHasCertificationService;

      public CertificationStudentEntity execute(StudentCertificationAnswersDTO dto) throws Exception {

            // Verifica se o usuário já tirou a certificação
            var hasCertification = this.verifyIfHasCertificationService
                        .execute(new VerifyHasCertificationDTO(dto.getEmail(), dto.getTechnology()));

            if (hasCertification) {
                  throw new Exception("Você já tirou a certificação!");
            }

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

            // Lista das answerCertification
            List<AnswersCertificationsEntity> answersCertifications = new ArrayList<>();

            AtomicInteger correctAnswersAmount = new AtomicInteger(0);

            dto.getQuestionsAnswers().stream().forEach(questionAnswer -> {
                  // Pego a questão que tem o mesmo id.
                  var question = questionsEntity.stream()
                              .filter(item -> item.getId().equals(questionAnswer.getQuestionID())).findFirst().get();

                  // Pego a alternativa correta da questão selecionada acima.
                  var findCorrectAlternative = question.getAlternativesEntities().stream()
                              .filter(alternative -> alternative.isCorrect()).findFirst().get();

                  if (findCorrectAlternative.getId().equals(questionAnswer.getAlternativeID())) {
                        questionAnswer.setCorrect(true);
                        correctAnswersAmount.incrementAndGet();
                  } else {
                        questionAnswer.setCorrect(false);
                  }

                  // Seta os valores da answerCertification e coloca na lista
                  // answersCertifications
                  var answersCertificationsEntity = AnswersCertificationsEntity.builder()
                              .answerID(questionAnswer.getAlternativeID())
                              .questionID(questionAnswer.getQuestionID())
                              .studentID(studentID)
                              .isCorrect(questionAnswer.isCorrect()).build();

                  answersCertifications.add(answersCertificationsEntity);

            });

            // Cria o objeto que será salvo na tabela certifications.
            CertificationStudentEntity certificationStudentEntity = CertificationStudentEntity.builder()
                        .technology(dto.getTechnology())
                        .studentID(studentID)
                        .grade(correctAnswersAmount.get())
                        .answersCertificationsEntities(answersCertifications)
                        .build();

            var certificationStudentCreated = certificationStudentRepository.save(certificationStudentEntity);

            return certificationStudentCreated;
      }
}
