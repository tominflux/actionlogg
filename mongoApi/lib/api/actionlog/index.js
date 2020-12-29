const {
    connect,
    insertIntoCollection,
    findInCollection,
    deleteFromCollection,
} = require("@x-logg/mongoops")
const COLLECTION_NAMES = require("../../enums/collectionNames")


//////////////
//////////////


const createActionlog = async (
    options, identifier
) => {
    //
    const { connection, database } = await connect(options)
    //
    const entry = { identifier }
    await insertIntoCollection(
        database,
        COLLECTION_NAMES.ACTIONLOG,
        [entry]
    )
    //
    connection.close()
}

const readActionlogs = async (
    options
) => {
    //
    const { connection, database } = await connect(options)
    //
    const entries = await findInCollection(
        database,
        COLLECTION_NAMES.CATALOGUE,
        {}
    )
    //
    const actionlogs = entries.map(
        record => record.identifier
    )
    //
    connection.close()
    //
    return actionlogs
}

const deleteActionlog = async (
    options, identifier
) => {
    //
    const { connection, database } = await connect(options)
    // Remove actionlog entry from actionlogs collection.
    await deleteFromCollection(
        database,
        COLLECTION_NAMES.ACTIONLOG,
        { identifier }
    )
    //
    connection.close()
}


//////////////
//////////////


exports.createActionlog = createActionlog
exports.readActionlogs = readActionlogs
exports.deleteActionlog = deleteActionlog