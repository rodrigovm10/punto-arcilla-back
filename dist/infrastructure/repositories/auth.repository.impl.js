"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepositoryImpl = void 0;
class AuthRepositoryImpl {
    constructor(authDatasource) {
        this.authDatasource = authDatasource;
    }
    login(loginUserDto) {
        return this.authDatasource.login(loginUserDto);
    }
    register(registerUserDto) {
        return this.authDatasource.register(registerUserDto);
    }
}
exports.AuthRepositoryImpl = AuthRepositoryImpl;
