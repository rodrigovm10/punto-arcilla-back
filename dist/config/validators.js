"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validators = void 0;
const client_1 = require("@prisma/client");
class Validators {
    static get email() {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/;
    }
    static role(roleInput) {
        return roleInput === client_1.Role.BUYER || roleInput === client_1.Role.SELLER;
    }
}
exports.Validators = Validators;
