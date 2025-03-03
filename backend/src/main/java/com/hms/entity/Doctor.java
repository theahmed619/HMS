package com.hms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "doctors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String fullName;
    private String dateOfBirth;
    private String qualification;
    private String specialist;
    
    @Column(unique = true, nullable = false)
    private String email;

    private String phone;
    private String password;
}
