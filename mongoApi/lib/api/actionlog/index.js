const { 
    connect, 
    createMongoCollection, 
    deleteMongoCollection 
} = require("@x-logg/mongoops")
const { 
    getArchetypeCollectionName, 
    getRecordCollectionName 
} = require("../../util/misc")
const { getActionlogNames } = require("../../util/actionlog")


//////////////
//////////////


const createActionlog = async (
    options, identifier
) => {
    //
    const { connection, database } = await connect(options)
    //
    await createMongoCollection(
        database,
        getArchetypeCollectionName(identifier)
    )
    await createMongoCollection(
        database,
        getRecordCollectionName(identifier)
    )
    //
    connection.close()
}

const readActionlogNames = async (
    options
) => {
    //
    const { connection, database } = await connect(options)
    //
    const actionlogNames = await getActionlogNames(database)
    //
    connection.close()
    //
    return actionlogNames
}

const deleteActionlog = async (
    options, identifier
) => {
    //
    const { connection, database } = await connect(options)
    //
    await deleteMongoCollection(
        database,
        getArchetypeCollectionName(identifier)
    )
    await deleteMongoCollection(
        database,
        getRecordCollectionName(identifier)
    )
    //
    connection.close()
}


//////////////
//////////////


exports.createActionlog = createActionlog
exports.readActionlogNames = readActionlogNames
exports.deleteActionlog = deleteActionlog