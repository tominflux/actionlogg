require('dotenv').config()


const genActionloggMongoApi = require("../mongoApi/lib/api")
const genActionloggApi = require("../lib/api")
const genActionloggRestApi = require("../expressRestApi/lib/api")

const actionloggMongoApi = genActionloggMongoApi(
    process.env.MONGO_CONNECTION,
    process.env.MONGO_DATABASE
)
const actionloggApi = genActionloggApi(actionloggMongoApi)
const actionloggRestApi = genActionloggRestApi(actionloggApi)


//////////
//////////


const express = require('express')

const app = express()
const port = 3000

app.use("/api", actionloggRestApi)

app.listen(
    port,
    () => console.log(
        `Actionlogg API listening at http://localhost:${port}`
    )
)