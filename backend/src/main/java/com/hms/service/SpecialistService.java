package com.hms.service;

import com.hms.entity.Specialist;
import com.hms.repository.SpecialistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecialistService {

    @Autowired
    private SpecialistRepository specialistRepository;

    // Add new specialist
    public Specialist addSpecialist(String specialistName) {
        Specialist specialist = new Specialist();
        specialist.setSpecialistName(specialistName);
        return specialistRepository.save(specialist);
    }

    // Get all specialists
    public List<Specialist> getAllSpecialists() {
        return specialistRepository.findAll();
    }
}
