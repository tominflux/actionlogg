


const createActionlog = async (identifier, dataApi) => {
    //
    await dataApi.createActionlog(identifier)
}

const readActionlogNames = async (dataApi) => {
    //
    const actionlogNames = await dataApi.readActionlogs()
    //
    return actionlogNames
}

const deleteActionlog = async (identifier, dataApi) => {
    //
    await dataApi.deleteActionlog(identifier)
}

exports.createActionlog = createActionlog
exports.readActionlogNames = readActionlogNames
exports.deleteActionlog = deleteActionlog