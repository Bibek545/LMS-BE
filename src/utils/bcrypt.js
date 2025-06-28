import bcrypt from "bcryptjs";
const saltRound = 15;

const hashPassword = (plainPassword) => {
    return bcrypt.hashSync(plainPassword, saltRound);
}

export default hashPassword;