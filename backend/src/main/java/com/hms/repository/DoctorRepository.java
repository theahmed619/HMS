package com.hms.repository;

import com.hms.entity.Doctor;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
   

    long count();

    List<Doctor> findByFullNameContainingOrSpecialistContaining(String keyword, String keyword2);
    
    Doctor findByEmailAndPassword(String email, String password);
}
