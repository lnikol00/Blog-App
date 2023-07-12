## Starting backend server
In order for login and register to work you will need to run backend serves

### `npm run dev`

In order to connect server to MongoDB you will need to add .env file and add ACCES_TOKEN_SECRET, REFRESH_TOKEN_SECRET and DATABASE_URI.

For DATABASE_URI you need the connection from MongoDB.

For ACCES_TOKEN_SECRET and REFRESH_TOKEN_SECRET use require('crypto').randomBytes(64).toString('hex') command in node.

## Starting frontend server

In the project directory, you can run:

### `npm start`

In order to run data from db.json, you can run 

### `npx json-server --watch src/data/db.json --port 8000`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
