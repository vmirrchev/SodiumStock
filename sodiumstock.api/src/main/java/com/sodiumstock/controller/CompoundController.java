package com.sodiumstock.controller;

import com.sodiumstock.model.Compound;
import com.sodiumstock.repository.CompoundRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class CompoundController {

    private final CompoundRepository compoundRepository;

    public CompoundController(CompoundRepository compoundRepository) {
        this.compoundRepository = compoundRepository;
    }

    @GetMapping("/auth/compound/getAll")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public List<Compound> getAllCompounds() {
        return compoundRepository.findAll();
    }

    @PostMapping("/auth/compound/create")
    @PreAuthorize("hasRole('ADMIN')")
    public Compound addNewCompound(@RequestBody Compound compound) {
        return compoundRepository.save(compound);
    }
}
