import React, { useState } from 'react';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: Тут ти можеш додати відправку даних на бекенд
        console.log('Реєстрація:', user);

        // Після успішної реєстрації перенаправлення на сторінку логіну
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <Paper sx={{ p: 4, width: 320 }}>
                <Typography variant="h5" sx={{ mb: 3 }}>
                    Реєстрація
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Ім’я"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={user.firstName}
                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                        required
                    />
                    <TextField
                        label="Прізвище"
                        fullWidth
                        sx={{ mb: 2 }}
                        value={user.lastName}
                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                        required
                    />
                    <TextField
                        label="Електронна пошта"
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
                        Зареєструватися
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
