package __RestAPI.__Rest.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsManager userDetailsManager;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody JwtAuthRequest request) {

        try {
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());

            authenticationManager.authenticate(authToken);

            UserDetails userDetails = userDetailsManager.loadUserByUsername(request.getUsername());

            String token = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(new JwtAuthResponse(token));

        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(401).body("Invalid username or password");
        } catch (DisabledException ex) {
            return ResponseEntity.status(403).body("User disabled");
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(500).body("Authentication error: " + ex.getMessage());
        }
    }
}