package com.nlw.events.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nlw.events.dto.SubscriptionResponseDTO;
import com.nlw.events.exception.EventNotFoundException;
import com.nlw.events.exception.SubscriptionConflictException;
import com.nlw.events.exception.UserIndicadorNotFoundException;
import com.nlw.events.model.Subscription;
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

}
