const insertNewUserController = (req, res, error)=>{
    try {

        createNewUser();
        
        res.json({
            status: "success",
            message: "todo"
        })
    } catch (error) {
        next(error);
    }
};

export default insertNewUserController;
