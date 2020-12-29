const {
    lockArchetype,
    unlockArchetype
} = require("@x-logg/util")
const {
    createArchetype: _createArchetype
} = require("aarketype")
const {
    FIELD_TYPE
} = require("ffield")

/////////////
/////////////


const createArchetype = async (
    actionlogId,
    identifier,
    properties,
    dataApi
) => {
    //
    const archetype = _createArchetype(
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
        actionlogId,
        lockedArchetype
    )
}

const readArchetypes = async (
    actionlogId,
    dataApi
) => {
    const lockedArchetypes = await dataApi.readArchetypes(actionlogId)
    const archetypes = lockedArchetypes.map(
        lockedArchetype => unlockArchetype(
            lockedArchetype
        )
    )
    return archetypes
}

const readArchetype = async (
    actionlogIdentifier,
    archetypeIdentifier,
    dataApi
) => {
    const lockedArchetype = await dataApi.readArchetype(
        actionlogIdentifier,
        archetypeIdentifier
    )
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