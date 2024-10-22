"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const errors_1 = require("../../domain/errors");
const use_cases_1 = require("../../domain/use-cases");
const dtos_1 = require("../../domain/dtos");
class AuthController {
    constructor(authRepository) {
        this.authRepository = authRepository;
        this.handleError = (error, res) => {
            if (error instanceof errors_1.CustomError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Internal Server Error' });
        };
        this.registerUser = (req, res) => {
            const [error, registerUserDto] = dtos_1.RegisterUserDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new use_cases_1.RegisterUser(this.authRepository)
                .execute(registerUserDto)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        };
        this.loginUser = (req, res) => {
            const [error, loginUserDto] = dtos_1.LoginUserDto.create(req.body);
            if (error)
                return res.status(400).json({ error });
            new use_cases_1.LoginUser(this.authRepository)
                .execute(loginUserDto)
                .then(data => res.json(data))
                .catch(error => this.handleError(error, res));
        };
    }
}
exports.AuthController = AuthController;
