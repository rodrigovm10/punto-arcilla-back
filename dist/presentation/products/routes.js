"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../products/controller");
const product_datasource_impl_1 = require("../../infrastructure/datasources/product.datasource.impl");
const repositories_1 = require("../../infrastructure/repositories");
const middlewares_1 = require("../middlewares");
class ProductRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new product_datasource_impl_1.ProductDataSourceImpl();
        const productRepository = new repositories_1.ProductRepositoryImpl(datasource);
        const controller = new controller_1.ProductController(productRepository);
        router.get('/', middlewares_1.AuthMiddleware.validateJWT, controller.getAllProducts);
        router.get('/', middlewares_1.AuthMiddleware.validateJWT, controller.getAllProducts);
        router.get('/:id', middlewares_1.AuthMiddleware.validateJWT, controller.getProductsById);
        router.post('/', middlewares_1.AuthMiddleware.validateJWT, controller.createProduct);
        router.patch('/:id', middlewares_1.AuthMiddleware.validateJWT, controller.updateProduct);
        router.delete('/:id', middlewares_1.AuthMiddleware.validateJWT, controller.deleteProduct);
        return router;
    }
}
exports.ProductRoutes = ProductRoutes;
