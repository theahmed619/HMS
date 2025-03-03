package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private Doctor doctor;

    private String fullName;
    private String gender;
    private String age;
    private String appointmentDate;
    private String email;
    private String phone;
    private String diseases;
    private String address;
    private String status;
}
