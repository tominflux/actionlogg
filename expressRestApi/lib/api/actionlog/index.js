


const postActionlog = async (req, res) => {
    //
    const identifier = req.params.actId
    //
    await req.actionlogg.createActionlog(identifier)
    //
    res.send()
}

const getActionlogs = async (req, res) => {
    //
    const actionlogNames = await req.actionlogg.readActionlogNames()
    //
    res.json(actionlogNames)
}

const deleteActionlog = async (req, res) => {
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
    router.delete("/actionlog/:actId", deleteActionlog)
}

exports.serveActionlogApi = serveActionlogApi