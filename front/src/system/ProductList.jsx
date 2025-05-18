import React, { useEffect, useState } from "react";
import { api } from "../api";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    TextField,
    Box,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [filterByName, setFilterByName] = useState(true);
    const [filterByCode, setFilterByCode] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get("/products");
            setProducts(data);
            setFilteredProducts(data);
        } catch (err) {
            console.error("Помилка завантаження товарів", err);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            fetchProducts();
        } catch (err) {
            console.error("Помилка видалення", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase().trim();
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);

        let filtered = products.filter(({ name, code, price }) => {
            // Проверяем попадание цены в диапазон
            const inPriceRange =
                (isNaN(min) || price >= min) &&
                (isNaN(max) || price <= max);

            if (!inPriceRange) return false;

            // Если пустой запрос — не фильтруем по названию/коду
            if (!query) return true;

            // Проверяем по названию и коду в зависимости от чекбоксов
            const nameMatch = filterByName ? name.toLowerCase().includes(query) : false;
            const codeMatch = filterByCode ? code.toLowerCase().includes(query) : false;

            return nameMatch || codeMatch;
        });

        // Сортировка
        filtered.sort((a, b) => {
            // Если оба фильтра активны — сортируем по названию, потом по коду
            if (filterByName && filterByCode) {
                const nameCompare = a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
                if (nameCompare !== 0) return nameCompare;
                return a.code.localeCompare(b.code, undefined, { sensitivity: "base" });
            }

            if (filterByName) {
                return a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
            }

            if (filterByCode) {
                return a.code.localeCompare(b.code, undefined, { sensitivity: "base" });
            }

            // Если ни один фильтр не выбран — не сортируем
            return 0;
        });

        setFilteredProducts(filtered);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Список товарів
            </Typography>

            <TextField
                label="Пошук за назвою або кодом"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }} // По Enter тоже запускаем поиск
            />

            <Box display="flex" gap={2} mb={1}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filterByName}
                            onChange={(e) => setFilterByName(e.target.checked)}
                        />
                    }
                    label="Фільтрувати по назві"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filterByCode}
                            onChange={(e) => setFilterByCode(e.target.checked)}
                        />
                    }
                    label="Фільтрувати по коду"
                />
            </Box>

            <Box display="flex" gap={2} mb={2}>
                <TextField
                    label="Мінімальна ціна"
                    variant="outlined"
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Максимальна ціна"
                    variant="outlined"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    fullWidth
                />
            </Box>

            <Button variant="contained" onClick={handleSearch} sx={{ mb: 2 }}>
                Пошук
            </Button>

            <Button variant="contained" component={Link} to="/add" sx={{ mb: 2, ml: 2 }}>
                Додати товар
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Назва</TableCell>
                            <TableCell>Код</TableCell>
                            <TableCell>Ціна</TableCell>
                            <TableCell align="center">Дії</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((p) => (
                                <TableRow key={p.id}>
                                    <TableCell>{p.name}</TableCell>
                                    <TableCell>{p.code}</TableCell>
                                    <TableCell>{p.price}</TableCell>
                                    <TableCell align="center">
                                        <IconButton component={Link} to={`/edit/${p.id}`} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => deleteProduct(p.id)} color="secondary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    Товарів не знайдено
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ProductList;