package io.github.joao100101.controledegastos.exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler(Exception.class)
    protected ResponseEntity<ErrorDetails> handleGenericException(Exception exception, WebRequest web){

        return new ResponseEntity<>(new ErrorDetails(new Date(), exception.getMessage(), web.getDescription(false)), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(NotFoundException.class)
    protected ResponseEntity<ErrorDetails> handleNotFoundExceptions(NotFoundException exception, WebRequest web){

        return new ResponseEntity<>(new ErrorDetails(new Date(), exception.getMessage(), web.getDescription(false)), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CategoriaAlreadyExists.class)
    protected ResponseEntity<ErrorDetails> handleCategoriaExists(CategoriaAlreadyExists ex, WebRequest request){
        return new ResponseEntity<>(new ErrorDetails(new Date(), ex.getMessage(), request.getDescription(false)), HttpStatus.NOT_MODIFIED);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {

        ErrorDetails errorDetails = new ErrorDetails(new Date(),
                "Total Errors:" + ex.getErrorCount() + " First Error:" + Objects.requireNonNull(ex.getFieldError()).getDefaultMessage(), request.getDescription(false));


        return new ResponseEntity<>(errorDetails, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    protected ResponseEntity<ErrorDetails> handleConstraintViolationException(ConstraintViolationException e, WebRequest request) {
        List<String> errorMessages = new ArrayList<>();
        e.getConstraintViolations().forEach((constraintViolation -> {
            errorMessages.add(constraintViolation.getMessage());
        }));
        ErrorDetails details = new ErrorDetails(new Date(), errorMessages.get(0), request.getDescription(false));
        return new ResponseEntity<>(details, HttpStatus.BAD_REQUEST);
    }

}
