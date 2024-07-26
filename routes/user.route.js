require("dotenv").config()
const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { jwtAuthMiddleware } = require("../middleware/jwt")
const User = require("../models/user.model")

const router = express.Router()

// POST route to add a user
router.post("/register", async (req, res) => {
	const { username, email, password } = req.body
	if (!username || !email || !password) {
		return res
			.status(400)
			.json({ message: "Please provide all required fields." })
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10)
		await User.create({ username, email, password: hashedPassword })
		res.status(200).json({ message: "User registered successfully." })
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
})

// POST route to log in a user
router.post("/login", async (req, res) => {
	const { email, password } = req.body
	if (!email || !password) {
		return res
			.status(400)
			.json({ message: "Please provide email and password." })
	}

	try {
		const user = await User.findOne({ where: { email } })
		if (!user) {
			return res
				.status(401)
				.json({ message: "Invalid email or password." })
		}

		const passwordIsValid = await bcrypt.compare(password, user.password)
		if (!passwordIsValid) {
			return res
				.status(401)
				.json({ message: "Invalid email or password." })
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY)
		res.status(200).json({ auth: true, token })
	} catch (error) {
		console.log(error)
		res.status(500).json({ error: "Internal server error" })
	}
})

// GET route to retrieve the logged-in user's profile information
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
	try {
		const user = await User.findByPk(req.userId, {
			attributes: ["username", "email"],
		})
		if (!user) {
			return res.status(404).json({ message: "User not found." })
		}
		res.status(200).json(user)
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: "Internal Server Error" })
	}
})

module.exports = router
