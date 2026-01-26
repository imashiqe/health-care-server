import * as bcrypt from "bcrypt";
import prisma from "../shared/prisma";
import { jwtHelpers } from "../../helpars/jwtHelpers";
import jwt from "jsonwebtoken";
import { is } from "zod/v4/locales";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email },
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
    "abcdefgh",
    "5m",
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefgh",
    "30d",
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
    decodedData = jwt.verify(token, "abcdefgh");
  } catch (error) {
    throw new Error("You are not authorized person");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: decodedData?.email },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "abcdefgh",
    "5m",
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
