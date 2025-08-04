
export const insertNewBook = async (req, res, next)=> {
   try {
   console.log("todo add new book", req.body);

   } catch (error) {
    next(error)
   }
}
