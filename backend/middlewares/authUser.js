import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized login again"
            })
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.params.userId = token_decode.id;
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error occurred! " + error.message
        })
    }
}

export default authUser;