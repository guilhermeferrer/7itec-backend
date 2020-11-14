# Desafio 7iTec Backend

Backend developed using express for handling HTTP traffic, yup for middleware validation, mongoose for MongoDB database manipulation and jsonwebtoken for controlling authentication.

Checkout using the following command to start playing with the server:

```bash
git clone https://github.com/guilhermeferrer/7itec-backend
```

Don't forget to install dependencies:
```bash
cd 7itec-backend && yarn
```

or

```bash
cd 7itec-backend && npm install
```

To start the server use:
```bash
yarn dev:server
```

or

```bash
npm run dev:server
```

# Important
In order to successfully execute the server, you will need a MongoDB service installed. Rename `.env.example` to `.env` at root directory and edit it as showed bellow:

| KEY | VALUE |
| ------ | ------ |
| HOST | Host server's IP |
| API_PORT | Port location where the server you'll be running |
| MONGODB_PORT | Port number of you MongoDB database |
| MONGODB_DATABASE | Name of your MongoDB database |
| MONGODB_USER | User of your MongoDB database  |
| MONGODB_PASS | Password of your MongoDB database |
| MONGODB_AUTH_SOURCE| Auth source of your mongodb |