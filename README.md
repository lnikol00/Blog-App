# Blog App

Clone the repository into your projects directory:

### `git clone git@github.com:lnikol00/blog-react.git`

# Project Description

The "Blog App" is a web application that allows users to read and write blogs. To maintain a personalized and secure environment, users are required to create an account to access the app's features. Here's an overview of the project:

Features:

* User Registration and Authentication: Users can create an account by providing their personal details and securing their account with a password. The authentication system ensures that only registered users can access the app's features.
* Blog Creation: Registered users have the privilege to create and publish their own blogs. They can write, format, and share their thoughts, stories, or knowledge with the community.
* Blog Editing: Registered users can edit the blogs they have written. This feature enables bloggers to make updates and improvements to their content over time.
* Blog Deletion: Bloggers can also delete blogs that they've written, offering them full control over the content they have published.
* Read-Only Access: While all users can read blogs, the editing and deletion privileges are restricted to the author of the blog. Other users can only view the blogs in a read-only mode.
* Technology Stack: The project is built using Typescript for the frontend, providing a strong typing system and improved developer experience. The backend is powered by Node.js, offering scalability and versatility for handling user accounts, blogs, and interactions.

<h1 align="left">Languages and Tools:</h1>
<p align="left"> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a><a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://redux.js.org" target="_blank" rel="noreferrer"> </a> </p>

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
