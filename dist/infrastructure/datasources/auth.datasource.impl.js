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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDataSourceImpl = void 0;
const index_1 = require("../../config/index");
const mappers_1 = require("../mappers");
const postgres_database_1 = require("../../data/postgresql/postgres-database");
const errors_1 = require("../../domain/errors");
class AuthDataSourceImpl {
    constructor(hashPassword = index_1.BcryptAdapter.hash, comparePassword = index_1.BcryptAdapter.compare) {
        this.hashPassword = hashPassword;
        this.comparePassword = comparePassword;
    }
    register(registerUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, role } = registerUserDto;
            try {
                // 1. Verify if email exists
                const exists = yield postgres_database_1.prisma.user.findUnique({
                    where: {
                        email
                    }
                });
                if (exists)
                    throw errors_1.CustomError.badRequest('User already exists');
                // 2. Hash password
                const hashedPassword = this.hashPassword(password);
                // 3. Create User
                const user = yield postgres_database_1.prisma.user.create({
                    data: {
                        name,
                        email,
                        password: hashedPassword,
                        role
                    }
                });
                // 3. Map response to our entity
                return mappers_1.UserMapper.userEntityFromObject(user);
            }
            catch (error) {
                if (error instanceof errors_1.CustomError)
                    throw error;
                throw errors_1.CustomError.internalServer();
            }
        });
    }
    login(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginUserDto;
            try {
                // 1. Verify if email exists
                const dbUser = yield postgres_database_1.prisma.user.findUnique({
                    where: {
                        email
                    }
                });
                if (!dbUser)
                    throw errors_1.CustomError.badRequest('User not found');
                const passwordCorrect = this.comparePassword(password, dbUser === null || dbUser === void 0 ? void 0 : dbUser.password);
                if (!passwordCorrect)
                    throw errors_1.CustomError.badRequest('Email or password is wrong');
                // Get user
                return mappers_1.UserMapper.userEntityFromObject(dbUser);
            }
            catch (error) {
                if (error instanceof errors_1.CustomError)
                    throw error;
                throw errors_1.CustomError.internalServer();
            }
        });
    }
}
exports.AuthDataSourceImpl = AuthDataSourceImpl;
