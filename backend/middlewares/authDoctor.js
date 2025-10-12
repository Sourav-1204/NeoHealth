import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Token not provided"
            })
        }

        const decode_token = jwt.verify(token, process.env.JWT_SECRET);
        req.params.docId = decode_token.id;
        next();

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export default authDoctor;