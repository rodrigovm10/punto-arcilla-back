"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductUpdatedEntity = exports.ProductEntity = void 0;
class ProductEntity {
    constructor(id, user_id, name, description, stock, price, status, tags, images) {
        this.id = id;
        this.user_id = user_id;
        this.name = name;
        this.description = description;
        this.stock = stock;
        this.price = price;
        this.status = status;
        this.tags = tags;
        this.images = images;
    }
}
exports.ProductEntity = ProductEntity;
class ProductUpdatedEntity {
    constructor(id, user_id, name, description, stock, price, status, tags, images) {
        this.id = id;
        this.user_id = user_id;
        this.name = name;
        this.description = description;
        this.stock = stock;
        this.price = price;
        this.status = status;
        this.tags = tags;
        this.images = images;
    }
}
exports.ProductUpdatedEntity = ProductUpdatedEntity;
