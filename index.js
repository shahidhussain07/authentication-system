require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const sequelize = require("./config/db")
const userRoutes = require("./routes/user.route")

const app = express()
const PORT = 3000

// Middleware
app.use(bodyParser.json())

// Routes
app.use("/", userRoutes)

// Sync Database
sequelize.sync().then(() => {
	console.log("Database & tables created!")
})

if (require.main === module) {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`)
	})
}

module.exports = app
