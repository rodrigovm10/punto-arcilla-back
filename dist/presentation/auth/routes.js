"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const controller_1 = require("../auth/controller");
const index_1 = require("../../infrastructure/index");
class AuthRoutes {
    static get routes() {
        const router = (0, express_1.Router)();
        const datasource = new index_1.AuthDataSourceImpl();
        const authRepository = new index_1.AuthRepositoryImpl(datasource);
        const controller = new controller_1.AuthController(authRepository);
        // Rutas principales
        router.post('/login', controller.loginUser);
        router.post('/register', controller.registerUser);
        return router;
    }
}
exports.AuthRoutes = AuthRoutes;
