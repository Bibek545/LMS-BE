import express from 'express';
const app = express ()

const PORT = process.env.PORT || 8000

// server status
app.get("/", (req ,res)=> {
  res.json({
    message: "Server is live and working",
  });
});

app.listen(PORT, error => {
  error 
  ? console.log(error)
  : console.log("Server is ruuning at http://localhost:" + PORT);
  

}
);
