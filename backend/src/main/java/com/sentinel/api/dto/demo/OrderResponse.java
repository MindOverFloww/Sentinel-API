package com.sentinel.api.dto.demo;

public class OrderResponse {
    private Long id;
    private Long productId;
    private Integer quantity;
    private String status;

    public OrderResponse() {
    }

    public OrderResponse(Long id, Long productId, Integer quantity, String status) {
        this.id = id;
        this.productId = productId;
        this.quantity = quantity;
        this.status = status;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProductId() { return productId; }
    public void setProductId(Long productId) { this.productId = productId; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
