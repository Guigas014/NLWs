package com.rocketseat.nlwexpert14.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rocketseat.nlwexpert14.model.CertificationStudentEntity;
import com.rocketseat.nlwexpert14.repositories.CertificationStudentRepository;

@Service
public class RankingService {

      @Autowired
      private CertificationStudentRepository certificationStudentRepository;

      public List<CertificationStudentEntity> execute() {
            var result = this.certificationStudentRepository.findTop10ByOrderByGradeDesc();

            System.out.println(result);

            return result;
      }
}
