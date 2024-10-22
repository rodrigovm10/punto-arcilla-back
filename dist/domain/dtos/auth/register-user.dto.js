"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDto = void 0;
const index_1 = require("../../../config/index");
class RegisterUserDto {
    constructor(name, email, password, role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    static create(object) {
        const { name, email, password, role } = object;
        if (!name)
            return ['Missing name'];
        if (!email)
            return ['Missing email'];
        if (!index_1.Validators.email.test(email))
            return ['Email is not valid'];
        if (!password)
            return ['Missing password'];
        if (password.lenght < 6)
            return ['Password too short'];
        if (!role)
            return ['Missing role'];
        if (!index_1.Validators.role(role.toUpperCase()))
            return ['Role does not exist'];
        return [undefined, new RegisterUserDto(name, email, password, role.toUpperCase())];
    }
}
exports.RegisterUserDto = RegisterUserDto;
