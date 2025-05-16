import { PrismaClient } from "@prisma/client";

enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  // Add other roles as needed
}

const prisma = new PrismaClient();

const createAdmin = async (data: any) => {
  const userData = {
    email: data.admin.email,
    password: data.password,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUser = await transactionClient.user.create({
      data: userData,
    });

    const createdAdmin = await transactionClient.admin.create({
      data: {
        ...data.admin,
        email: createdUser.email, // 🔗 ensures correct FK relation
      },
    });

    return {
      message: "Admin created successfully",
      user: createdUser,
      admin: createdAdmin,
    };
  });

  return result;
};

export const UserService = {
  createAdmin,
};
