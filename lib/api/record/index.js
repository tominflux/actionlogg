const { createItem } = require("aarketype")
const {
    lockItem,
    unlockItem
} = require("@x-logg/util")
const { readArchetype } = require("../archetype")

////////////
////////////


const createRecord = async (
    actionlogId, 
    archetypeId,
    identifier,
    properties, 
    dataApi
) => {
    //Validate new record against archetype
    const archetype = await readArchetype(
        actionlogId,
        archetypeId,
        dataApi
    )
    //Construct new record item.
    const record = createItem(
        archetype,
        identifier,
        { 
            ...properties,
            datetime: Date.now()
        }
    )
    //Lock record
    const lockedRecord = lockItem(record)
    //Create record on db.
    await dataApi.createRecord(
        actionlogId, 
        lockedRecord
    )
}

const readRecords = async (
    actionlogIdentifier,
    archetypeId=null,
    propertyFilter=null,
    dataApi
) => {
    //Get locked records from db.
    const lockedRecords = await dataApi.readRecords(
        actionlogIdentifier, 
        archetypeId, 
        propertyFilter
    )
    //Archetype cache (to prevent archetype getting read twice).
    const archetypes = new Map()
    //Reads and caches archetype from archetype ID.
    const getArchetype = (archetypeId) => {
        //If archetype isn't recognised, cache it in map.
        if (!archetypes.has(archetypeId)) {
            const archetype = await readArchetype(
                actionlogIdentifier,
                archetypeId,
                dataApi
            )
            archetypes.set(archetypeId, archetype)
            return archetype
        }
        //Otherwise, used the cached archetype.
        else {
            const archetype = archetypes.get(archetypeId)
            return archetype
        }
    }
    //Unlock records with archetypes.
    const records = lockedRecords.map(
        (lockedRecord) => {
            const archetype = getArchetype(lockedRecord.archetypeId)
            const record = unlockItem(lockedRecord, archetype)
            return record
        }
    )
    //Return unlocked records.
    return records
}

const readRecord = async (
    actionlogIdentifier,
    recordIdentifier,
    dataApi
) => {
    //
    const lockedRecord = await dataApi.readRecord(
        actionlogIdentifier,
        recordIdentifier
    )
    //
    const archetype = getArchetype(lockedRecord.archetypeId)
    const record = unlockItem(lockedRecord, archetype)
    //
    return record
}

const updateRecord = async (
    actionlogIdentifier,
    recordIdentifier,
    newProperties,
    dataApi
) => {
    //Get existing record.
    const existingRecord = 

    //TODO: validate record against archetype.
    await dataApi.updateRecord(
        actionlogIdentifier,
        recordIdentifier,
        newProperties
    )
}


const deleteRecord = async (
    actionlogIdentifier,
    recordIdentifier,
    dataApi
) => {
    await dataApi.deleteRecord(
        actionlogIdentifier,
        recordIdentifier
    )
}


////////////
////////////


exports.createRecord = createRecord
exports.readRecords = readRecords
exports.readRecord = readRecord
exports.updateRecord = updateRecord
exports.deleteRecord = deleteRecord