package com.lms.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<String> handleEmailAlreadyExists(
            EmailAlreadyExistsException ex) {

        return new ResponseEntity<>(
                ex.getMessage(),
                HttpStatus.CONFLICT
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<String> handleValidationErrors(
        MethodArgumentNotValidException ex) {

    String errorMessage = ex.getBindingResult()
            .getFieldErrors()
            .get(0)
            .getDefaultMessage();

    return new ResponseEntity<>(
            errorMessage,
            HttpStatus.BAD_REQUEST
    );
}


@ExceptionHandler(InvalidCredentialsException.class)
public ResponseEntity<String> handleInvalidCredentials(
        InvalidCredentialsException ex) {

    return new ResponseEntity<>(
            ex.getMessage(),
            HttpStatus.UNAUTHORIZED
    );
}
}