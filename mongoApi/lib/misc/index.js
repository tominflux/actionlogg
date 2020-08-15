

//

const getArchetypeCollectionName = (actionlogId) => (
    `actionlogg__${actionlogId}__archetype`
)

const getRecordCollectionName = (actionlogId) => (
    `actionlogg__${actionlogId}__record`
)

exports.getArchetypeCollectionName = getArchetypeCollectionName
exports.getRecordCollectionName = getRecordCollectionName