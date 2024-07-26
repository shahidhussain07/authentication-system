require("dotenv").config()
const jwt = require("jsonwebtoken")

const jwtAuthMiddleware = (req, res, next) => {
	// first check request headers has authorization or not
	const authHeader = req.headers["authorization"]
	if (!authHeader) {
		return res
			.status(403)
			.json({ auth: false, message: "No token provided." })
	}
	// Extract the jwt token from the request headers
	const token = authHeader.split(" ")[1]
	if (!token) return res.status(401).json({ error: "Unauthorized" })

	jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
		if (err) {
			return res
				.status(500)
				.json({ auth: false, message: "Failed to authenticate token." })
		}

		req.userId = decoded.id
		next()
	})
}

module.exports = { jwtAuthMiddleware }
