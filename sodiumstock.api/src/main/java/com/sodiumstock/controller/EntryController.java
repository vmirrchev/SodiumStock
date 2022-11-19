package com.sodiumstock.controller;

import com.sodiumstock.model.Entry;
import com.sodiumstock.payload.response.MessageResponse;
import com.sodiumstock.repository.CompoundRepository;
import com.sodiumstock.repository.EmployeeRepository;
import com.sodiumstock.repository.EntryRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class EntryController {

    private EntryRepository entryRepository;

    @GetMapping("/auth/entry/getAll")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public List<Entry> getAllEntries() {
        return entryRepository.findAll();
    }

    @PostMapping("/auth/entry/create")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> addNewEntry(@RequestBody Entry entry) {
        entryRepository.save(entry);
        return ResponseEntity.ok(new MessageResponse("Entry registered successfully!"));
    }
}
