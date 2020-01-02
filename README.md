### APIs available

### Technologies used
* Node 8.11.x
* Express 4.16.x
* PostgreSQL 9.6

## Packages and tools used
* sequelize
* pg@6.4.1 (should be installed globally)
* pg-hstore (should be installed globally)
* jsonwebtoken
* helmet
* lodash
* winston
* mocha
* supertest
* eslint (should be installed globally)
* sequelize-auto (should be installed globally)
* sequelize-cli (should be installed globally)

## Development

## Environment variables

Create .env file in the root of your application and add the following variables in the file.

* PORT - Specify port to run the application
* DATABASE_URL - PostgreSQL connection string
* DATABASE_URL_TEST - PostgreSQL test database connection string
* DATABASE_URL is of the format database://username:password@host:database_port/database_name

## Module Generator
* To genarate a new module (resource) run the following command. This will ask the module details.
```sh
yarn run gen:module
```
After generating a module please add the module name in app.module.js

## Model Generator
* To genarate a new model (database) run the following command.
```sh
yarn run gen:models
```


## Core modifications

### Added two new functions to response object
1. res.return() - This function is a replacement for res.send(), using this function we include additional information to the response such as message, status and data.
  * Example ```res.return({name: "Anoop"}) // Output {"message":"OK","status":200, data: {name: "Anoop"}}```

2. res.message() - To send custom message along with the response, by default it will take standard http message.
  * Example 1: ```res.status(500).message("Some thing went wrong with the server").return() // Response {"message":"Some thing went wrong with the server","status":500}```
  * Example 2: ```res.status(500).return() // Response {"message":"Internal Server Error","status":500}```