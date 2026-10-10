package com.sentinel.api.entity;

public enum Role {
    ROLE_ADMIN,
    ROLE_ANALYST,
    ROLE_VIEWER;

    public String getRoleName() {
        return name().replace("ROLE_", "");
    }
}
