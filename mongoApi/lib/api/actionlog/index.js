const { mongoConnect } = require("@x-logg/mongoops")


//////////////
//////////////


const createActionlog = async (
    options, identifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    await createArchetypesCollection(database, identifier)
    await createRecordsCollection(database, identifier)
    //
    connection.close()
}

const readActionlogNames = async (
    options
) => {
    //
    const { connection, database } = await mongoConnect(options)
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
    const { connection, database } = await mongoConnect(options)
    //
    await deleteArchetypesCollection(database, identifier)
    await deleteRecordsCollection(database, identifier)
    //
    connection.close()
}


//////////////
//////////////


exports.createActionlog = createActionlog
exports.readActionlogNames = readActionlogNames
exports.deleteActionlog = deleteActionlog