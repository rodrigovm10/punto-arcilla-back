"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDataSourceImpl = void 0;
const errors_1 = require("../../domain/errors");
const postgres_database_1 = require("../../data/postgresql/postgres-database");
const product_mapper_1 = require("../mappers/product.mapper");
class ProductDataSourceImpl {
    create(createProductDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id, name, description, price, images, status, stock, tags } = createProductDto;
            try {
                // 1. Get user
                const user = yield postgres_database_1.prisma.user.findFirst({
                    where: {
                        id: user_id
                    }
                });
                // 2. Verify if user_id does not  exists
                if (!user)
                    throw errors_1.CustomError.notFound('User not found');
                // 3. Create product
                const product = yield postgres_database_1.prisma.product.create({
                    data: {
                        name,
                        description,
                        price,
                        images,
                        status,
                        stock,
                        tags,
                        user_id
                    }
                });
                return product_mapper_1.ProductMapper.productEntityFromObject(product);
            }
            catch (error) {
                if (error instanceof errors_1.CustomError)
                    throw error;
                throw errors_1.CustomError.internalServer();
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield postgres_database_1.prisma.product.findMany();
                return products.map(product => product_mapper_1.ProductMapper.productEntityFromObject(product));
            }
            catch (error) {
                if (error instanceof errors_1.CustomError)
                    throw error;
                throw errors_1.CustomError.internalServer();
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield postgres_database_1.prisma.product.findFirst({
                    where: {
                        id
                    }
                });
                if (!product)
                    throw errors_1.CustomError.notFound('Product not found');
                return product_mapper_1.ProductMapper.productEntityFromObject(product);
            }
            catch (error) {
                if (error instanceof errors_1.CustomError)
                    throw error;
                throw errors_1.CustomError.internalServer();
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productExists = yield postgres_database_1.prisma.product.findFirst({ where: { id } });
                if (!productExists)
                    throw errors_1.CustomError.notFound('Product not found');
                yield postgres_database_1.prisma.product.delete({ where: { id } });
                return 'Product deleted succesfully';
            }
            catch (error) {
                if (error instanceof errors_1.CustomError)
                    throw error;
                throw error;
            }
        });
    }
    update(id, productDto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productExists = yield postgres_database_1.prisma.product.findFirst({ where: { id } });
                if (!productExists)
                    throw errors_1.CustomError.notFound('Product does not existe');
                const { images, imagesToDelete, tagsToDelete, tags } = productDto, product = __rest(productDto, ["images", "imagesToDelete", "tagsToDelete", "tags"]);
                if (images) {
                    const productUpdated = yield postgres_database_1.prisma.product.update({
                        where: { id },
                        data: Object.assign(Object.assign({}, product), { images: { push: images } })
                    });
                    return product_mapper_1.ProductMapper.productEntityFromObject(productUpdated);
                }
                if (tags) {
                    const productUpdated = yield postgres_database_1.prisma.product.update({
                        where: { id },
                        data: Object.assign(Object.assign({}, product), { tags: { push: tags } })
                    });
                    return product_mapper_1.ProductMapper.productEntityFromObject(productUpdated);
                }
                const productUpdated = yield postgres_database_1.prisma.product.update({
                    where: { id },
                    data: Object.assign({}, product)
                });
                return product_mapper_1.ProductMapper.productEntityFromObject(productUpdated);
            }
            catch (error) {
                if (error instanceof errors_1.CustomError)
                    throw error;
                throw error;
            }
        });
    }
}
exports.ProductDataSourceImpl = ProductDataSourceImpl;
