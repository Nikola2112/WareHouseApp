package com.back.service.impl;

import com.warehouse.model.Product;
import com.warehouse.repository.ProductRepository;
import com.warehouse.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class ProductServiceImpl implements ProductService {


    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Long id, Product product) {
        Optional<Product> existing = productRepository.findById(id);
        if(existing.isPresent()){
            Product p = existing.get();
            p.setName(product.getName());
            p.setCode(product.getCode());
            p.setPrice(product.getPrice());
            p.setDescription(product.getDescription());
            p.setCategory(product.getCategory());
            p.setComponents(product.getComponents());
            return productRepository.save(p);
        }
        return null;
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
