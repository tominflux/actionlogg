const { genMongoApi } = require("@x-logg/util")
const actionlogMethods = require("./actionlog")
const archetypeMethods = require("./archetype")
const recordMethods = require("./record")
const {
    connect,
    createMongoCollection,
    deleteMongoCollection,
    getMongoCollections
} = require("@x-logg/mongoops")
const { COLLECTION_NAMES } = require("../enums/collectionNames")

//

const initialiseActionlogg = async (options) => {
    //
    const { connection, database } = await connect(options)
    // Create all actionlogg collections.
    for (const key in COLLECTION_NAMES) {
        const collectionName = COLLECTION_NAMES[key]
        await createMongoCollection(
            database, collectionName
        )
    }
    //
    connection.close()
}

const checkActionlogg = async (options) => {
    //
    const { connection, database } = await connect(options)
    //
    const allCollections = getMongoCollections(database)
    //
    for (const key in COLLECTION_NAMES) {
        const collectionName = key
        if (!allCollections.includes(collectionName)) {
            connection.close()
            return false
        }
    }
    //
    connection.close()
    return true
}

const destroyActionlogg = async (options) => {
    // 
    const { connection, database } = await connect(options)
    // Delete all actionlogg collections.
    for (const key in COLLECTION_NAMES) {
        const collectionName = key
        await deleteMongoCollection(
            database, collectionName
        )
    }
    //
    connection.close()
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

const genActionloggMongoApi = (connection, database) => (
    genMongoApi(connection, database, allMethods)
)

module.exports = genActionloggMongoApi