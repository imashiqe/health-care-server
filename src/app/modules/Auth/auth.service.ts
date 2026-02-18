import { status } from "http-status";
import * as bcrypt from "bcrypt";
import prisma from "../shared/prisma";
// import { jwtHelpers } from "../../helpars/jwtHelpers";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { is } from "zod/v4/locales";
import { UserStatus } from "@prisma/client";
import config from "../../../config";
import { jwtHelpers } from "../../../helpars/jwtHelpers";
import emailSender from "./emailSender";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password,
  );

  if (!isCorrectPassword) {
    throw new Error("Invalid credentials");
  }
  console.log(isCorrectPassword);

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret,
    );
  } catch (error) {
    throw new Error("You are not authorized person");
  }

  const userData = await prisma.user.findFirstOrThrow({
    where: { email: decodedData?.email, status: UserStatus.ACTIVE },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};
const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password,
  );

  if (!isCorrectPassword) {
    throw new Error("Password is incorrect");
  }
  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password changed successfully",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPassToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.reset_pass_secret as Secret,
    config.jwt.reset_pass_expires_in as string,
  );

  console.log(resetPassToken);

  const resetPassLink =
    config.reset_pass_link + `?id=${userData.id}&token=${resetPassToken}`;
  await emailSender(
    userData.email,
    `<div>
   <h1>Dear User </h1>  
  <p>Click the link below to reset your password: <a href="${resetPassLink}">Reset Password</a></p>
    </div>`,
  );

  console.log(resetPassLink);
  //  http://localhost:3000/reset-pass?email=jeem@gmail.com&token=resetPassToken
};

const resetPassword = async (
  token: string,
  payload: { id: string; password: string },
) => {
  console.log({ token, payload });
  const userData = await prisma.user.findFirstOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });

  const isVakidToken = jwtHelpers.verifyToken(
    token,
    config.jwt.reset_pass_secret as Secret,
  );
  if (!isVakidToken) {
    throw new Error("Invalid or expired token");
  }
  // hash the new password
  const hashedPassword: string = await bcrypt.hash(payload.password, 12);

  await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password: hashedPassword,
    },
  });
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
