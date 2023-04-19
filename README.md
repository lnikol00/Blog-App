## Starting backend server
In order for login and register to work you will need tho download and run backend server from this link

https://github.com/gitdagray/mongo_async_crud.git 

In order to start the server type, you can run

### `npm run dev`

In order to connect server to MongoDB you will need to add .env file and add ACCES_TOKEN_SECRET, REFRESH_TOKEN_SECRET and DATABASE_URI.

For DATABASE_URI you need to pass the connection from MongoDB.

For ACCES_TOKEN_SECRET and REFRESH_TOKEN_SECRET use require('crypto').randomBytes(64).toString('hex') command in node.

## Fetching data with useFetch
In order to fetch data from db.json run this command in terminal

### `npx json-server --watch src/data/db.json --port 8000`
