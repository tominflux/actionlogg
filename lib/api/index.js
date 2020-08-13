const actionlogMethods = require("./actionlog")
const archetypeMethods = require("./archetype")
const recordMethods = require("./record")

//

const allMethods = {
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