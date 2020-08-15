

const postRecord = async (req, res, next) => {

}

const getRecords = async (req, res, next) => {

}

const getRecord = async (req, res, next) => {

}

const putRecord = async (req, res, next) => {

}

const deleteRecord = async (req, res, next) => {
    
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