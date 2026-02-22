import multer from "multer";
// import path, { resolve } from "path";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
// import { rejects } from "assert";
import fs from "fs";
// Configuration
cloudinary.config({
  cloud_name: "dpuphecho",
  api_key: "656292162772836",
  api_secret: "CcOIXtP6irc9BVFgRkNTqKTdazs", // Click 'View API Keys' above to copy your API secret
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToCloudinary = async (file: any) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      { public_id: file.originalname },
      function (error, result) {
        fs.unlinkSync(file.path); // Delete the file from local storage after upload
        if (error) {
          console.error("Cloudinary Upload Error: ", error);
          reject(error);
        } else {
          console.log("Cloudinary Upload Result: ", result);
          resolve(result);
        }
      },
    );
  });
};

export const fileUploader = {
  upload,
  uploadToCloudinary,
};
