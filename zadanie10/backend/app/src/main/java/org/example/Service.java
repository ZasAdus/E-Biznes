package org.example;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
class AuthService { 
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");

    private final UserRepository userRepo;
    private final BCryptPasswordEncoder encoder;

    public AuthService(UserRepository userRepo, BCryptPasswordEncoder encoder) {
        this.userRepo = userRepo;
        this.encoder = encoder;
    }

    public LoginResponse validateLogin(String email, String password) {
        if (email == null || email.isBlank() || password == null || password.isBlank()) {
            return new LoginResponse(false, "Podaj email i hasło"); 
        }

        if (!isValidEmail(email)) {
            return new LoginResponse(false, "Podaj poprawny adres e-mail");
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

    public LoginResponse registerUser(String email, String password) {
        if (email == null || email.isBlank() || password == null || password.isBlank()) {
            return new LoginResponse(false, "Podaj email i hasło");
        }

        if (!isValidEmail(email)) {
            return new LoginResponse(false, "Podaj poprawny adres e-mail");
        }

        if (userRepo.findByEmail(email).isPresent()) {
            return new LoginResponse(false, "Konto już istnieje");
        }

        User newUser = new User(email, encoder.encode(password));
        User savedUser = userRepo.save(newUser);
        return new LoginResponse(true, "Rejestracja zakończona pomyślnie", savedUser.getId());
    }

    private boolean isValidEmail(String email) {
        return EMAIL_PATTERN.matcher(email.trim()).matches();
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