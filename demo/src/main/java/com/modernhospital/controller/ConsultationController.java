package com.hospital.backend.controller;

import com.hospital.backend.dto.ConsultationRequest;
import com.hospital.backend.entity.Consultation;
import com.hospital.backend.service.ConsultationService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/consultations")
public class ConsultationController {

    private final ConsultationService service;

    public ConsultationController(ConsultationService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Consultation> createConsultation(@Valid @RequestBody ConsultationRequest request) {
        Consultation created = service.createConsultation(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    public ResponseEntity<List<Consultation>> getAllConsultations() {
        return ResponseEntity.ok(service.getAllConsultations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Consultation> getConsultationById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getConsultationById(id));
    }

    @GetMapping("/by-date")
    public ResponseEntity<List<Consultation>> getByDate(
            @RequestParam @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(service.getByDate(date));
    }

    @GetMapping("/by-doctor-date")
    public ResponseEntity<List<Consultation>> getByDoctorAndDate(
            @RequestParam String doctor,
            @RequestParam @org.springframework.format.annotation.DateTimeFormat(iso = org.springframework.format.annotation.DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(service.getByDoctorAndDate(doctor, date));
    }

    @GetMapping("/by-mobile")
    public ResponseEntity<List<Consultation>> getByMobile(@RequestParam String mobile) {
        return ResponseEntity.ok(service.getByMobile(mobile));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Consultation> updateStatus(@PathVariable Long id, @RequestParam String status) {
        return ResponseEntity.ok(service.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConsultation(@PathVariable Long id) {
        service.deleteConsultation(id);
        return ResponseEntity.noContent().build();
    }
}