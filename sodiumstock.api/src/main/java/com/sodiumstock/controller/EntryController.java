package com.sodiumstock.controller;

import com.sodiumstock.model.Entry;
import com.sodiumstock.repository.CompoundRepository;
import com.sodiumstock.repository.EmployeeRepository;
import com.sodiumstock.repository.EntryRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EntryController {

    private final EntryRepository entryRepository;

    public EntryController(EntryRepository entryRepository){
        this.entryRepository = entryRepository;
    }

    @GetMapping("/auth/entry/getAll")
    public List<Entry> getAllEntries() {
        return entryRepository.findAll();
    }

    @PostMapping("/auth/entry/create")
    public Entry addNewEntry(@RequestBody Entry entry) {
        return entryRepository.save(entry);
    }
}
