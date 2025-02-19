import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        // hash
        const hashedPassword = await bcrypt.hash(password, 10);


        // new user 
        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPassword,
            },
        })
        console.log(newUser);
    } catch (error) {
        console.log(error.message);
        
    }




}


export const login = ((req, res) => {

})


export const logout = ((req, res) => {

})