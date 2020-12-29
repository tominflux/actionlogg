const {
    connect,
    findInCollection,
    insertIntoCollection,
    deleteFromCollection
} = require("@x-logg/mongoops")
const COLLECTION_NAMES = require('../../enums/collectionNames')

//////////////
//////////////


const createArchetype = async (
    options, actionlogId, lockedArchetype
) => {
    //
    const { connection, database } = await connect(options)
    // Attach id to record
    const entry = {
        actionlogId,
        ...lockedArchetype
    }
    //
    await insertIntoCollection(
        database,
        COLLECTION_NAMES.ARCHETYPE,
        [entry]
    )
    //
    connection.close()
}

const readArchetypes = async (
    options,
    actionlogId
) => {
    //
    const { connection, database } = await connect(options)
    //
    const entries = await findInCollection(
        database,
        COLLECTION_NAMES.ARCHETYPE,
        { actionlogId }
    )
    //
    connection.close()
    //Remove catalogue id from records.
    const lockedArchetypes = entries.map(entry => {
        const { actionlogId, ...lockedArchetype } = entry
        return lockedArchetype
    })
    //
    return lockedArchetypes
}

const readArchetype = async (
    options,
    actionlogId,
    archetypeId,
) => {
    //
    const { connection, database } = await connect(options)
    //
    const identifier = archetypeId
    //
    const entries = await findInCollection(
        database,
        COLLECTION_NAMES.ARCHETYPE,
        { actionlogId, identifier }
    )
    //
    connection.close()
    //
    if (entries.length === 0) {
        return null
    }
    //
    const getLockedArchetype = () => {
        const { actionlogId, ...lockedArchetype } = entries[0]
        return lockedArchetype
    }
    //
    return getLockedArchetype()
}

const deleteArchetype = async (
    options,
    actionlogId,
    archetypeId,
) => {
    //
    const { connection, database } = await connect(options)
    //
    const identifier = archetypeId
    //
    deleteFromCollection(
        database,
        COLLECTION_NAMES.ARCHETYPE,
        { actionlogId, identifier }
    )
    //
    connection.close()
}

exports.createArchetype = createArchetype
exports.readArchetypes = readArchetypes
exports.readArchetype = readArchetype
exports.deleteArchetype = deleteArchetype