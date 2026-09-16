package com.modernhospital.booking;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"com.modernhospital.booking", "com.hospital.backend"})
@EntityScan(basePackages = {"com.modernhospital.booking", "com.hospital.backend"})
@EnableJpaRepositories(basePackages = {"com.modernhospital.booking", "com.hospital.backend"})
public class BookingApplication {
    public static void main(String[] args) {
        SpringApplication.run(BookingApplication.class, args);
        System.out.println("booking application started succesfuly");
    }
}