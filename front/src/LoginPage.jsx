import React, { useState } from 'react';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function LoginPage({ onLogin }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: реальная авторизация
        onLogin();
        navigate('/products');
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <Paper sx={{ p: 4, width: 320 }}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                    Вход
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        required
                    />
                    <TextField
                        label="Пароль"
                        type="password"
                        fullWidth
                        sx={{ mb: 3 }}
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        required
                    />
                    <Button variant="contained" fullWidth type="submit">
                        Войти
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}