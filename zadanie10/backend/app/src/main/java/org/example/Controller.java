package org.example;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        LoginResponse response = authService.validateLogin(request.getEmail(), request.getPassword());
        return response.isSuccess() ? 
            ResponseEntity.ok(response) : 
            ResponseEntity.status(401).body(response);
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody LoginRequest request) {
        LoginResponse response = authService.registerUser(request.getEmail(), request.getPassword());
        return response.isSuccess()
            ? ResponseEntity.status(201).body(response)
            : ResponseEntity.status(400).body(response);
    }
}