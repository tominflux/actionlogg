


const createActionlog = async (identifier, dataApi) => {
    //
    await dataApi.createActionlog(identifier)
}

const readActionlogNames = async (dataApi) => {
    //
    const actionlogNames = await dataApi.readActionlogNames()
    //
    return actionlogNames
}

const renameActionlog = async (identifier, newIdentifier, dataApi) => {
    //
    await dataApi.renameActionlog(identifier, newIdentifier, dataApi)
}

const deleteActionlog = async (identifier, dataApi) => {
    //
    await dataApi.deleteActionlog(identifier)
}

exports.createActionlog = createActionlog
exports.readActionlogNames = readActionlogNames
exports.renameActionlog = renameActionlog
exports.deleteActionlog = deleteActionlog