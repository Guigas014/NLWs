package com.nlw.events.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.nlw.events.dto.ErrorMessage;
import com.nlw.events.exception.EventNotFoundException;
import com.nlw.events.exception.SubscriptionConflictException;
import com.nlw.events.exception.UserIndicadorNotFoundException;

@ControllerAdvice
public class ExceptionEntityHandler {

      @ExceptionHandler(EventNotFoundException.class)
      public ResponseEntity<ErrorMessage> handleEventNotFound(EventNotFoundException e) {
            return ResponseEntity.badRequest().body(new ErrorMessage(e.getMessage()));
      }

      @ExceptionHandler(SubscriptionConflictException.class)
      public ResponseEntity<ErrorMessage> handleSubscriptionConflictException(SubscriptionConflictException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorMessage(e.getMessage()));
      }

      @ExceptionHandler(UserIndicadorNotFoundException.class)
      public ResponseEntity<ErrorMessage> handleUserIndicadorNotFoundException(UserIndicadorNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorMessage(e.getMessage()));
      }

}
