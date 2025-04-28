import React, { useState } from 'react';
import {
    Routes, Route, Link, Navigate, Outlet, useLocation,
} from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    Menu,
    MenuItem,
    CssBaseline,
    createTheme,
    ThemeProvider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TranslateIcon from '@mui/icons-material/Translate';
import { useTranslation } from 'react-i18next';

import HomePage from './HomePage';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import LoginPage from './LoginPage';
import AboutPage from './aboutPage/AboutPage';
import ContactsPage from './ContactsPage';
import ProjectsPage from './project/ProjectsPage';
import logo from './logo.svg';

const theme = createTheme({
    palette: { primary: { main: '#0072FF' }, secondary: { main: '#FF4081' } },
});

const PrivateRoute = ({ isAuth }) =>
    isAuth ? <Outlet /> : <Navigate to="/login" replace />;

export default function App() {
    const { pathname } = useLocation();
    const isHome = pathname === '/';

    /* ---- авторизация‑заглушка ---- */
    const [isAuth, setIsAuth] = useState(false);

    /* ---- i18n ---- */
    const { t, i18n } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleLangClick = (e) => setAnchorEl(e.currentTarget);
    const handleLangClose = (lang) => {
        setAnchorEl(null);
        if (lang) i18n.changeLanguage(lang);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            {/* ─── Шапка ──────────────────────────────────── */}
            <AppBar
                position="fixed"
                elevation={0}
                sx={{
                    background: 'rgba(0,0,0,0.45)',
                    backdropFilter: 'blur(4px)',
                    color: '#fff',
                }}
            >
                <Toolbar sx={{ px: { xs: 2, md: 4 } }}>
                    <IconButton edge="start" sx={{ mr: 1, display: { md: 'none' } }}>
                        <MenuIcon />
                    </IconButton>

                    <Box component="img" src={logo} alt="TopUA" sx={{ height: 32, mr: 4 }} />

                    {/* навигация */}
                    {Object.entries(t('nav', { returnObjects: true })).map(([key, label]) => (
                        <Button
                            key={key}
                            component={Link}
                            to={`/${key === 'home' ? '' : key}`}
                            sx={{ mx: 1, display: { xs: 'none', md: 'inline-flex' }, color: '#fff' }}
                        >
                            {label}
                        </Button>
                    ))}

                    <Box sx={{ flexGrow: 1 }} />

                    {/* выбор языка */}
                    <IconButton onClick={handleLangClick} sx={{ color: '#fff', mr: 1 }}>
                        <TranslateIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => handleLangClose(null)}>
                        {[
                            { code: 'ru', label: 'Русский', flag: '/flags/ru.png' },
                            { code: 'en', label: 'English', flag: '/flags/en.png' },
                        ].map(({ code, label, flag }) => (
                            <MenuItem key={code} onClick={() => handleLangClose(code)}>
                                <Box component="img" src={flag} alt={code} sx={{ width: 24, mr: 1 }} />
                                {label}
                            </MenuItem>
                        ))}
                    </Menu>

                    <Button
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to={isAuth ? '/' : '/login'}
                        onClick={() => isAuth && setIsAuth(false)}
                        sx={{ ml: 1 }}
                    >
                        {isAuth ? t('logout') : t('login')}
                    </Button>
                </Toolbar>
            </AppBar>

            {/* ─── Контент ────────────────────────────────── */}
            <main style={{ paddingTop: 64, padding: isHome ? 0 : '2rem' }}>
                <Routes>
                    {/* public */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/contacts" element={<ContactsPage />} />
                    <Route path="/login" element={<LoginPage onLogin={() => setIsAuth(true)} />} />

                    {/* protected */}
                    <Route element={<PrivateRoute isAuth={isAuth} />}>
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/add" element={<ProductForm />} />
                        <Route path="/edit/:id" element={<ProductForm />} />
                    </Route>

                    {/* fallback */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
        </ThemeProvider>
    );
}