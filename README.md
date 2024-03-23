# Todo List Application

### How to run

- `cd /path/to/your/project`
- `npm install`
- `npm start` on localhost

### Initialize Git Repository:

- Run `git init` command in the root directory of the project to initialize a new Git repository. This will allow you to track changes to the code and collaborate with others.

### Initialize npm:

- Run `npm init` command in the root directory of the project to initialize a new npm package. This will create a `package.json` file that holds metadata about the project and its dependencies.

### Install Fastify or Express:

- Choose either Fastify or Express as the web framework for building the API endpoints of the Todo List Application.
- To install Fastify, run `npm install fastify`.
- To install Express, run `npm install express`.

### Install PostgreSQL package:

- Run `npm i pg` to install the `pg` package, which provides a PostgreSQL client for Node.js. This package will be used to interact with the PostgreSQL database.

### Install CORS package:

- Run `npm install cors` to install the `cors` package, which allows Cross-Origin Resource Sharing (CORS) in the application. This is important if you plan to make API requests from different domains.

### Update package.json:

- In the `package.json` file, under the "dependencies" section, add the following dependencies with their respective versions:
- This ensures that the required packages are installed with the specified versions.

### Create routes files:

- Set up route files to define the API endpoints for the Todo List Application.
- Create separate files for different routes, such as `todoRoutes.js` or `taskRoutes.js`, depending on the application structure.
- In these files, define the necessary routes for handling CRUD operations (Create, Read, Update, Delete) on the todo list items.

### Set up the database connection:

- Create a separate file, such as `db.js` or `database.js`, to handle the database connection and queries.
- Use the `pg` package to establish a connection with the PostgreSQL database.
- Implement functions for executing SQL queries and interacting with the database tables.

### Use CORS:

- In the main application file (e.g., `app.js` or `index.js`), import the `cors` package and use it as middleware to enable CORS.

### Implement REST API endpoints:

    - Using the chosen web framework (Fastify or Express), define the REST API endpoints for handling CRUD operations on the todo list items.
    - Create routes for GET, POST, and PUT requests to retrieve, create, and update todo items, respectively.
    - Implement the necessary logic in these routes to interact with the database and perform the corresponding CRUD operations.

### Update README.md:

    - Update the README.md file to provide instructions on how to run and use the Todo List Application.
    - Include information about the available API endpoints, their functionalities, and request/response formats.
    - Add any other relevant details or documentation that would be helpful for users or developers interacting with the application.
