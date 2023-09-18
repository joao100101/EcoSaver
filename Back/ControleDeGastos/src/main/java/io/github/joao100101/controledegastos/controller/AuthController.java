package io.github.joao100101.controledegastos.controller;

import io.github.joao100101.controledegastos.model.User;
import io.github.joao100101.controledegastos.model.dto.AuthenticationDTO;
import io.github.joao100101.controledegastos.model.dto.LoginResponseDTO;
import io.github.joao100101.controledegastos.model.dto.RegisterDTO;
import io.github.joao100101.controledegastos.model.dto.RegisterStaffDTO;
import io.github.joao100101.controledegastos.repository.UserRepository;
import io.github.joao100101.controledegastos.service.impl.security.TokenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@CrossOrigin
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final TokenService tokenService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, TokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody @Valid AuthenticationDTO data){
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());
        var auth = authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((User)auth.getPrincipal());

        return ResponseEntity.ok(new LoginResponseDTO(token));
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterDTO data){
        if(this.userRepository.findByEmail(data.email()) != null){
            return new ResponseEntity<>("Email ou usuario já cadastrados.", HttpStatus.BAD_REQUEST);
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.name(), data.email(), data.username(), encryptedPassword);

        this.userRepository.save(newUser);

        return new ResponseEntity<>( "Usuario registrado com sucesso.", HttpStatus.CREATED);

    }


    @PostMapping("/register/staff")
    public ResponseEntity<String> registerStaff(@RequestBody @Valid RegisterStaffDTO data){
        if(this.userRepository.findByEmail(data.email()) != null){
            return new ResponseEntity<>("Email ou usuario já cadastrados.", HttpStatus.BAD_REQUEST);
        }

        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.name(), data.email(), data.username(),encryptedPassword, data.role());

        this.userRepository.save(newUser);

        return new ResponseEntity<>( "Usuario registrado com sucesso.", HttpStatus.CREATED);

    }

    @GetMapping("/check/{email}")
    public ResponseEntity<Boolean> checkAuth(@PathVariable String email, @RequestParam String token){
        return ResponseEntity.ok(tokenService.validateToken(token).equals(email));
    }

}


