package com.sodiumstock.controller;

import com.sodiumstock.model.Entry;
import com.sodiumstock.repository.CompoundRepository;
import com.sodiumstock.repository.EmployeeRepository;
import com.sodiumstock.repository.EntryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entry")
public class EntryController {

    private final EntryRepository entryRepository;

    public EntryController(EntryRepository entryRepository){
        this.entryRepository = entryRepository;
    }

    @GetMapping
    public List<Entry> getAllEntries() {
        return entryRepository.findAll();
    }

    @PostMapping
    public Entry addNewEntry(@RequestBody Entry entry) {
        return entryRepository.save(entry);
    }
}
