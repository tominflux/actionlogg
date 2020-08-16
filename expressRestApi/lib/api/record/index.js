

const postRecord = async (req, res, next) => {
    //
    const actionlogId = req.params.actId
    const recordId = req.param.recId
    //
    const {
        archetypeId,
        properties
    } = req.body
    //
    await req.actionlogg.createRecord(
        actionlogId,
        archetypeId,
        recordId,
        properties
    )
    //
    res.send()
}

const getRecords = async (req, res, next) => {
    //
    const actionlogId = req.params.actId
    //
    const archetypeId = req.query.arcId
    const propertyFilter = req.body.propertyFilter
    //
    const records = await req.actionlogg.readRecords(
        actionlogId,
        archetypeId,
        propertyFilter
    )
    //
    res.json(records)
}

const getRecord = async (req, res, next) => {
    //
    const actionlogId = req.params.actId
    const recordId = req.param.recId
    //
    const record = await req.actionlogg.readRecord(
        actionlogId,
        recordId
    )
    //
    res.json(record)
}

const putRecord = async (req, res, next) => {
    //
    const actionlogId = req.params.actId
    const recordId = req.param.recId
    //
    const newProperties = req.body.newProperties
    //
    await req.actionlogg.updateRecord(
        actionlogId,
        recordId,
        newProperties
    )
    //
    res.send()
}

const deleteRecord = async (req, res, next) => {
    //
    const actionlogId = req.params.actId
    const recordId = req.param.recId
    //
    await req.actionlogg.deleteRecord(
        actionlogId,
        recordId
    )
    //
    res.send()
}


/////////////
/////////////


const serveRecordApi = (router) => {
    router.post("/actionlog/:actId/record/:recId", postRecord)
    router.get("/actionlog/:actId/records", getRecords)
    router.get("/actionlog/:actId/record/:recId", getRecord)
    router.put("/actionlog/:actId/record/:recId", putRecord)
    router.delete("/actionlog/:actId/record/:recId", deleteRecord)
}

exports.serveRecordApi = serveRecordApi