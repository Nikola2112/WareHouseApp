// src/pages/HomePage.jsx
import React from 'react';
import warehouseBg from './img/home.jpg';
import { Link } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Grid,
    List,
    ListItemButton,
    ListItemText,
} from '@mui/material';

/**
 * HomePage — головний лендінг.
 * Збережіть фонове фото у public/img/warehouse.jpg
 */
export default function HomePage() {
    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: 'calc(100vh - 64px)',
                backgroundImage: `url(${warehouseBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                color: '#fff',
            }}
        >
            {/* затемнення */}
            <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.55)' }} />

            {/* центральний контент */}
            <Box sx={{ position: 'relative', zIndex: 1, pl: { xs: 2, md: 12 } }}>
                <Typography variant="h2" sx={{ fontWeight: 700, maxWidth: 700, mb: 6 }}>
                    TopUA  — ефективне рішення для управління складом
                </Typography>

                <Grid container spacing={4} sx={{ mb: 6 }}>
                    {[
                        { value: '99,9%', label: 'точність комплектування замовлень' },
                        { value: '40%', label: 'зростання швидкості операцій' },
                        { value: '30%', label: 'скорочення штату персоналу' },
                    ].map(({ value, label }) => (
                        <Grid item xs={4} key={label}>
                            <Typography variant="h4" sx={{ fontWeight: 700 }}>
                                {value}
                            </Typography>
                            <Typography>{label}</Typography>
                        </Grid>
                    ))}
                </Grid>

                <Button
                    component={Link}          // робимо кнопку посиланням
                    to="/consultation"        // маршрут на сторінку форми
                    variant="contained"
                    size="large"
                    sx={{ mr: 3, bgcolor: '#c62828', '&:hover': { bgcolor: '#b71c1c' } }}
                >
                    Отримати консультацію
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    sx={{
                        borderColor: '#c62828',
                        color: '#fff',
                        '&:hover': { borderColor: '#b71c1c' },
                    }}
                >
                    Замовити демо-систему
                </Button>
            </Box>

            {/* правий сайдбар */}
            <Box
                sx={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: { xs: '70%', sm: 300 },
                    bgcolor: 'rgba(0,0,0,0.78)',
                    pt: 10,
                    px: 3,
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                    Склади, де працює TopUA WMS
                </Typography>

                <List sx={{ flexGrow: 1 }}>
                    {['Нова Пошта', 'Rozetka', 'Епіцентр'].map((name) => (
                        <ListItemButton
                            key={name}
                            sx={{ borderLeft: '4px solid #c62828', mb: 2 }}
                        >
                            <ListItemText
                                primary={name}
                                primaryTypographyProps={{ color: '#fff' }}
                            />
                        </ListItemButton>
                    ))}
                </List>

                <Button
                    variant="contained"
                    sx={{ bgcolor: '#c62828', '&:hover': { bgcolor: '#b71c1c' } }}
                >
                    Більше складів
                </Button>
            </Box>
        </Box>
    );
}