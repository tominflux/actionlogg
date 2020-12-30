const actionlogMethods = require("./actionlog")
const archetypeMethods = require("./archetype")
const recordMethods = require("./record")

//

const initialiseActionlogg = async (dataApi) => {
    await dataApi.initialiseActionlogg()
}
const destroyActionlogg = async (dataApi) => {
    await dataApi.destroyActionlogg()
}

//

const allMethods = {
    initialiseActionlogg,
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