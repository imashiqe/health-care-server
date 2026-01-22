import * as bcrypt from "bcrypt";
import prisma from "../shared/prisma";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email },
  });
  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password,
  );
  console.log(isCorrectPassword);
  return userData;
};

export const AuthServices = {
  loginUser,
};
