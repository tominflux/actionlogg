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
    const getArchetype = async (archetypeId) => {
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
    const records = []
    for (const lockedRecord of lockedRecords) {
        const archetype = await getArchetype(lockedRecord.archetypeId)
        const record = unlockItem(lockedRecord, archetype)
        records.push(record)
    }
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
    const archetype = await readArchetype(
        actionlogIdentifier,
        lockedRecord.archetypeId,
        dataApi
    )
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
    const existingRecord = await readRecord(
        actionlogIdentifier,
        recordIdentifier,
        dataApi
    )
    //Get archetype
    const archetype = await readArchetype(
        actionlogIdentifier,
        existingRecord.archetypeId.data,
        dataApi
    )
    //Create new record with new properties.
    const updatedRecord = createItem(
        archetype,
        existingRecord.identifier.data,
        {
            ...newProperties,
            datetime: existingRecord.properties.datetime.data
        }
    )
    //Lock Record
    const lockedRecord = lockItem(updatedRecord)
    //Update record on db.
    await dataApi.updateRecord(
        actionlogIdentifier,
        lockedRecord
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
