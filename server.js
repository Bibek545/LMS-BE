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

app.use(errorHandle);
app.use(responseClient);

// API endpoints
import router from './src/routes/authRoute.js';
import { errorHandle } from './src/middleware/errorHandler.js';
import { responseClient } from './src/middleware/responseClient.js';
import userRoute from './src/routes/userRoute.js'
app.use("/api/v1/auth", router)
app.use("/api/v1/users", userRoute )
// server status
app.get("/", (req ,res)=> {
  const message = "Server is live";
  responseClient({req,res,message})
});



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



