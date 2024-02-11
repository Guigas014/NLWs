package com.rocketseat.nlwexpert14.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rocketseat.nlwexpert14.model.CertificationStudentEntity;
import com.rocketseat.nlwexpert14.services.RankingService;

@RestController
@RequestMapping("/ranking")
public class RankingController {

      @Autowired
      private RankingService rankingService;

      @GetMapping("/top10")
      public List<CertificationStudentEntity> top10() {

            return this.rankingService.execute();
      }
}
