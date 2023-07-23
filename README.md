[![N|Solid](https://iili.io/Hi9giog.png)](https://www.enverx.com/)

EnverX offers a simple and convenient platform to fund early-stage projects
and trade future carbon credits.

## _Assginment For Backend Developer Role_
This is a simple Node.js API project using Express and Sequelize. It provides basic CRUD operations for managing blog posts data for simple blog application with a PostgreSQL database.

## Prerequisites

Before setting up the project, you'll need to have the following installed on your system:

1. Node.js (https://nodejs.org/) - Make sure to install the LTS version.
2. PostgreSQL (https://www.postgresql.org/) - You need a running PostgreSQL server to use as the database.


### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

    If the installation was successful, you should be able to run the following command.
    
        $ node --version
        v16.20.0
    
        $ npm --version
        8.19.4

    If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.
    
        $ npm install npm -g
    
    ###

## Folder Structure
![N|Solid](https://upload-images-task.s3.amazonaws.com/Screenshot+2023-07-23+at+8.02.18+AM.png)


## Install

    $ git clone git@github.com:dthakurani/enverx-be-developer-assignment.git
    $ cd enverx-be-developer-assignment
    $ npm install
    $ configure-husky

## Configure app

    create .env file with following values

    SERVER_PORT=
    
    DB_USERNAME=
    DB_PASSWORD=
    DB_DATABASE=
    DB_HOST=
    DIALECT=
    
    SALT_ROUNDS=
    
    TEST_DB_USERNAME=
    TEST_DB_PASSWORD=
    TEST_DB_DATABASE=
    TEST_DB_HOST=
    TEST_DIALECT=
   
  you can also refer .env.sample

## Database conectivity
    you need a database and make changes in .env and config.js file
    
## Migration and Seeders
After setting database connection run migrations and then seed data for users and blog categories through seeders.
``` diff
npm run migrations
npm run seeders
```

## Database Schema
![N|Solid](https://upload-images-task.s3.amazonaws.com/Screenshot+2023-07-23+at+8.08.59+AM.png)


## Running the API
To start the API server, use the following command:
```diff
    npm run start
```
## Output on running npm start

    > enverx-be-developer-assignment@1.0.0 start
    > nodemon index.js

    [nodemon] 3.0.1
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching path(s): *.*
    [nodemon] watching extensions: js,mjs,cjs,json
    [nodemon] starting `node index.js`
    Executing (default): SELECT 1+1 AS result
    ... Microservice db ✔
    --- Server started on 6001 ---
    
The API will be available at http://localhost:6001 by default. You can change the port by modifying the PORT environment variable in the .env file or your hosting environment.

## API Endpoints
The API exposes the following endpoints:
- GET /api/users - Get all seeded users
- Get /api/categories - Get all seeded categories
- GET /api/posts - Get all posts.
- GET /api/posts/:id - Get a single post by ID.
- POST /api/posts - Create a new post. (Payload should be sent in JSON format)
- PUT /api/posts/:id - Update an existing post by ID. (Payload should be sent in JSON format)
- DELETE /api/posts/:id - Delete a post by ID.

## Using the API
You can use any API testing tool like Postman or curl to interact with the API.
Example:
1. To retrieve all users
     ```
    GET http://localhost:6001/api/users
    ```

     query params
     ```
     page (default set to 1)
     limit (default set to 10)
     ```

3. To retrieve all categories
    ```
    GET http://localhost:6001/api/categories
    ```

    query params
     ```
     page (default set to 1)
     limit (default set to 10)
     ```
    
4. To retrieve all posts:
    ```
    GET http://localhost:6001/api/posts
    ```

    query params
     ```
     sort (enum [created_at, title] default set to created_at and than title)
     categories (except array of uuid)
     page (default set to 1)
     limit (default set to 10)
     ```
    
5. To retrive a post by id:
    ```
    GET http://localhost:6001/api/posts/:id
    ```
    
6. To create a new post:


    ```
    POST http://localhost:6001/api/posts
    Content-Type: application/json
    Authorization: user id (uuid)
    ```
    ```json
    {
    "title": "DuraForce Pro up to Date",
    "content": "Kyocera today launched the DuraForce Pro 3, an overdue replacement for its DuraForce Pro 2 rugged, business-focused smartphone launched in 2018. The new model updates nearly all specs to modern standards, including 5G, larger display, larger battery (4,270 mAh), better cameras, better processor (Snapdragon 7 Gen 1).",
    "categories": ["d4436a78-611a-4a09-b7d1-d290dc4e626c", "fc9ec107-55a5-4b0b-8030-330d6bbdff47", "3b4a60e5-925d-4197-9ea0-555d5a835b4b", "2e86c436-9caa-49f9-a2bc-de92972dce90"],
    "published": true
    }
    ```
    
    required fields
    ```
    title
    content
    categories
    ```
    
7. To update a post:
    ```
    PUT http://localhost:6001/api/posts/:id
    Content-Type: application/json
    Authorization: user id (uuid)
    ```
    ```json
    {
    "title": "DuraForce Pro up to Date",
    "content": "Kyocera today launched the DuraForce Pro 3, an overdue replacement for its DuraForce Pro 2 rugged, business-focused smartphone launched in 2018. The new model updates nearly all specs to modern standards, including 5G, larger display, larger battery (4,270 mAh), better cameras, better processor (Snapdragon 7 Gen 1).",
    "categories": ["d4436a78-611a-4a09-b7d1-d290dc4e626c", "fc9ec107-55a5-4b0b-8030-330d6bbdff47"],
    "published": true
    }
    ```
    required fields
    ```
    title
    content
    categories
    ```
    
8. To delete a post:
    ```
    DELETE http://localhost:6001/api/posts/:id
    ```

## Unit Testing

The project includes unit tests to ensure the reliability of the API. The tests are implemented using Jest, a popular testing framework for Node.js.

To run the unit tests, use the following command:
```
npm test
```
The tests are located in the tests directory. Jest will automatically discover and execute these test files.


## API Documentation
-
    For further details about each feature you can refere to Api docs 
    [here](https://documenter.getpostman.com/view/13950962/2s946mZV8B)
