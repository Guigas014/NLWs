package com.rocketseat.nlwexpert14.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rocketseat.nlwexpert14.dto.StudentCertificationAnswersDTO;
import com.rocketseat.nlwexpert14.dto.VerifyHasCertificationDTO;
import com.rocketseat.nlwexpert14.model.CertificationStudentEntity;
import com.rocketseat.nlwexpert14.services.StudentCertificationAnswersService;
import com.rocketseat.nlwexpert14.services.VerifyIfHasCertificationService;

@RestController
@RequestMapping("/students")
public class StudentController {

      @Autowired
      private VerifyIfHasCertificationService verifyIfHasCertificationService;

      @Autowired
      private StudentCertificationAnswersService studentCertificationAnswersService;

      @PostMapping("/verifyIfHasCertification")
      public String verifyIfHasCertification(@RequestBody VerifyHasCertificationDTO verifyHasCertificationDTO) {
            // Email
            // Technology
            var result = this.verifyIfHasCertificationService.execute(verifyHasCertificationDTO);

            if (result) {
                  return "Usuário já fez a prova!";
            }
            return "Usuário pode fazer a prova";

      }

      @PostMapping("/certification/answer")
      public CertificationStudentEntity certificationAnswer(
                  @RequestBody StudentCertificationAnswersDTO studentCertificationAnswersDTO) {
            return this.studentCertificationAnswersService.execute(studentCertificationAnswersDTO);
      }
}
