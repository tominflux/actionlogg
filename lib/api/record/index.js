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
    archetypeId = null,
    propertyFilter = null,
    dataApi
) => {
    //Get locked records from db.
    const lockedRecords = await dataApi.readRecords(
        actionlogIdentifier,
        archetypeId,
        propertyFilter
    )
    //Get all archetype IDs from locked items.
    const archetypeIds = []
    for (const lockedRecord of lockedRecords) {
        const { archetypeId } = lockedRecord
        //If doesn't exist, add it.
        if (!archetypeIds.includes(archetypeId)) {
            archetypeIds.push(archetypeId)
        }
    }
    //Read all needed archetypes.
    const archetypes = new Map()
    for (const archetypeId of archetypeIds) {
        //Retrieve archetype from given id.
        const archetype = await readArchetype(
            actionlogIdentifier,
            archetypeId,
            dataApi
        )
        //Add it to map.
        archetypes.set(archetypeId, archetype)
    }
    //Unlock records with archetypes.
    const records = []
    for (const lockedRecord of lockedRecords) {
        const { archetypeId } = lockedRecord
        const archetype = archetypes.get(archetypeId)
        const record = unlockItem(lockedRecord, archetype)
        records.push(record)
    }
    //Re-lock items for sending on to client.
    const relockedRecords = records.map(
        record => lockItem(record)
    )
    return relockedRecords
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
    const { archetypeId } = lockedRecord
    //
    const archetype = await readArchetype(
        actionlogIdentifier,
        archetypeId,
        dataApi
    )
    //Unlock record with archetype for validation
    //purposes.
    const record = unlockItem(lockedRecord, archetype)
    //Relock record and send on to client.
    const relockedRecord = lockItem(record)
    return relockedRecord
}

const updateRecord = async (
    actionlogIdentifier,
    recordIdentifier,
    newProperties = null,
    dataApi
) => {
    // Read locked record from Data API
    const lockedRecord = await dataApi.readItem(
        actionlogIdentifier,
        recordIdentifier
    )
    // Extract needed fields from locked item.
    const { archetypeId, properties } = lockedRecord
    // Retrieve archetype from given id.
    const archetype = await readArchetype(
        actionlogIdentifier,
        archetypeId,
        dataApi
    )
    //Create record using supplied fields and looked up archetype.
    const record = createItem(
        archetype,
        recordIdentifier,
        newProperties ? newProperties : properties,
    )
    //Lock Record
    const updatedLockedRecord = lockItem(record)
    //Update record on db.
    await dataApi.updateRecord(
        actionlogIdentifier,
        updatedLockedRecord
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
