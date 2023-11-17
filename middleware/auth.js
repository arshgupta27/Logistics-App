export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        console.log("Token:", token);

        if (!token) {
            console.log("Access Denied: Token not provided");
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Verified:", verified);

        req.user = verified;
        next();
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};
