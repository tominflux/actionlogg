const express = require("express")
const bodyParser = require('body-parser');
const { serveActionlogApi } = require("./actionlog")
const { serveArchetypeApi } = require("./archetype")
const { serveRecordApi } = require("./record")

//

const postActionlogg = async (req, res) => {
    await req.actionlogg.initialiseActionlogg()
    res.send()
}
const getActionlogg = async (req, res) => {
    const initialised = await req.actionlogg.checkActionlogg()
    res.json({ initialised })
}
const deleteActionlogg = async (req, res) => {
    await req.actionlogg.destroyActionlogg()
    res.send()
}

//

const serveActionloggApi = (router) => {
    router.post("/actionlogg", postActionlogg)
    router.get('/actionlogg', getActionlogg)
    router.delete("/actionlogg", deleteActionlogg)
}

//

const genActionloggExpressRestApi = (actionloggApi) => {
    const router = express.Router()
    router.use(bodyParser.json())
    //Insert actionlogg API into router requests.
    router.use((req, res, next) => {
        req.actionlogg = actionloggApi
        next()
    })
    //
    serveActionloggApi(router)
    serveActionlogApi(router)
    serveArchetypeApi(router)
    serveRecordApi(router)
    //
    return router
}

module.exports = genActionloggExpressRestApi