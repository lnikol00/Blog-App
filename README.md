## Starting backend server
In order for login and register to work you will need to run backend server

### `npm run dev`

### `npm install` or `npm i`

The command npm install is used in Node.js and JavaScript development to install the dependencies listed in a project's package.json file.

Adding .env file: 

* DATABASE_URI - connection to MongoDB cluster.
* ACCES_TOKEN_SECRET &  REFRESH_TOKEN_SECRET - use require('crypto').randomBytes(64).toString('hex') command in node.

## Starting frontend server

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
