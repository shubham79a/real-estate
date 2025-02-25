import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {

    try {

        const users = await prisma.user.findMany();
        if (users) {
            res.status(200).json(users);
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to get users!" });
    }

}

export const getUser = async (req, res) => {

    const id = req.params.id;

    try {

        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found!" });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to get users!" });
    }

}



export const updateUser = async (req, res) => {

    const id = req.params.id;
    const tokenUserId = req.userId;
    const { password, avatar, ...inputs } = req.body;


    try {

        if (id !== tokenUserId) {
            return res.status(403).json({ message: "You are not authorized to update this user!" });
        }

        let updatedPassword = null;
        if (password) {
            updatedPassword = await bcrypt.hash(password, 10);
        }



        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...inputs,
                ...(updatedPassword && { password: updatedPassword }),
                ...(avatar && { avatar })
            }
        })

        const { password: userPassword, ...user } = updatedUser;

        res.status(200).json(user);



    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to update user!" });
    }

}



export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    try {

        if (id !== tokenUserId) {
            return res.status(403).json({ message: "You are not authorized to update this user!" });
        }

        await prisma.user.delete({
            where: { id }
        });
        res.status(200).json({ message: "User deleted" });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Failed to delete user!" });
    }

}


