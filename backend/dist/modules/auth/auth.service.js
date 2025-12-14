"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const prisma_1 = require("../../config/prisma");
const hash_1 = require("../../utils/hash");
const jwt_1 = require("../../utils/jwt");
// export const register = async (email: string, password: string) => {
//   const user = await prisma.user.create({
//     data: { email, password: await hashPassword(password) }
//   });
//   return user;
// };
const register = async (email, password) => {
    const role = email === "admin@sweetshop.com" ? "ADMIN" : "USER";
    const user = await prisma_1.prisma.user.create({
        data: {
            email,
            password: await (0, hash_1.hashPassword)(password),
            role
        }
    });
    return user;
};
exports.register = register;
// export const login = async (email: string, password: string) => {
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user || !(await comparePassword(password, user.password)))
//     throw new Error("Invalid credentials");
//   return signToken({ id: user.id, role: user.role });
// };
const login = async (email, password) => {
    const user = await prisma_1.prisma.user.findUnique({ where: { email } });
    if (!user || !(await (0, hash_1.comparePassword)(password, user.password))) {
        throw new Error("Invalid credentials");
    }
    const token = (0, jwt_1.signToken)({ id: user.id, role: user.role });
    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        }
    };
};
exports.login = login;
