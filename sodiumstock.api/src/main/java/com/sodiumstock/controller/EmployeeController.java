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
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;


    public EmployeeController(EmployeeRepository employeeRepository,
                              AuthenticationManager authenticationManager,
                              RoleRepository roleRepository,
                              PasswordEncoder encoder,
                              JwtUtils jwtUtils) {
        this.employeeRepository = employeeRepository;
        this.authenticationManager = authenticationManager;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }
    @PostMapping("/all/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(),
                        loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getEmail(),
                roles));
    }
    @PostMapping("/auth/employee/create")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> registerUser(@Valid @RequestBody NewEmployeeRequest newEmployeeRequest) {
        if (employeeRepository.existsByUsername(newEmployeeRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }
        if (employeeRepository.existsByEmail(newEmployeeRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already taken!"));
        }

        // Create new user's account
        Employee employee = new Employee(
                newEmployeeRequest.getUsername(),
                newEmployeeRequest.getFirstName(),
                newEmployeeRequest.getLastName(),
                newEmployeeRequest.getEmail(),
                newEmployeeRequest.getPhoneNumber(),
                encoder.encode(newEmployeeRequest.getPassword()));

        Set<String> stringRoles = newEmployeeRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (stringRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            stringRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        employee.setRoles(roles);
        employeeRepository.save(employee);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @GetMapping("/auth/employee/getAll")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }
}
