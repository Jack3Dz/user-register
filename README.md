## User-Register CRUD application using NodeJS Express and React-Redux

This project is based in a user register;

Backend is build using NodeJS Express, and Frontend is build using React-Redux, the database used to perform data persistence is MongoDB.

The application works as follows: 
* Frontend performs a request to the backend >
* Backend performs a request to the database > 
* The database returns the response > 
* The backend processes the response > And returns the response to the frontend.

The `api` uri preceeds all API endpoints and the following endpoints are currently available
* GET `/api/v1/users/` - Get All users.
* POST `/api/v1/users/` - Create a new User(It is necessary to pass the name and cpfcnpj in the body).

* GET `/api/v1/users/:id` - Get specific User.
* PUT `/api/v1/users/:id` - Update Specific User.
* PATCH `/api/v1/users/:id` - Update Specific User.
* DELETE `/api/v1/users/:id` - Delete Specific User.

To configure this project, follow the steps below:

### Installation

First of all you will have to download the project, run the following command:

```sh
$ git clone https://github.com/Jack3Dz/user-register.git
```

You will now need to have Docker and Compose installed on your machine, if you do not have it yet, you can download it at the following link:

https://www.docker.com/products/docker-desktop - Docker

https://docs.docker.com/compose/install/#install-compose - Compose

Once you have Docker and Compose installed, you will need to have NodeJS installed, if you do not have it yet, you can download it at the following link:

https://nodejs.org/en/download/


Once you have Docker, Compose and NodeJS installed, you need to access the application folder:

```sh
$ cd user-register
```

After accessing the application directory and created .env file, you will need to build docker containers, since we have two applications, we do this separately, starting with the backend, run the following command:

```sh
$ cd backend
```

The docker container of backend uses environment variables, so we need to create an .env file inside the backend folder,

```JSON
    MONGO_INITDB_ROOT_USERNAME=example
    MONGO_INITDB_ROOT_PASSWORD=example
    MONGO_INITDB_DATABASE=api
    MONGO_DATA_DIR=/data/db
    MONGO_TEST_DATA_DIR=/data/test_db
    MONGO_LOG_FILE=/var/log/mongodb/mongodb.log
    PORT=8080
```

After accessing the backend directory, you can build the docker containers,
I configured the node scripts to up the containers, so you can run the following command, and the backend and database containers will be build.

```sh
$ npm run build
```

Once this is done, you can start the backend and database containers

```sh
$ npm run start
```

Now the Server is Running in Port 8080, using the Example environment, you can change if you need.

To verify that everything is working properly, you can run the API tests

```sh
$ npm run test
```

With the backend containers running, we can then up the container from the frontend, access the frontend folder:

```sh
$ cd frontend
```

In frontend folder run the following command:

```sh
$ npm run build
```

With that done you can up the container

```sh
$ npm run start
```

With this done the application will already be running on port 3000, you can access in the browser using the following URL

```sh
http://localhost:3000/
```

If you want to up the containers in production, you can run the following command in both applications:

```sh
$ npm run production
```
