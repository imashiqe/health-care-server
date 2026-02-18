import { Request, Response } from "express";
import catchAsync from "../shared/catchAsync";
import { AuthServices } from "./auth.service";
import sendResponse from "../shared/sendResponse";
import status from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: true,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User logged in successfully",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Refresh token generated successfully",
    data: result,
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;

    const result = await AuthServices.changePassword(user, req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Password changed successfully",
      data: result,
    });
  },
);

export const authController = {
  loginUser,
  refreshToken,
  changePassword,
};
