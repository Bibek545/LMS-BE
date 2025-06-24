import express from 'express'
const router = express.Router()

// user sign up

router.post("/register", (req, res, error)=>{
    try {
        res.json({
            status: "success",
            message: "todo"
        })
    } catch (error) {
        next(error);
    }
});

export default router;