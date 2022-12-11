package com.sodiumstock.controller;

import com.sodiumstock.model.Compound;
import com.sodiumstock.model.Employee;
import com.sodiumstock.model.Entry;
import com.sodiumstock.payload.request.EntryRequest;
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
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600, allowCredentials="true")
@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class EntryController {

    private EntryRepository entryRepository;
    private EmployeeRepository employeeRepository;
    private CompoundRepository compoundRepository;

    @GetMapping("/auth/entry/getAll")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public List<Entry> getAllEntries() {
        return entryRepository.findAll();
    }

    @PostMapping("/auth/entry/create")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<?> addNewEntry(@RequestBody EntryRequest entryRequest) {
        if (!employeeRepository.existsById(entryRequest.getEmployeeId())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Employee ID is not valid!"));
        }
        if (!compoundRepository.existsById(entryRequest.getCompoundId())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Compound ID is not valid!"));
        }
        Employee employee = employeeRepository.findById(entryRequest.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Error: Employee is not found."));
        Compound compound = compoundRepository.findById(entryRequest.getCompoundId())
                .orElseThrow(() -> new RuntimeException("Error: Compound is not found."));

        Entry entry = new Entry(
                employee,
                compound,
                entryRequest.getEntryDate(),
                entryRequest.getExpirationDate()
        );
        entryRepository.save(entry);
        return ResponseEntity.ok(new MessageResponse("Entry registered successfully!"));
    }
    @DeleteMapping("/auth/entry/delete")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public ResponseEntity<MessageResponse> deleteEntry(@RequestParam Long id) {
        Entry entry = entryRepository.findById(id)
                        .orElseThrow(() -> new RuntimeException("Error: Entry is not found."));
        entryRepository.delete(entry);
        return ResponseEntity
                .ok(new MessageResponse("Entry deleted successfully!"));
    }
}
