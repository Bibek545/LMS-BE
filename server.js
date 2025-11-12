import express from 'express';


const app = express ()

const PORT = process.env.PORT || 8000

// db connection 
import { dbConnect } from './src/config/db.js';

;

// middlewares
import cors from "cors"
import morgan from 'morgan';
app.use(cors());
app.use(morgan("dev"));

// parse your json files

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

import path from "path";

// ✅ Serve images statically
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));



// API endpointsß
import router from './src/routes/authRoute.js';
import { errorHandle } from './src/middleware/errorHandler.js';
import { responseClient } from './src/middleware/responseClient.js';
import userRoute from './src/routes/userRoute.js';
import booksRoute from './src/routes/booksRoute.js'

app.use("/api/v1/auth", router);
app.use("/api/v1/users", userRoute );
app.use("/api/v1/books", booksRoute);

// server status
app.get("/", (req ,res)=> {
  const message = "Server is live";
  responseClient({req,res,message})
});

app.use(errorHandle);
app.use(responseClient);

dbConnect()
.then(()=> {
  app.listen(PORT, error => {
  error 
  ? console.log(error)
  : console.log("Server is ruuning at http://localhost:" + PORT);
  

}
);
})
.catch((error)=> console.log(error));



