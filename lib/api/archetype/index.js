const {
    lockArchetype,
    unlockArchetype
} = require("@x-logg/util")
const {
    createArchetype
} = require("aarketype")
const {
    FIELD_TYPE
} = require("ffield")

/////////////
/////////////


const createArchetype = async (
    actionlogIdentifier, 
    identifier, 
    properties,
    dataApi
) => {
    //
    const archetype = createArchetype(
        identifier,
        {
            ...properties,
            datetime: FIELD_TYPE.NUMBER
        }
    )
    //
    const lockedArchetype = lockArchetype(archetype)
    //
    await dataApi.createArchetype(
        actionlogIdentifier, 
        lockedArchetype
    )
}

const readArchetypes = async (
    actionlogIdentifier, 
    dataApi
) => {
    const lockedArchetypes = await dataApi.readArchetypes(actionlogIdentifier)
    const archetypes = lockedArchetypes.map(
        lockedArchetype => unlockArchetype(
            lockedArchetype,
            /*derivers.get(lockedArchetype.identifier),
            validatorGroups.get(lockedArchetype.identifier)*/
        )
    )
    return archetypes
}

const readArchetype = async (
    actionlogIdentifier, 
    archetypeIdentifier, 
    dataApi
) => {
    const lockedArchetype = await dataApi.readArchetype(actionlogIdentifier, archetypeIdentifier)
    const archetype = unlockArchetype(
        lockedArchetype
    )
    return archetype
}

const deleteArchetype = async (actionlogIdentifier, archetypeIdentifier, dataApi) => {
    await dataApi.deleteArchetype(actionlogIdentifier, archetypeIdentifier)
}


/////////////
/////////////


exports.createArchetype = createArchetype
exports.readArchetypes = readArchetypes
exports.readArchetype = readArchetype
exports.deleteArchetype = deleteArchetype