"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDto = void 0;
class CreateProductDto {
    constructor(user_id, name, description, stock, price, status, tags, images) {
        this.user_id = user_id;
        this.name = name;
        this.description = description;
        this.stock = stock;
        this.price = price;
        this.status = status;
        this.tags = tags;
        this.images = images;
    }
    static create(object) {
        const { user_id, name, description, stock, price, status, tags, images } = object;
        if (!user_id)
            return ['Missing user_id'];
        if (!name)
            return ['Missing name'];
        if (!description)
            return ['Missing description'];
        if (!stock)
            return ['Missing stock'];
        if (stock === 0)
            return ['The stock can not be 0'];
        if (!price)
            return ['Missing price'];
        if (!status)
            return ['Missing status'];
        if (!tags)
            return ['Missing tags'];
        if (!images)
            return ['Missing images'];
        return [
            undefined,
            new CreateProductDto(user_id, name, description, stock, price, status, tags, images)
        ];
    }
}
exports.CreateProductDto = CreateProductDto;
