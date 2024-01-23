# Boozers Weepers



## Table of Contents
- [Project Description](#project-description)
- [Demo](#demo)
- [Features](#features)
- [How it works](how-it-works)
- [How to Run the Application](#how-to-run-the-application)
- [Contributors](#contributors)

## Project Description
Boozers Weepers was a 2-week group project that aimed to track informal pub bets with your friends.
We worked in a group with two quality engineers who focused on the frontend tests and 

Tech Used:
- MongoDB
- Express.js
- React.js
- Node.js
- Testing: Jest in the backend, Selenium in the frontend

## Demo

## Features
- User authentication and authorization with JWT tokens.
- 
- 
## Contributors
- [Rachel Roberts](https://github.com/Rachel853)
- [Ben ]()
- [Sam] ()
- [Manuela (Quality engineer)] ()
- [Karys (Quality engineer)] ()





## Documentation

[More documentation of the codebase and its architecture can be found here.](./DOCUMENTATION.md) It's recommended you all read this _after making sure the whole setup below worked for everyone_. Then work together on a diagram describing how the application works.

[A template Miro board for your diagrams can be found here.](https://miro.com/app/board/uXjVPqNzFfc=/?share_link_id=360271550320) Make sure your validate your diagrams with your coach.

## How to Run the Application

1. Clone the repository: `git clone https://github.com/Catherine-Russell/Facebook-Clone.git`
2. Navigate to the project directory
3. Install dependencies for both the server and client: `npm install` in the `frontend` directory and the `api` directory.
4. Set the JWT_SECRET environment variable: `export JWT_SECRET="your-secret-key"`
5. Start the server: `npm start` in the `frontend` directory.
6. Start the client: `npm start` in the `api` directory.
7. 
1. Install Node Version Manager (NVM)
   ```
   brew install nvm
   ```
   Then follow the instructions to update your `~/.bash_profile`.
2. Open a new terminal
3. Install the latest version of [Node.js](https://nodejs.org/en/), currently `18.1.0`.
   ```
   nvm install 18
   ```






### Set up your project

1. Fork this repository
2. Rename your fork to `tavern-<team name>`
3. Clone your fork to your local machine
4. Install Node.js dependencies for both the `frontend` and `api` directories.
   ```
   ; cd api
   ; npm install
   ; cd ../frontend
   ; npm install
   ```

> You might get warning messages about the installed dependencies at this point. You can ignore them, as long as the installation process doesn't fail. If the setup fails at this point, don't wait for too long and reach out to your coach.

5. Install an ESLint plugin for your editor. For example: [`linter-eslint`](https://github.com/AtomLinter/linter-eslint) for Atom.
6. Install MongoDB
   ```
   brew tap mongodb/brew
   brew install mongodb-community@5.0
   ```
   *Note:* If you see a message that says `If you need to have mongodb-community@5.0 first in your PATH, run:`, follow the instruction. Restart your terminal after this.
7. Start MongoDB
   ```
   brew services start mongodb-community@5.0
   ```

### How to run the server and use the app (as a human)

1. Start the server application (in the `api` directory)

  **Note the use of an environment variable for the JWT secret**

   ```
   ; cd api
   ; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm start
   ```
2. Start the front end application (in the `frontend` directory)

  In a new terminal session...

  ```
  ; cd frontend
  ; npm start
  ```

You should now be able to open your browser and go to `http://localhost:3000/signup` to create a new user.

Then, after signing up, you should be able to log in by going to `http://localhost:3000/login`.

After logging in, you won't see much but you can create posts using PostMan and they should then show up in the browser if you refresh the page.

### How to run automated tests

The automated tests run by sending actual HTTP requests to the API. Therefore, before anything, you'll need to start the backend server in test mode (so that it connects to the test DB).

**Note the use of an environment variable for the JWT secret**

```bash
# Make sure you're in the api directory
; cd api

; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm run start:test
```

You should leave this running in a terminal.

Then, you can either run tests for the backend or the frontend following the steps below. 

#### Running tests for the backend

Run the tests in a new terminal session:

```bash
# Make sure you're in the api directory
; cd api

; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm run test
```

####  Running tests for the frontend

Start the front end in a new terminal session

```bash
# Make sure you're in the frontend directory
; cd frontend

; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm start
```

Then run the tests in a new terminal session

```bash
# Make sure you're in the frontend directory
; cd frontend

; JWT_SECRET=f6d278bb34e1d0e146a80b16ec254c05 npm run test
```

## MongoDB Connection Errors?

Some people occasionally experience MongoDB connection errors when running the tests or trying to use the application. Here are some tips which might help resolve such issues.

- Check that MongoDB is installed using `mongo --version`
- Check that it's running using `brew services list`

If you have issues that are not resolved by these tips, please reach out to a coach and, once the issue is resolved, we can add a new tip!



<!-- END GENERATED SECTION DO NOT EDIT -->
