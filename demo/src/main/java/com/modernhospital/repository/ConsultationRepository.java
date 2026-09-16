package com.hospital.backend.repository;

import com.hospital.backend.entity.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ConsultationRepository
        extends JpaRepository<Consultation, Long> {

    boolean existsByDoctorAndAppointmentDateAndAppointmentTime(
            String doctor,
            LocalDate appointmentDate,
            LocalTime appointmentTime
    );

    List<Consultation> findByAppointmentDate(LocalDate date);

    List<Consultation> findByDoctorAndAppointmentDate(
            String doctor,
            LocalDate date
    );

    List<Consultation> findByMobileNumber(String mobileNumber);
}