package com.sodiumstock.controller;

import com.sodiumstock.model.Role;
import com.sodiumstock.payload.response.MessageResponse;
import com.sodiumstock.repository.RoleRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@AllArgsConstructor
@RequestMapping("/api")
public class RoleController {

        private RoleRepository roleRepository;

        @PostMapping("/auth/role/create")
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<?> addNewRole(@RequestBody Role role) {
                roleRepository.save(role);
                return ResponseEntity.ok(new MessageResponse("Role registered successfully!"));
        }
}
