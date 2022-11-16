package com.sodiumstock.controller;

import com.sodiumstock.model.ERole;
import com.sodiumstock.model.Employee;
import com.sodiumstock.model.Role;
import com.sodiumstock.payload.request.LoginRequest;
import com.sodiumstock.payload.request.NewEmployeeRequest;
import com.sodiumstock.payload.response.JwtResponse;
import com.sodiumstock.payload.response.MessageResponse;
import com.sodiumstock.repository.EmployeeRepository;
import com.sodiumstock.repository.RoleRepository;
import com.sodiumstock.security.jwt.JwtUtils;
import com.sodiumstock.security.services.UserDetailsImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth/employee")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;


    public EmployeeController(EmployeeRepository employeeRepository, AuthenticationManager authenticationManager, RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils) {
        this.employeeRepository = employeeRepository;
        this.authenticationManager = authenticationManager;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        String role = String.valueOf(userDetails.getRole());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                role));
    }
    @PostMapping("/create")
    public ResponseEntity<?> registerUser(@Valid @RequestBody NewEmployeeRequest newEmployeeRequest) {
        if (employeeRepository.existsByUsername(newEmployeeRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        // Create new user's account
        Employee employee = new Employee(
                newEmployeeRequest.getUsername(),
                newEmployeeRequest.getFirstName(),
                newEmployeeRequest.getLastName(),
                newEmployeeRequest.getPhoneNumber(),
                newEmployeeRequest.getEmail(),
                encoder.encode(newEmployeeRequest.getPassword()));

        String role = newEmployeeRequest.getRole();
        Role newRole = null;

        if (role == null || role.equals("user")) {
            Role userRole = roleRepository.findByName(ERole.USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            newRole = userRole;
        } else if(role.equals("admin")){
            Role adminRole = roleRepository.findByName(ERole.ADMIN)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            newRole = adminRole;
        }
        employee.setRole(newRole);
        employeeRepository.save(employee);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @GetMapping("/getAll")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
}
