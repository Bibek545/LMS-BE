import { unlink } from "fs";

import { resolve } from "path";

// actually deletes the file
const deleteFile = (filePath) => {
  console.log(filePath);
  unlink(resolve(filePath), () => {});
  try {
  } catch (error) {
    console.log(error);
  };
};

// is it a single file or array of files to be deleted
export const deleteUploadedFiles = (req) => {
  //single file usecase
  if (req.file) {
    // console.log("delete single file")
    // deleteFile(req.file.path);
    return;
  }
  if (req.files) {
    // console.log("multiple files to be deleted")
    req.files.map((f) => deleteFile(f.path));
    // console.log(req.files);
  };
};
