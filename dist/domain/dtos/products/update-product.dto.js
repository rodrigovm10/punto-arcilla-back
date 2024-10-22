"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductDto = void 0;
class UpdateProductDto {
    constructor(name, description, stock, price, status, tags, images, imagesToDelete, tagsToDelete) {
        this.name = name;
        this.description = description;
        this.stock = stock;
        this.price = price;
        this.status = status;
        this.tags = tags;
        this.images = images;
        this.imagesToDelete = imagesToDelete;
        this.tagsToDelete = tagsToDelete;
    }
    static create(object) {
        const { name, description, stock, price, status, tags, images, imagesToDelete, tagsToDelete } = object;
        return [
            undefined,
            new UpdateProductDto(name, description, stock, price, status, tags, images, imagesToDelete, tagsToDelete)
        ];
    }
}
exports.UpdateProductDto = UpdateProductDto;
