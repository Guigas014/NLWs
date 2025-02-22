package com.nlw.events.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nlw.events.dto.SubscriptionRankingByUserDTO;
import com.nlw.events.dto.SubscriptionRankingItemDTO;
import com.nlw.events.dto.SubscriptionResponseDTO;
import com.nlw.events.exception.EventNotFoundException;
import com.nlw.events.exception.SubscriptionConflictException;
import com.nlw.events.exception.UserIndicadorNotFoundException;
import com.nlw.events.model.User;
import com.nlw.events.service.SubscriptionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SubscriptionController {

      private final SubscriptionService subscriptionService;

      @PostMapping({ "/subscription/{prettyName}", "/subscription/{prettyName}/{userId}" })
      public ResponseEntity<SubscriptionResponseDTO> createSubscription(@RequestBody User subscriber,
                  @PathVariable String prettyName, @PathVariable(required = false) Integer userId) {

            try {
                  SubscriptionResponseDTO subscription = subscriptionService.createNewSubscription(prettyName,
                              subscriber, userId);

                  if (subscription != null) {
                        return ResponseEntity.status(HttpStatus.CREATED).body(subscription);
                  }
            } catch (EventNotFoundException error) {
                  throw new EventNotFoundException(error.getMessage());
            } catch (SubscriptionConflictException error) {
                  throw new SubscriptionConflictException(error.getMessage());
            } catch (UserIndicadorNotFoundException error) {
                  throw new UserIndicadorNotFoundException(error.getMessage());
            }

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
      }

      @GetMapping("/subscription/{prettyName}/ranking")
      public ResponseEntity<List<SubscriptionRankingItemDTO>> generateRankingByEvent(@PathVariable String prettyName) {
            try {
                  List<SubscriptionRankingItemDTO> ranking = subscriptionService.getCompleteRanking(prettyName)
                              .subList(0, 3);

                  return ResponseEntity.status(HttpStatus.OK).body(ranking);

            } catch (EventNotFoundException error) {
                  throw new EventNotFoundException(error.getMessage());
            }
      }

      @GetMapping("/subscription/{prettyName}/ranking/{userId}")
      public ResponseEntity<SubscriptionRankingByUserDTO> generateRankingByEventAndUser(@PathVariable String prettyName,
                  @PathVariable Integer userId) {
            try {
                  SubscriptionRankingByUserDTO userRanking = subscriptionService.getRankingByUser(prettyName, userId);

                  return ResponseEntity.status(HttpStatus.OK).body(userRanking);
            } catch (UserIndicadorNotFoundException error) {
                  throw new UserIndicadorNotFoundException(error.getMessage());
            }
      }

}
