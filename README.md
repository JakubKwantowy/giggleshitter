# Giggleshitter #

A dumb NodeJS multiserver.

## Setup ##

Run the following commands in a terminal

```bash
git clone https://github.com/JakubKwantowy/giggleshitter
cd giggleshitter

npm i

cp config.example.js config.js # Edit config.js now.
mkdir res
cp res.example/* res
mkdir www
touch www/index.html # Set your index.html up
```

To start the server run

```bash
npm run start
```

Or to start it over nodemon

```bash
npm run dev
```
