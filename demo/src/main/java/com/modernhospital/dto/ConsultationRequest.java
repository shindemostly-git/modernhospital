package com.hospital.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConsultationRequest {

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Enter a valid 10-digit mobile number")
    private String mobileNumber;

    @Min(value = 0, message = "Age must be positive")
    @Max(value = 130, message = "Enter a valid age")
    private Integer age;

    @NotBlank(message = "Visit type is required")
    private String visitType;

    @NotBlank(message = "Doctor is required")
    private String doctor;

    @NotBlank(message = "Branch is required")
    private String branch;

    @NotNull(message = "Appointment date is required")
    @FutureOrPresent(message = "Appointment date cannot be in the past")
    private LocalDate appointmentDate;

    @NotNull(message = "Appointment time is required")
    private LocalTime appointmentTime;

    private String reason;

    @Size(max = 1000, message = "Notes must be under 1000 characters")
    private String notes;
}