import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";

import { UserRole } from "@prisma/client";
import auth from "../../middleWares/auth";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import { fileUploader } from "../../../helpars/fileUploader";

const router = express.Router();

(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: "dpuphecho",
    api_key: "656292162772836",
    api_secret: "CcOIXtP6irc9BVFgRkNTqKTdazs", // Click 'View API Keys' above to copy your API secret
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      "G:\\Personal Project\\Jp Course\\Health Care\\health-care-server\\uploads\\eb-x49-05-500x500.jpg",
      {
        public_id: "shoes",
      },
    )
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url("shoes", {
    fetch_format: "auto",
    quality: "auto",
  });

  console.log(optimizeUrl);

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url("shoes", {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  });

  console.log(autoCropUrl);
})();

router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  fileUploader.upload.single("file"),
  userController.createAdmin,
);

export const userRoutes = router;
