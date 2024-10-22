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
exports.LoginUser = void 0;
const index_1 = require("../../../config/index");
const errors_1 = require("../../errors");
class LoginUser {
    constructor(authRepository, signToken = index_1.JwtAdapter.generateToken) {
        this.authRepository = authRepository;
        this.signToken = signToken;
    }
    execute(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get user
            const user = yield this.authRepository.login(loginUserDto);
            // Token
            const token = yield this.signToken({ id: user.id });
            if (!token)
                throw errors_1.CustomError.internalServer('Error generating token');
            return {
                token: token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            };
        });
    }
}
exports.LoginUser = LoginUser;
