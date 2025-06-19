import { Admin, Prisma, UserStatus } from "@prisma/client";
import { adminSearchAbleFields } from "./admin.constant";
import { paginationHelper } from "../../helpars/paginationHelpar";
import prisma from "../shared/prisma";

const getAllFromDB = async (params: any, options: any) => {
  const { page, skip, limit } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.AdminWhereInput[] = [];

  console.log(filterData);
  if (params.searchTerm) {
    andConditions.push({
      OR: adminSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }
  //   console.dir(andConditions, { depth: "infinity" });
  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };
  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.admin.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// This function retrieves a single admin by ID from the database.

const getByIdFromDB = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: { id },
  });
  return result;
};

// This function updates an admin in the database.

const updateIntoDB = async (id: string, data: Partial<Admin>) => {
  const isExits = await prisma.admin.findUnique({
    where: { id },
  });
  if (!isExits) {
    throw new Error("Admin not found");
  }

  const result = await prisma.admin.update({
    where: { id },
    data,
  });
  return result;
};

const deleteFromDB = async (id: string) => {
  await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.delete({
      where: { id },
    });

    const userDeletedData = await transactionClient.user.delete({
      where: {
        email: adminDeletedData.email,
      },
    });

    return adminDeletedData;
  });

  return result;
};

const softDeleteFromDB = async (id: string) => {
  await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    const userDeletedData = await transactionClient.user.update({
      where: {
        email: adminDeletedData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return adminDeletedData;
  });

  return result;
};

export const adminService = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};

/*
  data = 1 2 3 4 5 6 7 8 9 10
  limit = 3
  page = 2
  skip = (page - 1) * limit = (2 - 1) * 3 = 3
  formula = skip + limit
  (2-1) * 3 + 3 = 3 + 3 = 6
*/
