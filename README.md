## Project Overview

Welcome to the RentAPI repository! This project is part of a series of personal studies on Node.js, aimed at showcasing a range of advanced concepts and practical applications. The RentAPI is developed with TypeScript, adhering to the foundational principles of Clean Architecture and S.O.L.I.D. The project encompasses REST API design, file handling via streams, communication with PostgreSQL databases using TypeORM, injectable containers, JWT authentication with refresh tokens, and meticulous API documentation with Swagger. The application is fortified with automated tests, spanning both unit and integration levels, seamlessly integrated with the Jest Framework.

[Check the API documentation on Swagger UI](http://18.231.189.148/api-docs/)

## Technical specification

- **Design**: Guided by Clean Architecture, Clean Code, Test Patterns, and S.O.L.I.D principles.
- **Architecture**: Powered by Express, Node.js, and TypeScript. Communicates seamlessly with PostgreSQL using TypeORM. Utilizes Jsonwebtoken for authentication and Nodemailer for efficient email communication.
  - **Documentation Framework**: Swagger ensures clear API documentation.
  - **Testing Frameworks**: Embraces Jest and Supertest for comprehensive testing.
- **Infrastructure**: Seamlessly integrates with AWS services like EC2, S3, and SES. Simplifies deployment through Docker.
- **CI/CD**: GitHub Actions streamline the development workflow.
- **Security Measures**: Rate-limiter-flexible and Redis enhance security and data management.

For deeper insights, delve into the [project's wiki](https://github.com/amandastecz/rentapi/wiki/).

# Running the RentAPI project locally

Follow these steps to get the RentAPI project up and running on your local machine:

### 1. Install Dependencies

Open a terminal and navigate to the project's root directory. Run the following command to install all required dependencies:

```bash
yarn
```

### 2. Set Up Database and Caching

Run the following command to create the PostgreSQL database and Redis images necessary for the project:

```bash
docker-compose up
```

### 3. Run Migrations
After setting up the database, execute the following command to run all migrations and set up the database schema:

```bash
yarn run typeorm migration:run
```

### 4. Populate Database
Populate the database with an admin user by running the following command:
```bash
yarn run seed:admin
```
This step ensures that you have initial data for testing and development.
### 5. Start the Server
To start the server and launch the application, use the following command:
```bash
yarn dev
```

With these steps completed, you'll have the RentAPI project running on your localhost, ready for exploration, testing, and development. Feel free to dive into the codebase and API documentation. 