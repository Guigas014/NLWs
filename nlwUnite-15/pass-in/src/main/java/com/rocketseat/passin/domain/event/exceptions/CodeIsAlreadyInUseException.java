package com.rocketseat.passin.domain.event.exceptions;

public class CodeIsAlreadyInUseException extends RuntimeException {

      public CodeIsAlreadyInUseException(String message) {
            super(message);
      }
}
