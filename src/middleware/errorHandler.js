import { responseClient } from "./responseClient.js";

export const errorHandle = (error, req, res, next) => {
  const statusCode = error.statusCode || 500
    const message = error.message
   responseClient({req, res, statusCode, message});
//   res.status(statusCode).json ({
//     status: 'error',
//     message:error.message
//   })
};

//create a log file if you want