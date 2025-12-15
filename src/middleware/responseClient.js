export const responseClient = ({
  req,
  res,
  message = "",
  statusCode = 200,
  payload,
}) => {
  if (!req || !res) {
    throw new Error("req and res are required");
  }

  // Success
  const success = () => {
    return res.status(statusCode).json({
      status: "success",
      message,
      payload,
    });
  };

  // Error
  const error = () => {
    return res.status(statusCode).json({
      status: "error",
      message,
      payload,
    });
  };

  if (statusCode >= 200 && statusCode < 300) {
    return success();
  } else {
    return error();
  }
};


// export const responseClient = ({req, res, message, statusCode = 200, payload}) => {

//     //success response
//     req.success = () => {
//         return res.status(statusCode).json ({
//             status: "success",
//             message,
//             payload,

//         });
//     };


//     //error response
//     req.error=() => {
//         return res.status(statusCode).json({
//             status: 'error',
//             message,
//             payload,
//         });
//     };

//     if(statusCode >= 200 && statusCode < 300) {
//         return req.success()
//     } else {
//         return req.error();
//     }

// };             