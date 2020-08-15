const { mongoConnect } = require("@x-logg/mongoops")


//////////////
//////////////




const createArchetype = async (
    options, catalogueIdentifier, archetype
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    await insertIntoArchetypesCollection(
        database, catalogueIdentifier, archetype
    )
    //
    connection.close()
}

const readArchetypes = async (
    options, catalogueIdentifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    const archetypes = await getAllFromArchetypesCollection(
        database, catalogueIdentifier
    )
    //
    connection.close()
    //
    return archetypes
}

const readArchetype = async (
    options, catalogueIdentifier, archetypeIdentifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    const archetype = findInArchetypesCollection(
        database, catalogueIdentifier, archetypeIdentifier
    )
    //
    connection.close()
    //
    return archetype
}

const deleteArchetype = async (
    options, catalogueIdentifier, archetypeIdentifier
) => {
    //
    const { connection, database } = await mongoConnect(options)
    //
    deleteFromArchetypesCollection(
        database, catalogueIdentifier, archetypeIdentifier
    )
    //
    connection.close()
}

exports.createArchetype = createArchetype
exports.readArchetypes = readArchetypes
exports.readArchetype = readArchetype
exports.deleteArchetype = deleteArchetype