package com.sentinel.api.controller;

import com.sentinel.api.dto.demo.DemoLoginRequest;
import com.sentinel.api.dto.demo.OrderRequest;
import com.sentinel.api.dto.demo.OrderResponse;
import com.sentinel.api.dto.demo.ProductResponse;
import com.sentinel.api.dto.demo.UserDemoResponse;
import com.sentinel.api.exception.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@RestController
@RequestMapping("/api/demo")
public class DemoController {

    private final String demoUsername;
    private final String demoPassword;

    // Sample in-memory catalog
    private static final List<ProductResponse> SAMPLE_PRODUCTS = List.of(
            new ProductResponse(1L, "Keyboard", 799),
            new ProductResponse(2L, "Mouse", 399)
    );

    // Sample in-memory demo users
    private static final Map<Long, UserDemoResponse> SAMPLE_USERS = Map.of(
            1L, new UserDemoResponse(1L, "Demo User", "demo@example.com")
    );

    // In-memory orders store
    private final Map<Long, OrderResponse> orders = new ConcurrentHashMap<>();
    private final AtomicLong orderIdGenerator = new AtomicLong(100);

    public DemoController(
            @Value("${DEMO_USERNAME:demo}") String demoUsername,
            @Value("${DEMO_PASSWORD:DemoPass123!}") String demoPassword) {
        this.demoUsername = demoUsername;
        this.demoPassword = demoPassword;

        // Pre-seed order with ID 1
        orders.put(1L, new OrderResponse(1L, 1L, 2, "COMPLETED"));
    }

    /**
     * A. Retrieve sample products
     * GET /api/demo/products -> 200 OK
     */
    @GetMapping("/products")
    public ResponseEntity<List<ProductResponse>> getProducts() {
        return ResponseEntity.ok(SAMPLE_PRODUCTS);
    }

    /**
     * B. Retrieve demo user
     * GET /api/demo/users/{id} -> 200 OK or 404 Not Found
     */
    @GetMapping("/users/{id}")
    public ResponseEntity<UserDemoResponse> getUserById(@PathVariable Long id) {
        UserDemoResponse user = SAMPLE_USERS.get(id);
        if (user == null) {
            throw new ResourceNotFoundException("Demo user with ID " + id + " not found");
        }
        return ResponseEntity.ok(user);
    }

    /**
     * C. Demo login (Traffic-generation target only)
     * POST /api/demo/login -> 200 OK or 401 Unauthorized
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> demoLogin(@Valid @RequestBody DemoLoginRequest request) {
        if (demoUsername.equals(request.getUsername()) && demoPassword.equals(request.getPassword())) {
            return ResponseEntity.ok(Map.of(
                    "status", "SUCCESS",
                    "message", "Demo login successful"
            ));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                "status", "UNAUTHORIZED",
                "message", "Invalid demo credentials"
        ));
    }

    /**
     * D. Create an order
     * POST /api/demo/orders -> 201 Created or 400 Bad Request
     */
    @PostMapping("/orders")
    public ResponseEntity<OrderResponse> createOrder(@Valid @RequestBody OrderRequest request) {
        long newOrderId = orderIdGenerator.incrementAndGet();
        OrderResponse order = new OrderResponse(
                newOrderId,
                request.getProductId(),
                request.getQuantity(),
                "CREATED"
        );
        orders.put(newOrderId, order);
        return ResponseEntity.status(HttpStatus.CREATED).body(order);
    }

    /**
     * E. Retrieve an order
     * GET /api/demo/orders/{id} -> 200 OK or 404 Not Found
     */
    @GetMapping("/orders/{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long id) {
        OrderResponse order = orders.get(id);
        if (order == null) {
            throw new ResourceNotFoundException("Order with ID " + id + " not found");
        }
        return ResponseEntity.ok(order);
    }
}
