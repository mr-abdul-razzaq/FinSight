import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Env } from "./env.config";
import multer from "multer";
import { randomUUID } from "crypto";

cloudinary.config({
  cloud_name: Env.CLOUDINARY_CLOUD_NAME,
  api_key: Env.CLOUDINARY_API_KEY,
  api_secret: Env.CLOUDINARY_API_SECRET,
});

const CLOUDINARY_PROJECT_ROOT_FOLDER = "finsight";

const CLOUDINARY_UPLOAD_FOLDER_BY_FIELD: Record<string, string> = {
  profilePicture: "users/profile-images",
  receipt: "transactions/receipts",
};

const STORAGE_PARAMS = {
  allowed_formats: ["jpg", "png", "jpeg", "webp"],
  resource_type: "image" as const,
  quality: "auto:good" as const,
};

const getUploadFolderPath = (fieldName?: string) => {
  const folderSuffix = fieldName
    ? CLOUDINARY_UPLOAD_FOLDER_BY_FIELD[fieldName] || "images"
    : "images";

  return `${CLOUDINARY_PROJECT_ROOT_FOLDER}/${folderSuffix}`;
};

const sanitizePublicIdSegment = (value: string) =>
  value
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

const storage = new CloudinaryStorage({
  cloudinary,
  params: (_req, file) => ({
    ...STORAGE_PARAMS,
    folder: getUploadFolderPath(file?.fieldname),
    public_id: `${Date.now()}-${sanitizePublicIdSegment(file.originalname)}-${randomUUID().slice(0, 8)}`,
  }),
});

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_, file, cb) => {
    const isValid = /^image\/(jpe?g|png|webp)$/.test(file.mimetype);
    if (!isValid) {
      cb(null, false);
      return;
    }

    cb(null, true);
  },
});
