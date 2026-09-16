package com.hospital.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(
        name = "consultations",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "unique_doctor_booking",
                        columnNames = {"doctor", "appointment_date", "appointment_time"}
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Patient details

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, length = 10)
    private String mobileNumber;

    private Integer age;

    @Column(nullable = false)
    private String visitType;

    // Doctor

    @Column(nullable = false)
    private String doctor;

    // Branch

    @Column(nullable = false)
    private String branch;

    // Appointment

    @Column(name = "appointment_date", nullable = false)
    private LocalDate appointmentDate;

    @Column(name = "appointment_time", nullable = false)
    private LocalTime appointmentTime;

    // Reason

    private String reason;

    @Column(columnDefinition = "TEXT")
    private String notes;

    // Fee

    private Double consultationFee;

    // Status

    @Column(nullable = false)
    private String status;

    // Created timestamp

    @Column(nullable = false)
    private LocalDateTime createdAt;
}