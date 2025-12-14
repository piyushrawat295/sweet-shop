import { prisma } from "../../config/prisma";import { hashPassword, comparePassword } from "../../utils/hash";import { signToken } from "../../utils/jwt";
// export const register = async (email: string, password: string) => {
//   const user = await prisma.user.create({
//     data: { email, password: await hashPassword(password) }
//   });
//   return user;
// };
export const register = async (email: string, password: string) => {
  const role = email === "admin@sweetshop.com" ? "ADMIN" : "USER";

  const user = await prisma.user.create({
    data: {
      email,
      password: await hashPassword(password),
      role
    }
  });

  return user;
};


// export const login = async (email: string, password: string) => {
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (!user || !(await comparePassword(password, user.password)))
//     throw new Error("Invalid credentials");

//   return signToken({ id: user.id, role: user.role });
// };
export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await comparePassword(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({ id: user.id, role: user.role });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  };
};
