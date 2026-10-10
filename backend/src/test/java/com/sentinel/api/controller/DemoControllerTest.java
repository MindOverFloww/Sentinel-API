package com.sentinel.api.controller;

import com.sentinel.api.repository.ApiEventRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.notNullValue;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class DemoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ApiEventRepository apiEventRepository;

    @Test
    @DisplayName("1. GET /api/demo/products returns 200 and list of products")
    void getProducts_Returns200AndProductList() throws Exception {
        mockMvc.perform(get("/api/demo/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(2))))
                .andExpect(jsonPath("$[0].name", is("Keyboard")))
                .andExpect(jsonPath("$[0].price", is(799)));
    }

    @Test
    @DisplayName("2. GET /api/demo/users/{id} returns 200 for existing user")
    void getUserById_ExistingId_Returns200AndUser() throws Exception {
        mockMvc.perform(get("/api/demo/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.name", is("Demo User")))
                .andExpect(jsonPath("$.email", is("demo@example.com")));
    }

    @Test
    @DisplayName("3. GET /api/demo/users/{id} returns 404 for unknown user")
    void getUserById_UnknownId_Returns404() throws Exception {
        mockMvc.perform(get("/api/demo/users/999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)))
                .andExpect(jsonPath("$.message", notNullValue()));
    }

    @Test
    @DisplayName("4. POST /api/demo/login returns 200 for valid demo credentials")
    void demoLogin_ValidCredentials_Returns200() throws Exception {
        String validJson = """
                {
                    "username": "demo",
                    "password": "DemoPass123!"
                }
                """;

        mockMvc.perform(post("/api/demo/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status", is("SUCCESS")))
                .andExpect(jsonPath("$.message", is("Demo login successful")));
    }

    @Test
    @DisplayName("5. POST /api/demo/login returns 401 for invalid demo credentials")
    void demoLogin_InvalidCredentials_Returns401() throws Exception {
        String invalidJson = """
                {
                    "username": "demo",
                    "password": "WrongPassword123"
                }
                """;

        mockMvc.perform(post("/api/demo/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidJson))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status", is("UNAUTHORIZED")));
    }

    @Test
    @DisplayName("6. POST /api/demo/orders returns 201 for valid order input")
    void createOrder_ValidPayload_Returns201() throws Exception {
        String validOrder = """
                {
                    "productId": 1,
                    "quantity": 2
                }
                """;

        mockMvc.perform(post("/api/demo/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(validOrder))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.productId", is(1)))
                .andExpect(jsonPath("$.quantity", is(2)))
                .andExpect(jsonPath("$.status", is("CREATED")));
    }

    @Test
    @DisplayName("7. POST /api/demo/orders returns 400 for invalid order payload")
    void createOrder_InvalidQuantity_Returns400() throws Exception {
        String invalidOrder = """
                {
                    "productId": 1,
                    "quantity": 0
                }
                """;

        mockMvc.perform(post("/api/demo/orders")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidOrder))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.status", is(400)));
    }

    @Test
    @DisplayName("8. GET /api/demo/orders/{id} returns 200 for existing order")
    void getOrderById_ExistingOrder_Returns200() throws Exception {
        mockMvc.perform(get("/api/demo/orders/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(1)))
                .andExpect(jsonPath("$.status", is("COMPLETED")));
    }

    @Test
    @DisplayName("9. GET /api/demo/orders/{id} returns 404 for unknown order")
    void getOrderById_UnknownOrder_Returns404() throws Exception {
        mockMvc.perform(get("/api/demo/orders/9999"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status", is(404)));
    }

    @Test
    @DisplayName("10. Automatic event capture records request and GET /api/events retrieves it")
    void eventLoggingAndRetrieval_EndToEnd() throws Exception {
        // Issue request to demo endpoint
        mockMvc.perform(get("/api/demo/products"))
                .andExpect(status().isOk());

        // Verify event was saved to repository
        assertTrue(apiEventRepository.count() > 0, "Events should be recorded in ApiEventRepository");

        // Verify retrieval via /api/events
        mockMvc.perform(get("/api/events")
                        .param("endpoint", "products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$.content[0].statusCode", is(200)));
    }
}
