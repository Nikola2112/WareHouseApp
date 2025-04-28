import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

const ProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState({
        name: '',
        code: '',
        price: '',
        description: '',
        category: { name: '' }
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8080/api/products/${id}`)
                .then(response => {
                    setProduct({
                        ...response.data,
                        category: response.data.category && typeof response.data.category === 'object'
                            ? response.data.category
                            : { name: response.data.category || '' }
                    });
                })
                .catch(err => console.error(err));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            setProduct({ ...product, category: { name: value } });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await axios.put(`http://localhost:8080/api/products/${id}`, product);
            } else {
                await axios.post('http://localhost:8080/api/products', product);
            }
            navigate('/');
        } catch (err) {
            setError('Ошибка при сохранении товара');
            console.error(err);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    {id ? 'Редактировать товар' : 'Добавить товар'}
                </Typography>
                {error && <Alert severity="error">{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                    <TextField
                        label="Название"
                        name="name"
                        fullWidth
                        margin="normal"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Код"
                        name="code"
                        fullWidth
                        margin="normal"
                        value={product.code}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Цена"
                        name="price"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Описание"
                        name="description"
                        fullWidth
                        margin="normal"
                        value={product.description}
                        onChange={handleChange}
                        multiline
                        rows={3}
                    />
                    <TextField
                        label="Категория"
                        name="category"
                        fullWidth
                        margin="normal"
                        value={product.category.name}
                        onChange={handleChange}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        {id ? 'Сохранить изменения' : 'Добавить товар'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ProductForm;