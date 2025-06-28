const insertNewUserController = (req, res, error)=>{
    try {
        //to do sign up process
        // receive the user data
        // encrypt the password
        // insert the user into the database
        //create an unique user activation link anfd send it to their email

        // have to do all of them before the response.json starts
        res.json({
            status: "success",
            message: "todo"
        })
    } catch (error) {
        next(error);
    }
};

export default insertNewUserController;
