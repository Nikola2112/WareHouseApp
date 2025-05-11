import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
} from "@mui/material";

const ProductForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        name: "",
        code: "",
        price: "",
        description: "",
        category: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) {
            api
                .get(`/products/${id}`)
                .then(({ data }) => {
                    const { name, code, price, description, category } = data;
                    setProduct({
                        name,
                        code,
                        price,
                        description: description || "",
                        category: category?.name || category || "",
                    });
                })
                .catch(() => setError("Не вдалося завантажити товар"));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!product.price || isNaN(product.price)) {
            setError("Ціна обовʼязкова і має бути числом");
            return;
        }

        const payload = { ...product, price: parseFloat(product.price) };

        try {
            if (id) await api.put(`/products/${id}`, payload);
            else await api.post("/products", payload);
            navigate("/products");
        } catch (err) {
            if (err.response?.status === 403) setError("Немає прав на операцію");
            else setError(err.response?.data?.message || "Помилка збереження");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                    {id ? "Редагувати товар" : "Додати товар"}
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField label="Назва" name="name" fullWidth margin="normal" value={product.name} onChange={handleChange} required />
                    <TextField label="Код" name="code" fullWidth margin="normal" value={product.code} onChange={handleChange} required />
                    <TextField label="Ціна" name="price" type="number" fullWidth margin="normal" value={product.price} onChange={handleChange} required />
                    <TextField label="Опис" name="description" multiline rows={3} fullWidth margin="normal" value={product.description} onChange={handleChange} />
                    <TextField label="Категорія" name="category" fullWidth margin="normal" value={product.category} onChange={handleChange} />
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        {id ? "Зберегти зміни" : "Додати товар"}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ProductForm;
