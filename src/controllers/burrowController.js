import { responseClient } from "../middleware/responseClient.js";
import {
  createNewBurrow,
  // deleteBurrow,
  // findABurrow,
  // getAllBurrows,
  // getAllPublicBurrows,
  // updateBurrow,
} from "../models/burrow/BurrowModel.js";
// import slugify from "slugify";
// import { resetNewPass } from "./AuthController.js";
// import { deleteFile } from "../utils/fileUtil.js";
const BOOK_DUE_DAYS = 15;
export const insertNewBurrow = async (req, res, next) => {
  try {
    const {_id } = req.userInfo;
    
    let today = new Date()
    const dueDate = today.setDate(today.getDate() + BOOK_DUE_DAYS);
    const obj = {
      ...req.body,
            userId: _id,
      dueDate,
    };
    // console.log(obj);

    const burrow = await createNewBurrow(obj);
    burrow._id
      ? responseClient({
          req,
          res,
          message: "The burrow has been added successfully",
        })
      : responseClient({
          req,
          res,
          message: "Unable to insert new burrow in the database, try again later",
          statusCode: 401,
        });
  } catch (error) {
    console.error(" insertNewBurrow error:", error.message);
    next(error);
  }
};

// export const updateBurrowController = async (req, res, next) => {
//   try {
//     const { fName, _id } = req.userInfo;
//     // let imageList = [];
//     console.log(req.body);
//     req.body.imageList = req.body.imageList.split(",");

//     //remove imgToDelete list from the imagelist
//     // if (req.body.imgToDelete.length) {
//     //   req.body.imageList = req.body.imageList.filter(
//     //     (img) => !req.body.imgToDelete.includes(img)
//     //   );
//     //   req.body.imgToDelete.map((img) => deleteFile(img));
//     // }
// // ---- MINIMAL FIX: normalize imgToDelete ----
//     let imgToDelete = req.body.imgToDelete || [];

//     // If only 1 image was deleted → backend receives a string → convert to array
//     if (typeof imgToDelete === "string") {
//       imgToDelete = [imgToDelete];
//     }

//     //remove imgToDelete list from the imagelist
//     if (imgToDelete.length) {
//       req.body.imageList = req.body.imageList.filter(
//         (img) => !imgToDelete.includes(img)
//       );
//       imgToDelete.forEach((img) => deleteFile(img));
//     }
//     // ---- END OF MINIMAL FIX ----
//     if (Array.isArray(req.files)) {
//       req.body.imageList = [
//         ...req.body.imageList,
//         ...req.files.map((obj) => obj.path),
//       ];
//     }
//     console.log(req.files);

//     const obj = {
//       ...req.body,
//       lastUpdatedBy: { name: fName, adminId: _id },
//     };
//     // console.log(obj);

//     const Burrow = await updateBurrow(obj);
//     Burrow._id
//       ? responseClient({
//           req,
//           res,
//           message: "The Burrow has been updated successfully",
//         })
//       : responseClient({
//           req,
//           res,
//           message: "Unable to update the Burrow in the database, try again later",
//           statusCode: 400,
//         });
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteBurrowController = async (req, res, next) => {
//   try {
//     const { _id } = req.params;
//     const Burrow = await deleteBurrow(_id);
//     Burrow.imageList.map((img)=> deleteFile(img));
//     Burrow?._id
//       ? responseClient({
//           req,
//           res,
//           message: "The Burrow has been deleted successfully",
//         })
//       : responseClient({
//           req,
//           res,
//           message: "Unable to delete the Burrow in the database, try again later",
//           statusCode: 400,
//         });
//   } catch (error) {
//     next(error);
//   }
// };
// export const getAllBurrowsController = async (req, res, next) => {
//   try {
//     const payload = await getAllBurrows();
//     responseClient({
//       req,
//       res,
//       payload,
//       message: "Theses are the all Burrows",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getAllPublicBurrowsController = async (req, res, next) => {
//   try {
//     const payload = await getAllPublicBurrows();
//     responseClient({
//       req,
//       res,
//       payload,
//       message: "here are all the Burrow lists",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSinglePublicBurrowsController = async (req, res, next) => {
//   try {
//     const {slug} = req.params;

//     const payload = await findABurrow({slug, 
//       // status: "Active"
//     });
//     responseClient({
//       req,
//       res,
//       payload,
//       message: "Here, is the Burrow",
//     });
//   } catch (error) {
//     next(error);
//   }
// };