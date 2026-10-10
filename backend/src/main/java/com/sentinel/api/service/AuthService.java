package com.sentinel.api.service;

import com.sentinel.api.dto.auth.LoginRequest;
import com.sentinel.api.dto.auth.LoginResponse;
import com.sentinel.api.entity.Role;
import com.sentinel.api.entity.User;
import com.sentinel.api.repository.UserRepository;
import com.sentinel.api.security.JwtService;
import jakarta.annotation.PostConstruct;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager,
                       UserDetailsService userDetailsService,
                       JwtService jwtService,
                       UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    @Transactional
    public void seedInitialUsers() {
        if (!userRepository.existsByUsername("admin")) {
            userRepository.save(new User("admin", passwordEncoder.encode("admin123"), "admin@sentinel.local", Role.ROLE_ADMIN));
        }
        if (!userRepository.existsByUsername("analyst")) {
            userRepository.save(new User("analyst", passwordEncoder.encode("analyst123"), "analyst@sentinel.local", Role.ROLE_ANALYST));
        }
        if (!userRepository.existsByUsername("viewer")) {
            userRepository.save(new User("viewer", passwordEncoder.encode("viewer123"), "viewer@sentinel.local", Role.ROLE_VIEWER));
        }
    }

    public LoginResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        String token = jwtService.generateToken(userDetails);
        String role = userDetails.getAuthorities().stream().findFirst().map(Object::toString).orElse("ROLE_VIEWER");

        return new LoginResponse(token, userDetails.getUsername(), role);
    }
}
