const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../../models/user.model")
require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET_KEY

describe("Authentication Logic", () => {
	it("should hash password correctly", async () => {
		const password = "testpassword"
		const hashedPassword = await bcrypt.hash(password, 10)
		const match = await bcrypt.compare(password, hashedPassword)
		expect(match).toBe(true)
	})

	it("should generate a JWT", () => {
		const userId = 1
		const token = jwt.sign({ id: userId }, JWT_SECRET)
		const decoded = jwt.verify(token, JWT_SECRET)
		expect(decoded.id).toBe(userId)
	})

	it("should authenticate a JWT", () => {
		const userId = 1
		const token = jwt.sign({ id: userId }, JWT_SECRET)
		const decoded = jwt.verify(token, JWT_SECRET)
		expect(decoded.id).toBe(userId)
	})
})
