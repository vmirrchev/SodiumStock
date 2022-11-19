package com.sodiumstock.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class JwtResponse {
        private Long id;
        private String username;
        private String email;
        private List<String> roles;
        private String token;
        private final String type = "Bearer";
}
