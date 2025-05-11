import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
} from "@mui/material";
import axios from "axios";

// ✅ Один axios‑інстанс із базовим URL на бекенд
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080", // ← змінюйте за потреби
    withCredentials: true, // бо в CorsConfiguration setAllowCredentials(true)
    headers: { "Content-Type": "application/json" },
});

export default function RegisterPage() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // ✍️ Проста клієнтська валідація
    const validateForm = () => {
        if (!form.firstName.trim()) return "Ім'я обов'язкове";
        if (!form.lastName.trim()) return "Прізвище обов'язкове";
        if (!/\S+@\S+\.\S+/.test(form.email)) return "Некоректний email";
        if (form.password.length < 6) return "Пароль має містити ≥ 6 символів";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            await api.post("/api/auth/register", form);
            setSuccess("Успішна реєстрація!");
            setForm({ firstName: "", lastName: "", email: "", password: "" });
        } catch (err) {
            console.error("Register error:", err.response || err);
            setError(err.response?.data?.message || "Помилка при реєстрації");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8 }}>
                <Typography variant="h4" gutterBottom>
                    Реєстрація
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                {success && (
                    <Alert severity="success" sx={{ mb: 2 }}>
                        {success}
                    </Alert>
                )}
                <form onSubmit={handleSubmit} noValidate>
                    <TextField
                        label="Ім'я"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Прізвище"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Пароль"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Зареєструватися
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

