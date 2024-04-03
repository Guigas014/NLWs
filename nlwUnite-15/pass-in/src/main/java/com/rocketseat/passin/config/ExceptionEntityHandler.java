package com.rocketseat.passin.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.rocketseat.passin.domain.attendee.exceptions.AttendeeAlreadyExistException;
import com.rocketseat.passin.domain.attendee.exceptions.AttendeeNotFoundException;
import com.rocketseat.passin.domain.checkin.exceptions.CheckInAlreadyExistsException;
import com.rocketseat.passin.domain.event.exceptions.EventFullException;
import com.rocketseat.passin.domain.event.exceptions.EventNotFoundException;
import com.rocketseat.passin.dto.general.ErrorResponseDTO;

@ControllerAdvice
public class ExceptionEntityHandler {

      @ExceptionHandler(EventNotFoundException.class)
      public ResponseEntity handleEventNotFound(EventNotFoundException e) {
            return ResponseEntity.notFound().build();
      }

      @ExceptionHandler(EventFullException.class)
      public ResponseEntity<ErrorResponseDTO> handleEventFull(EventFullException e) {
            return ResponseEntity.badRequest().body(new ErrorResponseDTO(e.getMessage()));
      }

      @ExceptionHandler(AttendeeNotFoundException.class)
      public ResponseEntity handleAteendeeNotFound(AttendeeNotFoundException e) {
            return ResponseEntity.notFound().build();
      }

      @ExceptionHandler(AttendeeAlreadyExistException.class)
      public ResponseEntity handleAteendeeAlreadyExist(AttendeeAlreadyExistException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
      }

      @ExceptionHandler(CheckInAlreadyExistsException.class)
      public ResponseEntity handleCheckInAlreadyExistsException(CheckInAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
      }
}
