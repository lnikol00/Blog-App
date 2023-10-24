# Backend - server
In the project directory, you can run:

### `npm run dev`

The command npm run dev is typically used in a Node.js-based project to start a development server or perform other development-related tasks. Here's what this command does:

* npm: This is the Node Package Manager, which is used to manage and install packages and dependencies for Node.js projects.
* run: This is a subcommand of npm that is used to execute a script defined in your project's package.json file.
* dev: This is the name of the script you want to run. The name "dev" is a common convention, but you can name your scripts as you see fit.

### `npm install` or `npm i`

The command npm install is used in Node.js and JavaScript development to install the dependencies listed in a project's package.json file.

Adding .env file: 

* DATABASE_URI - connection to MongoDB cluster.
* ACCESS_TOKEN_SECRET &  REFRESH_TOKEN_SECRET - use require('crypto').randomBytes(64).toString('hex') command in node.
* PORT - set to 3500

# Frontend - client

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm install` or `npm i`

The command npm install is used in Node.js and JavaScript development to install the dependencies listed in a project's package.json file.
