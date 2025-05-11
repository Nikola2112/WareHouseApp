import React, { useState } from 'react';
import { api } from '../api';
import {
    Box, Paper, TextField, Button, Typography, Alert,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = ({ onLogin = () => {} }) => {          // ← получаем колл-бек
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const { data } = await api.post('/auth/login', form);

            // Сохраняем токен для App.jsx  (и для інтерцептора)
            localStorage.setItem('token', data.token);

            onLogin();                 // сообщаем родителю, что авторизация удалась
            navigate('/products');     // и переходим к списку
        } catch {
            setError('Невірний email або пароль');
        }
    };

    return (
        <Box sx={{ display:'flex', justifyContent:'center', mt:10 }}>
            <Paper sx={{ p:4, width:320 }}>
                <Typography variant="h5" sx={{ mb:3 }}>Вхід</Typography>
                {error && <Alert severity="error" sx={{ mb:2 }}>{error}</Alert>}
                <form onSubmit={handleSubmit}>
                    <TextField label="Email" type="email" fullWidth sx={{ mb:2 }}
                               value={form.email}
                               onChange={(e) => setForm({ ...form, email: e.target.value })}
                               required />
                    <TextField label="Пароль" type="password" fullWidth sx={{ mb:3 }}
                               value={form.password}
                               onChange={(e) => setForm({ ...form, password: e.target.value })}
                               required />
                    <Button variant="contained" fullWidth type="submit" sx={{ mb:1 }}>
                        Увійти
                    </Button>
                    <Button variant="outlined" fullWidth component={Link} to="/register">
                        Реєстрація
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginPage;