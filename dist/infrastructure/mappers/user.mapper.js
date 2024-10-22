"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const errors_1 = require("../../domain/errors");
const entities_1 = require("../../domain/entities");
class UserMapper {
    static userEntityFromObject(object) {
        const { id, name, email, password, role } = object;
        if (!id)
            throw errors_1.CustomError.badRequest('Missing ID');
        if (!name)
            throw errors_1.CustomError.badRequest('Missing name');
        if (!password)
            throw errors_1.CustomError.badRequest('Missing password');
        if (!role)
            throw errors_1.CustomError.badRequest('Missing role');
        return new entities_1.UserEntity(id, name, email, password, role);
    }
}
exports.UserMapper = UserMapper;
