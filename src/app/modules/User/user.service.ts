import { Prisma, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../shared/prisma";
import { fileUploader } from "../../../helpars/fileUploader";
import { IFile } from "../../routes/interfaces/file";
import { Request } from "express";
import { IPaginationOptions } from "../../routes/interfaces/pagination";
import { paginationHelper } from "../../../helpars/paginationHelpar";
import { userSearchAbleFields } from "./user.constant";

const hashPassword = (password: string) => bcrypt.hash(password, 12);

const uploadPhoto = async (file?: IFile) => {
  if (!file) return undefined;

  const uploaded = await fileUploader.uploadToCloudinary(file);
  return uploaded?.secure_url;
};

/* ================= ADMIN ================= */

const createAdmin = async (req: Request & { file?: IFile }) => {
  const { admin, password } = req.body;

  const photoUrl = await uploadPhoto(req.file);
  const hashedPassword = await hashPassword(password);

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: admin.email,

        password: hashedPassword,
        role: UserRole.ADMIN,
      },
    });

    const createdAdmin = await tx.admin.create({
      data: {
        ...admin,
        profilePhoto: photoUrl,
        userId: user.id,
      },
    });

    return createdAdmin;
  });
};

/* ================= DOCTOR ================= */

const createDoctor = async (req: Request & { file?: IFile }) => {
  const { doctor, password } = req.body;

  const photoUrl = await uploadPhoto(req.file);
  const hashedPassword = await hashPassword(password);

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: doctor.email,
        password: hashedPassword,
        role: UserRole.DOCTOR,
      },
    });

    const createdDoctor = await tx.doctor.create({
      data: {
        ...doctor,
        profilePhoto: photoUrl,
        userId: user.id,
      },
    });

    return createdDoctor;
  });
};

/* ================= PATIENT ================= */

const createPatient = async (req: Request & { file?: IFile }) => {
  const { patient, password } = req.body;

  const photoUrl = await uploadPhoto(req.file);
  const hashedPassword = await hashPassword(password);

  return prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: patient.email,
        password: hashedPassword,
        role: UserRole.PATIENT,
      },
    });

    const createdPatient = await tx.patient.create({
      data: {
        ...patient,
        profilePhoto: photoUrl,
        userId: user.id,
      },
    });

    return createdPatient;
  });
};
// get all patient from db
const getAllFromDB = async (params: any, options: IPaginationOptions) => {
  const { page, skip, limit } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;
  const andConditions: Prisma.UserWhereInput[] = [];

  console.log(filterData);
  if (params.searchTerm) {
    andConditions.push({
      OR: userSearchAbleFields.map((field) => ({
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
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  // andConditions.push({
  //   isDeleted: false,
  // });

  //   console.dir(andConditions, { depth: "infinity" });
  const whereConditions: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.user.findMany({
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

  const total = await prisma.user.count({
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

export const userService = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllFromDB,
};
