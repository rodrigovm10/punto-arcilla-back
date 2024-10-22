"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
const process_1 = require("process");
exports.envs = {
    PORT: process_1.env.PORT,
    JWT_SEED: process_1.env.JWT_SEED
};
