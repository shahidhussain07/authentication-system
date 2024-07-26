const request = require("supertest")
const app = require("../../index")
const User = require("../../models/user.model")
const sequelize = require("../../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

beforeAll(async () => {
	require("dotenv").config({ path: "../../.env.test" })
	await sequelize.sync({ force: true })
})

afterAll(async () => {
	await sequelize.close()
})

describe("Auth API Endpoints", () => {
	it("should register a new user", async () => {
		const res = await request(app).post("/register").send({
			username: "testuser",
			email: "testuser@example.com",
			password: "testpassword",
		})
		expect(res.statusCode).toEqual(200)
		expect(res.body.message).toBe("User registered successfully.")
	})

	it("should login a user and return a JWT", async () => {
		await User.create({
			username: "testuser2",
			email: "testuser2@example.com",
			password: await bcrypt.hash("testpassword", 10),
		})

		const res = await request(app).post("/login").send({
			email: "testuser2@example.com",
			password: "testpassword",
		})
		expect(res.statusCode).toEqual(200)
		expect(res.body.auth).toBe(true)
		expect(res.body).toHaveProperty("token")
	})

	it("should return user profile for authenticated user", async () => {
		const user = await User.create({
			username: "testuser3",
			email: "testuser3@example.com",
			password: await bcrypt.hash("testpassword", 10),
		})

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY)

		const res = await request(app)
			.get("/profile")
			.set("Authorization", `Bearer ${token}`)
		expect(res.statusCode).toEqual(200)
		expect(res.body.username).toBe("testuser3")
		expect(res.body.email).toBe("testuser3@example.com")
	})
})
