package org.example;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
class AuthService { 
    private final UserRepository userRepo;
    private final BCryptPasswordEncoder encoder;

    public AuthService(UserRepository userRepo, BCryptPasswordEncoder encoder) {
        this.userRepo = userRepo;
        this.encoder = encoder;
    }

    public LoginResponse validateLogin(String email, String password) {
        if (email == null || email.isEmpty() || password == null || password.isEmpty()) {
            return new LoginResponse(false, "Podaj email i hasło"); 
        }

        Optional<User> user = userRepo.findByEmail(email);
        if (user.isEmpty()) {
            return new LoginResponse(false, "Konto nie istnieje");
        }

        User foundUser = user.get();
        if (encoder.matches(password, foundUser.getPasswordHash())) {
            return new LoginResponse(true, "Zalogowano pomyślnie", foundUser.getId());
        } else {
            return new LoginResponse(false, "Nieprawidłowe hasło");
        }
    }
}

class LoginRequest {
    private String email;
    private String password;

    public LoginRequest() {}
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}

class LoginResponse {
    private boolean success;
    private String message;
    private Long userId;

    public LoginResponse(boolean success, String message) {
        this(success, message, null);
    }
    public LoginResponse(boolean success, String message, Long userId) {
        this.success = success;
        this.message = message;
        this.userId = userId;
    }

    public boolean isSuccess() { return success; }
    public String getMessage() { return message; }
    public Long getUserId() { return userId; }
}

@Repository
interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}