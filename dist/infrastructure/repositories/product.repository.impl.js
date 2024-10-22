"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepositoryImpl = void 0;
class ProductRepositoryImpl {
    constructor(productDatasource) {
        this.productDatasource = productDatasource;
    }
    create(productDto) {
        return this.productDatasource.create(productDto);
    }
    findAll() {
        return this.productDatasource.findAll();
    }
    findById(id) {
        return this.productDatasource.findById(id);
    }
    delete(id) {
        return this.productDatasource.delete(id);
    }
    update(id, productDto) {
        return this.productDatasource.update(id, productDto);
    }
}
exports.ProductRepositoryImpl = ProductRepositoryImpl;
