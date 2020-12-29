const {
    connect,
    insertIntoCollection,
    findInCollection,
    updateInCollection,
    deleteFromCollection
} = require("@x-logg/mongoops")
const COLLECTION_NAMES = require("../../enums/collectionNames")


////////////
////////////


const createRecord = async (
    options,
    actionlogId,
    lockedRecord
) => {
    //
    const { connection, database } = await connect(options)
    //
    const entry = {
        actionlogId,
        ...lockedRecord
    }
    //
    await insertIntoCollection(
        database,
        COLLECTION_NAMES.RECORD,
        [entry]
    )
    //
    connection.close()
}

const readRecords = async (
    options,
    actionlogId,
    archetypeId = null,
    propertyFilter = null
) => {
    //
    const { connection, database } = await connect(options)
    //Start building query
    let query = { actionlogId }
    //Add archetype ID if given
    if (archetypeId) {
        query = {
            archetypeId,
            ...query
        }
    }
    //Add all fields in property filter.
    for (const key in propertyFilter) {
        const queryKey = `properties.${key}`
        const queryValue = propertyFilter[key]
        query = {
            [queryKey]: queryValue,
            ...query
        }
    }
    //
    const entries = await findInCollection(
        database,
        COLLECTION_NAMES.RECORD,
        query
    )
    //
    connection.close()
    //
    const lockedRecords = entries.map(entry => {
        const {
            actionlogId,
            ...lockedRecord
        } = entry
        return lockedRecord
    })
    //
    return lockedRecords
}

const readRecord = async (
    options,
    actionlogId,
    recordId,
) => {
    //
    const { connection, database } = await connect(options)
    //
    const identifier = recordId
    //
    const query = {
        actionlogId,
        identifier
    }
    //
    const entries = await findInCollection(
        database,
        COLLECTION_NAMES.RECORD,
        query
    )
    //
    connection.close()
    //
    if (entries.length === 0) {
        return null
    }
    //
    const getLockedRecord = () => {
        const {
            catalogueId,
            collectionId,
            ...lockedItem
        } = entries[0]
        return lockedItem
    }
    //
    return getLockedRecord()
}

const updateRecord = async (
    options,
    actionlogId,
    lockedRecord
) => {
    //
    const { connection, database } = await connect(options)
    //
    const { identifier, properties } = lockedRecord
    //
    const query = {
        actionlogId,
        identifier
    }
    //
    await updateInCollection(
        database,
        COLLECTION_NAMES.RECORD,
        query,
        { properties }
    )
    //
    connection.close()
}

const deleteRecord = async (
    options,
    actionlogId,
    recordId
) => {
    //
    const { connection, database } = await connect(options)
    //
    const identifier = recordId
    //
    const query = {
        actionlogId,
        identifier
    }
    //
    await deleteFromCollection(
        database,
        COLLECTION_NAMES.RECORD,
        query
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