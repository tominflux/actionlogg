const { 
    connect,
    findInCollection,
    insertIntoCollection,
    deleteFromCollection
} = require("@x-logg/mongoops")
const { getArchetypeCollectionName } = require("../../util/misc")


//////////////
//////////////




const createArchetype = async (
    options, actionlogIdentifier, lockedArchetype
) => {
    //
    const { connection, database } = await connect(options)
    //
    await insertIntoCollection(
        database, 
        getArchetypeCollectionName(actionlogIdentifier), 
        [ lockedArchetype ]
    )
    //
    connection.close()
}

const readArchetypes = async (
    options, actionlogIdentifier
) => {
    //
    const { connection, database } = await connect(options)
    //
    const archetypes = await findInCollection(
        database, 
        getArchetypeCollectionName(actionlogIdentifier),
        {}
    )
    //
    connection.close()
    //
    return archetypes
}

const readArchetype = async (
    options, actionlogIdentifier, archetypeIdentifier
) => {
    //
    const { connection, database } = await connect(options)
    //
    const archetypes = await findInCollection(
        database, 
        getArchetypeCollectionName(actionlogIdentifier), 
        { identifier: archetypeIdentifier }
    )
    //
    connection.close()
    //
    return (
        archetypes.length > 0 
    ) ? archetypes[0] : null
}

const deleteArchetype = async (
    options, actionlogIdentifier, archetypeIdentifier
) => {
    //
    const { connection, database } = await connect(options)
    //
    deleteFromCollection(
        database, 
        getArchetypeCollectionName(actionlogIdentifier),
        { identifier: archetypeIdentifier }
    )
    //
    connection.close()
}

exports.createArchetype = createArchetype
exports.readArchetypes = readArchetypes
exports.readArchetype = readArchetype
exports.deleteArchetype = deleteArchetype