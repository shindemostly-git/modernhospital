package com.hospital.backend.service;

import com.hospital.backend.dto.ConsultationRequest;
import com.hospital.backend.entity.Consultation;
import com.hospital.backend.exception.ConsultationNotFoundException;
import com.hospital.backend.exception.DuplicateBookingException;
import com.hospital.backend.repository.ConsultationRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ConsultationService {

    private final ConsultationRepository repository;

    public ConsultationService(ConsultationRepository repository) {
        this.repository = repository;
    }

    public Consultation createConsultation(ConsultationRequest request) {

        boolean alreadyBooked =
                repository.existsByDoctorAndAppointmentDateAndAppointmentTime(
                        request.getDoctor(),
                        request.getAppointmentDate(),
                        request.getAppointmentTime()
                );

        if (alreadyBooked) {
            throw new DuplicateBookingException(
                    "This doctor is already booked for the selected date and time."
            );
        }

        double fee;

        if ("Follow-up".equalsIgnoreCase(request.getVisitType())) {
            fee = 500;
        } else {
            fee = 600;
        }

        Consultation consultation = Consultation.builder()
                .fullName(request.getFullName())
                .mobileNumber(request.getMobileNumber())
                .age(request.getAge())
                .visitType(request.getVisitType())
                .doctor(request.getDoctor())
                .branch(request.getBranch())
                .appointmentDate(request.getAppointmentDate())
                .appointmentTime(request.getAppointmentTime())
                .reason(request.getReason())
                .notes(request.getNotes())
                .consultationFee(fee)
                .status("PENDING")
                .createdAt(LocalDateTime.now())
                .build();

        return repository.save(consultation);
    }

    public List<Consultation> getAllConsultations() {
        return repository.findAll();
    }

    public Consultation getConsultationById(Long id) {

        return repository.findById(id)
                .orElseThrow(() ->
                        new ConsultationNotFoundException("Consultation not found with id: " + id)
                );
    }

    public List<Consultation> getByDate(
            java.time.LocalDate date
    ) {
        return repository.findByAppointmentDate(date);
    }

    public List<Consultation> getByDoctorAndDate(
            String doctor,
            java.time.LocalDate date
    ) {
        return repository.findByDoctorAndAppointmentDate(
                doctor,
                date
        );
    }

    public List<Consultation> getByMobile(
            String mobile
    ) {
        return repository.findByMobileNumber(mobile);
    }

    public Consultation updateStatus(
            Long id,
            String status
    ) {

        Consultation consultation = getConsultationById(id);

        consultation.setStatus(status);

        return repository.save(consultation);
    }

    public void deleteConsultation(Long id) {

        if (!repository.existsById(id)) {
            throw new ConsultationNotFoundException("Consultation not found");
        }

        repository.deleteById(id);
    }
}