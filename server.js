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


// API endpoints
import router from './src/routes/authRoute.js';
app.use("/api/v1/auth", router)

// server status
app.get("/", (req ,res)=> {
  res.json({
    message: "Server is live and working",
  });
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



