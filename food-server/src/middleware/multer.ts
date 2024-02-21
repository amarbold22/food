import multer from "multer";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "/");
  },
  filename: (req, _file, cb) => {
    cb(null, req.originalUrl);
  },
});

const upload = multer({ storage }).single("image");

export default upload;