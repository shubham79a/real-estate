import prisma from "../lib/prisma.js"


export const getPosts = async (req, res) => {
    try {

        const posts = await prisma.post.findMany()
        res.status(200).json(posts)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to get posts" })
    }
}



export const getPost = async (req, res) => {
    try {

        const userId = req.params.id
        const post = await prisma.post.findUnique({
            where: { id: userId },
            include:{
                postDetail: true,
                user: {
                    select:{
                        username: true,
                        avatar: true
                    }
                }
            }
        })
        res.status(200).json(post)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to get post" })
    }
}



export const addPost = async (req, res) => {
    try {

        const body = req.body
        const tokenUserId = req.userId

        const newPost = await prisma.post.create({
            data: {
                ...body.postData,
                userId: tokenUserId,
                postDetail: {
                    create: body.postDetail,
                }
            }
        })

        res.status(200).json(newPost)


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Cannot add post" })
    }
}




export const updatePost = async (req, res) => {

    const id = req.params.id
    const tokenUserId = req.userId

    try {





    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Cannot update post" })
    }
}




export const deletePost = async (req, res) => {

    const id = req.params.id
    const tokenUserId = req.userId


    try {

        const post = await prisma.post.findUnique({
            where: { id }
        })
        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "Not Authorized" })
        }

        await prisma.post.delete({
            where: { id }
        })

        res.status(200).json({ message: "Post deleted" })




    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Cannot delete post" })
    }
}

