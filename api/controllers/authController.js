import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";


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
        res.json({ message: "User created successfully" })


    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to create user!" })
    }




}


export const login = async (req, res) => {

    const { username, password } = req.body;

    try {

        // check if user exists
        const user = await prisma.user.findUnique({
            where: { username: username }
        })

        if (!user) {
            return res.status(401).json({ message: "Invlid Credentials!" })
        }

        // check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invlid Credentials!" })
        }

        const age = 24 * 60 * 60 * 1000;
        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET, { expiresIn: age }
        )

        // cookie token 
        res.cookie("token", token, {
            httpOnly: true,
            // secure:true,
            maxAge: age,
        }).json({ message: "Login successful!" })

    } catch (error) {
        res.status(500).json({ message: error.message });
    }


}


export const logout = async (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logged out!" });
}