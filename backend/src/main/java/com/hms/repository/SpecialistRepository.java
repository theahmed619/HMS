package com.hms.repository;

import com.hms.entity.Specialist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SpecialistRepository extends JpaRepository<Specialist, Integer> {
    // No need to write queries manually, JPA handles them automatically
}
