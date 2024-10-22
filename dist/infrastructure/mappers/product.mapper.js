"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductMapper = void 0;
const entities_1 = require("../../domain/entities");
const errors_1 = require("../../domain/errors");
class ProductMapper {
    static productEntityFromObject(object) {
        const { id, name, user_id, description, price, images, status, stock, tags } = object;
        if (!id)
            throw errors_1.CustomError.badRequest('Missing ID');
        if (!name)
            throw errors_1.CustomError.badRequest('Missing name');
        if (!description)
            throw errors_1.CustomError.badRequest('Missing description');
        if (!price)
            throw errors_1.CustomError.badRequest('Missing price');
        if (!images)
            throw errors_1.CustomError.badRequest('Missing images');
        if (!status)
            throw errors_1.CustomError.badRequest('Missing status');
        if (!stock)
            throw errors_1.CustomError.badRequest('Missing stock');
        if (!tags)
            throw errors_1.CustomError.badRequest('Missing tags');
        return new entities_1.ProductEntity(id, user_id, name, description, stock, price, status, tags, images);
    }
}
exports.ProductMapper = ProductMapper;
