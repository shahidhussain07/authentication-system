# Authentication System

A simple authentication system built using Node.js, Express, Sequelize, MySQL, and JWT. This application provides user registration, login, and profile retrieval functionalities, with password hashing and JWT-based authentication.

## Tech Stack

-   **Node.js**: JavaScript runtime for server-side development.
-   **Express**: Web framework for building APIs.
-   **Sequelize**: ORM for interacting with MySQL.
-   **MySQL**: Relational database for storing user data.
-   **JWT (JSON Web Token)**: For securing API endpoints.
-   **bcrypt**: Library for hashing passwords.
-   **Jest**: Testing framework for unit and integration tests.
-   **Supertest**: HTTP assertion library for testing API endpoints.

## Installation

1. **Clone the Repository**

    ```sh
    git clone https://github.com/shahidhussain07/authentication-system.git
    cd authentication-system
    ```

2. **Install Dependencies**

    Run the following command to install the required Node.js packages:

    ```sh
    npm install
    ```

3. **Configure Environment Variables**

    Create a `.env` file in the root directory of your project and add the following environment variables:

    ```env
    JWT_SECRET_KEY=your_jwt_secret_key
    DB_NAME=db_name
    DB_USER=your_username
    DB_PASS=your_password
    DB_HOST=localhost
    ```

    Create a `.env.test` file in the root directory for testing:

    ```env
    JWT_SECRET_KEY=your_jwt_secret_key
    DB_NAME=test_db
    DB_USER=your_username
    DB_PASS=your_password
    DB_HOST=localhost
    ```

4. **Set Up the MySQL Database**

    Ensure that your MySQL server is running and create a database named `db_name` (or the one you configured in the `.env` file).

    You can create the database using the MySQL CLI or a database management tool.

## Running the Application

1. **Start the Server**

    Run the following command to start the application:

    ```sh
    node app.js
    ```

    The server will start on port 3000 (or the port specified in your code).

2. **Testing**

    To run the unit and integration tests, use the following command:

    ```sh
    npm test
    ```

    This will execute the tests in the `tests/` directory.

## API Endpoints

-   **POST /register**

    Registers a new user. Expects a JSON payload with `username`, `email`, and `password`.

-   **POST /login**

    Logs in a user and returns a JWT. Expects a JSON payload with `email` and `password`.

-   **GET /profile**

    Retrieves the logged-in user's profile information. Requires a Bearer token in the `Authorization` header.

## Project Structure

```
auth-system/
├── config/
│   └── db.js                   # Database configuration
├── middleware/
│   └── jwt.js                  # JWT authentication middleware
├── models/
│   └── user.model.js           # User model
├── routes/
│   ├── user.route.js           # Authentication routes
├── tests/
│   ├── integration/            # Integration tests
│   │   └── auth.test.js
│   └── unit/                   # Unit tests
│       └── auth.test.js
├── .env                        # Environment variables for development
├── .env.test                   # Environment variables for testing
├── index.js                    # Main application file
├── jest.config.js              # Jest configuration
├── package-lock.json           # Project dependencies and scripts
└── package.json                # Project dependencies and scripts
```
