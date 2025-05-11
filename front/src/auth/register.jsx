import React, { useState } from "react";
import { api } from "../api";
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Alert,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    const validate = () => {
        if (!form.firstName.trim()) return "Ім'я обов'язкове";
        if (!form.lastName.trim()) return "Прізвище обов'язкове";
        if (!/\S+@\S+\.\S+/.test(form.email)) return "Некоректний email";
        if (form.password.length < 6) return "Пароль ≥ 6 символів";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const vErr = validate();
        if (vErr) {
            setError(vErr);
            return;
        }
        setError("");
        try {
            const { data } = await api.post("/auth/register", form);
            localStorage.setItem("token", data.token);
            navigate("/products");
        } catch (err) {
            setError(err.response?.data?.message || "Помилка реєстрації");
        }
    };

    return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <Paper sx={{ p: 4, width: 340 }}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                    Реєстрація
                </Typography>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField label="Ім'я" fullWidth sx={{ mb: 2 }} value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
                    <TextField label="Прізвище" fullWidth sx={{ mb: 2 }} value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
                    <TextField label="Email" type="email" fullWidth sx={{ mb: 2 }} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    <TextField label="Пароль" type="password" fullWidth sx={{ mb: 3 }} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                    <Button variant="contained" fullWidth type="submit" sx={{ mb: 1 }}>
                        Зареєструватися
                    </Button>
                    <Button variant="outlined" fullWidth component={Link} to="/login">
                        Вже є акаунт? Увійти
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default RegisterPage;

