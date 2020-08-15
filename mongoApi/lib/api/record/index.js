const { 
    mongoConnect,
    insertIntoCollection,
    findInCollection,
    updateInCollection,
    deleteFromCollection
} = require("@x-logg/mongoops")
const { getRecordCollectionName } = require("../../misc")


////////////
////////////


const createRecord = async (
    options,
    actionlogId,
    lockedRecord
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    await insertIntoCollection(
        database,
        getRecordCollectionName(actionlogId),
        [ lockedRecord ]
    )
    //
    connection.close()
}

const readRecords = async (
    options,
    actionlogId,
    archetypeId=null,
    propertyFilter=null
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    const qArchetypeId = (
        archetypeId === null
    ) ? {} : { archetypeId }
    const qPropertyFilter = (
        propertyFilter === null
    ) ? {} : { properties: propertyFilter }
    const query = {
        ...qArchetypeId,
        ...qPropertyFilter
    }
    //
    const lockedRecords = await findInCollection(
        database,
        getRecordCollectionName(actionlogId),
        query
    )
    //
    connection.close()
    //
    return lockedRecords
}

const readRecord = async (
    options,
    actionlogId,
    identifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    const lockedRecords = await findInCollection(
        database,
        getRecordCollectionName(actionlogId),
        { identifier }
    )
    //
    connection.close()
    //
    return (
        lockedRecords.length > 0
    ) ? lockedRecords[0] : null
}

const updateRecord = async (
    options,
    actionlogId,
    lockedRecord
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    const identifier = lockedRecord.identifier
    const newProperties = lockedRecord.properties
    //
    await updateInCollection(
        database,
        getRecordCollectionName(actionlogId),
        { identifier },
        { properties: newProperties }
    )
    //
    connection.close()
}

const deleteRecord = async (
    options,
    actionlogId,
    identifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    await deleteFromCollection(
        database,
        getRecordCollectionName(actionlogId),
        { identifier }
    )
    //
    connection.close()
}


////////////////
////////////////


exports.createRecord = createRecord
exports.readRecords = readRecords
exports.readRecord = readRecord
exports.updateRecord = updateRecord
exports.deleteRecord = deleteRecord