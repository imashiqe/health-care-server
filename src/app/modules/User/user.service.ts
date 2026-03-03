import { Prisma, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../shared/prisma";
import { fileUploader } from "../../../helpars/fileUploader";
import { IFile } from "../../routes/interfaces/file";
import { Request } from "express";

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

export const userService = {
  createAdmin,
  createDoctor,
  createPatient,
};
