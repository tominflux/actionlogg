


const postActionlog = async (req, res, next) => {
    //
    const identifier = req.params.actId
    //
    await req.actionlogg.createActionlog(identifier)
    //
    res.send()
}

const getActionlogs = async (req, res, next) => {
    //
    const actionlogNames = await req.actionlogg.readActionlogNames()
    //
    res.json(actionlogNames)
}

const putActionlog = async (req, res, next) => {
    //
    const identifier = req.params.actId
    const newIdentifier = req.body.newIdentifier
    //
    await req.actionlogg.updateActionlog(identifier, newIdentifier)
    //
    res.send()
}

const deleteActionlog = async (req, res, next) => {
    //
    const identifier = req.params.actId
    //
    await req.actionlogg.deleteActionlog(identifier)
    //
    res.send()
}


/////////////
/////////////


const serveActionlogApi = (router) => {
    router.post("/actionlog/:actId", postActionlog)
    router.get("/actionlogs", getActionlogs)
    router.put("/actionlog/:actId", putActionlog)
    router.delete("/actionlog/:actId", deleteActionlog)
}

exports.serveActionlogApi = serveActionlogApi