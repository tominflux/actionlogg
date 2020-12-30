const actionlogMethods = require("./actionlog")
const archetypeMethods = require("./archetype")
const recordMethods = require("./record")

//

const initialiseActionlogg = async (dataApi) => {
    await dataApi.initialiseActionlogg()
}
const checkActionlogg = async (dataApi) => {
    await dataApi.checkActionlogg()
}
const destroyActionlogg = async (dataApi) => {
    await dataApi.destroyActionlogg()
}

//

const allMethods = {
    initialiseActionlogg,
    checkActionlogg,
    destroyActionlogg,
    ...actionlogMethods,
    ...archetypeMethods,
    ...recordMethods
}

//

const { genCoreApi } = require("@x-logg/util")

//

const genActionloggApi = (dataApi) => {
    return genCoreApi(allMethods, dataApi)
}

module.exports = genActionloggApi