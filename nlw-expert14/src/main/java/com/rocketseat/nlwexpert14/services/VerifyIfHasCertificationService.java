package com.rocketseat.nlwexpert14.services;

import org.springframework.stereotype.Service;

import com.rocketseat.nlwexpert14.dto.VerifyHasCertificationDTO;

@Service
public class VerifyIfHasCertificationService {

      public boolean execute(VerifyHasCertificationDTO dto) {
            if (dto.getEmail().equals("guigui@gmail.com") && dto.getTechnology().equals("Java")) {
                  return true;
            }
            return false;
      }
}
