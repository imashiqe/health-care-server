import { Prisma, UserRole } from "@prisma/client";
import bcrypt from "bcrypt";
import prisma from "../shared/prisma";
import { fileUploader } from "../../../helpars/fileUploader";
import { IFile } from "../../routes/interfaces/file";

const createAdmin = async (req: any) => {
  // console.log("File: ", req.file);
  // console.log("Data: ", req.body.data);

  const file: IFile = req.file;
  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    // console.log("Cloudinary Upload Result: ", uploadToCloudinary);

    req.body.data.admin.profilePhoto = uploadToCloudinary?.secure_url as string;

    console.log("Updated Data with Cloudinary URL: ", req.body.data);
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
  // console.log("Hashed password:", hashedPassword);
  //   console.log("Creating admin with data:", data);
  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  //   const adminData = {
  //     name: data.admin.name,
  //     email: data.admin.email,
  //     contactNumber: data.admin.contactNumber,
  //   }
  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUserData = await transactionClient.user.create({
      data: userData,
    });
    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });
    return createdAdminData;
  });

  return result;
};

export const userService = {
  createAdmin,
};
