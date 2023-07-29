## NodeJs - Rent API

This project is part of a series of personal studies I'm doing on Node.js. This project is being developed with Typescript, Rest API, Clean Architecture and S.O.L.I.D principles, importing and reading files in stream; communication with PostgreSQL database through TypeORM; containerization with Docker in addition to all the API documentation with Swagger

### Project Structure

- Model --> Data structure (entity modeling)
- Repositories --> Database interface contracts and database interactive methods
- UseCases --> My application's business rules: Controllers and Services
- Routes --> My application's routes

### SOLID - Robert C. Martin (Uncle Bob)
- [X] S: SRP: Single Responsibility Principle - Single responsibility (separation by context)
- [X] L: LSP: Liskov Substitution Principle - Liskov Substitution Principle, talks about using contracts (class implementing interfaces)!
- [X] D: DIP: Dependency Inversion Principle - Dependency Inversion Principle, also means that what is at a high level does not need to know what is at a low level, that is, services do not need to know the repository, the responsibility passes for who calls the service

### Docker
- To run the application image: `docker-compose up`

- up: Creates the container.
- down: Removes the container.
- start: Starts the container
- stop: Stops the container.

### Migrations
- To create a migration run: `yarn run typeorm migration:create -n CreateCategories`
- To run the migration run: `yarn run typeorm migration:run`
