import multer from "multer";
const multerUpload = multer({
  limtis: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});
const singleAvatar = multerUpload.single("avatar");
const attachmentMulter = multerUpload.array("files", 5);

export { singleAvatar, attachmentMulter };
