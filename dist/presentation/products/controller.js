"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const errors_1 = require("../../domain/errors");
const dtos_1 = require("../../domain/dtos");
const use_cases_1 = require("../../domain/use-cases");
const update_product_use_case_1 = require("../../domain/use-cases/products/update-product.use-case");
class ProductController {
    constructor(productRepository) {
        this.productRepository = productRepository;
        this.handleError = (error, res) => {
            if (error instanceof errors_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            console.log(error);
            return res.status(500).json({ error: 'Internal Server Error' });
        };
        this.createProduct = (req, res) => {
            const [error, productDto] = dtos_1.CreateProductDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new use_cases_1.CreateProduct(this.productRepository)
                .execute(productDto)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        };
        this.getAllProducts = (req, res) => {
            new use_cases_1.GetAllProducts(this.productRepository)
                .execute()
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        };
        this.getProductsById = (req, res) => {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ error: 'Missing required parameter: id' });
            new use_cases_1.GetProductById(this.productRepository)
                .execute(id)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        };
        this.updateProduct = (req, res) => {
            const id = req.params.id;
            const [error, productDto] = dtos_1.UpdateProductDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            if (!id)
                return res.status(400).json({ error: 'Missing required parameter: id' });
            new update_product_use_case_1.UpdateProduct(this.productRepository)
                .execute(id, productDto)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        };
        this.deleteProduct = (req, res) => {
            const id = req.params.id;
            if (!id)
                return res.status(400).json({ error: 'Missing required parameter: id' });
            new use_cases_1.DeleteProduct(this.productRepository)
                .execute(id)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        };
    }
}
exports.ProductController = ProductController;
