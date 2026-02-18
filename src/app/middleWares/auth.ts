import { Secret } from "jsonwebtoken";

import { NextFunction, Request, Response } from "express";

import status from "http-status";
import ApiError from "../errors/ApiError";
import { jwtHelpers } from "../../helpars/jwtHelpers";
import config from "../../config";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(status.UNAUTHORIZED, "You are not authorized");
      }
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret,
      );
      req.user = verifiedUser;
      if (roles.length && roles.includes(verifiedUser.role)) {
        throw new ApiError(status.FORBIDDEN, "Forbidden");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
