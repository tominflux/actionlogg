const express = require("express")
const bodyParser = require('body-parser');
const { serveActionlogApi } = require("./actionlog")
const { serveArchetypeApi } = require("./archetype")
const { serveRecordApi } = require("./record")

const genActionloggExpressRestApi = (actionloggApi) => {
    const router = express.router()
    router.use(bodyParser.json())
    //Insert actionlogg API into router requests.
    router.use((req, res, next) => {
        req.actionlogg = actionloggApi
        next()
    })
    //
    serveActionlogApi(router)
    serveArchetypeApi(router)
    serveRecordApi(router)
    //
    return router
}

module.exports = genActionloggExpressRestApi