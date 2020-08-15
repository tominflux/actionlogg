const {
    getMongoCollections
} = require("@x-logg/mongoops")


const getActionlogNames = async (database) => {
    const collectionNames = await getMongoCollections(database)
    const actionlogNames = []
    for (const collectionName of collectionNames) {
        const isActionloggCollection = (
            collectionName.substr(0, 12) === "actionlogg__"
        )
        if (isActionloggCollection) {
            const regex = /__(.+)__/ 
            const actionlogName = collectionName.match(regex)[1]
            if (
                actionlogName &&
                !actionlogNames.includes(actionlogName)
            ) {
                actionlogNames.push(actionlogName)
            }
        }
    }
    return actionlogNames
}

exports.getActionlogNames = getActionlogNames