package com.sodiumstock.controller;

import com.sodiumstock.model.Compound;
import com.sodiumstock.payload.response.MessageResponse;
import com.sodiumstock.repository.CompoundRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://sodiumstock-resources.s3-website.eu-central-1.amazonaws.com/", maxAge = 3600, allowCredentials="true")
@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class CompoundController {

    private CompoundRepository compoundRepository;

    @GetMapping("/auth/compound/getAll")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public List<Compound> getAllCompounds() {
        return compoundRepository.findAll();
    }

    @PostMapping("/auth/compound/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addNewCompound(@RequestBody Compound compound) {
        compoundRepository.save(compound);
        return ResponseEntity.ok(new MessageResponse("Compound registered successfully!"));
    }
}
