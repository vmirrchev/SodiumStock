package com.sodiumstock.controller;

import com.sodiumstock.model.Compound;
import com.sodiumstock.repository.CompoundRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth/compound")
public class CompoundController {

    private final CompoundRepository compoundRepository;

    public CompoundController(CompoundRepository compoundRepository) {
        this.compoundRepository = compoundRepository;
    }

    @GetMapping
    public List<Compound> getAllCompounds() {
        return compoundRepository.findAll();
    }
    @PostMapping
    public Compound addNewCompound(@RequestBody Compound compound) {
        return compoundRepository.save(compound);
    }
}
