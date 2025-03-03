package com.hms.controller;


import com.hms.entity.Specialist;
import com.hms.service.SpecialistService;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/specialists")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend
public class SpecialistController {

    @Autowired
    private SpecialistService specialistService;

    @GetMapping
    public ResponseEntity<List<Specialist>> getAllSpecialists() {
        List<Specialist> specialists = specialistService.getAllSpecialists();
        return ResponseEntity.ok(specialists);
    }
}
