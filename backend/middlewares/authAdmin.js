import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
    try {

        const authHeader = req.headers['authorization'];

        const atoken = authHeader && authHeader.split(" ")[1];

        if (!atoken) {
            return res.status(401).json({
                success: false,
                message: "Token not provided"
            })
        }

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

        if (token_decode.email !== process.env.ADMIN_EMAIL && token_decode.password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({
                success: false,
                message: "Not authorized"
            })
        }

        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default authAdmin;